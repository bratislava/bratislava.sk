// The withCache default behaviour keeps the cached pages in redis for 1.5 x revalidate. The override
// here keeps them for MIN_LIFETIME_SECONDS (7 days)
import { createPageCacheHandler } from '@mrjasonroy/cache-components-cache-handler'
// The package loads ioredis lazily, which Next's file tracer can't follow; importing it here gets
// it and its dependencies into the standalone output.
import 'ioredis'
import FileSystemCacheModule from 'next/dist/server/lib/incremental-cache/file-system-cache.js'

// Needs Redis 7.0+ for `EXPIRE ... GT` (the shared redis-cache-web runs 7.2).
const MIN_LIFETIME_SECONDS = 7 * 24 * 60 * 60
// Not-found markers live under their own prefix: every page cache key starts with `/`, so no page
// key can collide with one.
const NOT_FOUND_PREFIX = 'not-found:'
// Not-found markers of prerendered pages also kept in this process, for when Redis can't be read
// (an outage). Bounded by the number of prerendered pages.
const localNotFound = new Map()

const FileSystemCache = FileSystemCacheModule.default
// keyed by directory - copied as Map from cache-components-cache-handler package, but our case should always contain just a single record
const buildOutputReaders = new Map()

export default class PageCacheHandler extends createPageCacheHandler() {
  async get(cacheKey, ctx) {
    const cached = await super.get(cacheKey, ctx)
    // A page exists again for this key, so this process's 404 for it is outdated.
    if (cached) localNotFound.delete(cacheKey)
    // Next creates the image handler once per process and never resets it, so the package would
    // keep each image's first lookup time and write re-optimized images already stale.
    if (ctx?.kind === 'IMAGE') this.resetRequestCache()
    if (cached || ctx?.kind !== 'PAGES') return cached
    // A page whose getStaticProps returned notFound: a cached 404, as Next's own file cache keeps it.
    const notFound = await this.readNotFound(cacheKey)
    if (notFound) return { value: null, ...notFound }
    // On a cache miss (i.e. every new deploy), read build-time version even if older than 1.5 x revalidate,
    // which is how super.get(..) above behaves - https://github.com/mrjasonroy/cache-components-cache-handler/blob/v16.4.6/docs/how-it-works.md#pages-and-route-handlers
    return readBuildOutput(this.options, cacheKey, ctx)
  }

  async set(cacheKey, data, ctx) {
    // Page routes only (rendered pages and getStaticProps redirects): images and cached fetches keep
    // the package's handling and lifetime.
    if (ctx?.kind !== 'PAGES') return super.set(cacheKey, data, ctx)
    // getStaticProps returned notFound: Next writes null, which the package ignores. Drop the page
    // and remember the 404, so neither the old page nor the build output is served for it.
    if (data === null) {
      const notFound = { lastModified: Date.now(), cacheControl: ctx.cacheControl }
      // Only a prerendered page has a build output to hide, so only its 404 (and a 404 without a
      // revalidate period) is kept for the full lifetime; other 404s (unknown URLs under the
      // catch-all route) live 1.5 x revalidate, as the package keeps pages.
      const prerendered = Boolean(await readBuildOutput(this.options, cacheKey, { kind: 'PAGES' }))
      const revalidate = ctx.cacheControl?.revalidate
      const lifetime =
        prerendered || !(revalidate > 0) ? MIN_LIFETIME_SECONDS : Math.ceil(1.5 * revalidate)
      await this.delete(cacheKey)
      if (prerendered) localNotFound.set(cacheKey, notFound)
      await this.redisCommand('remember not-found', notFoundKey(cacheKey), (client, key) =>
        client.set(key, JSON.stringify(notFound), 'EX', lifetime),
      )
      return
    }
    await super.set(cacheKey, data, ctx)
    localNotFound.delete(cacheKey)
    await this.redisCommand('extend lifetime', cacheKey, (client, key) =>
      client
        .multi()
        // GT only ever lengthens the TTL the package just set.
        .expire(key, MIN_LIFETIME_SECONDS, 'GT')
        .del(this.redisKey(notFoundKey(cacheKey)))
        .exec(),
    )
  }

  async readNotFound(cacheKey) {
    const marker = await this.redisCommand('read not-found', notFoundKey(cacheKey), (client, key) =>
      client.get(key),
    )
    if (marker === null) localNotFound.delete(cacheKey)
    if (marker !== undefined) return parseNotFound(marker)
    // Redis could not be read: use this process's marker while it is younger than its Redis copy's
    // 7-day lifetime.
    const local = localNotFound.get(cacheKey)
    return local && Date.now() - local.lastModified < MIN_LIFETIME_SECONDS * 1000
      ? local
      : undefined
  }

  // Package internals used in this file (16.4.5), recheck them when upgrading it: `options`,
  // `runtime.connection` (`client`, `isReady()`), `redisKey`, and `resetRequestCache` clearing the
  // render-start map. Also Next's internal `file-system-cache.js`, when upgrading Next. Without Redis (local dev, `next build`, the edge runtime, an outage) there is no
  // ready connection, so this does nothing and entries keep the package's lifetimes.
  async redisCommand(action, cacheKey, command) {
    const connection = this.runtime.connection
    if (!connection?.isReady()) return undefined
    try {
      return await command(connection.client, this.redisKey(cacheKey))
    } catch (error) {
      // A cache error never fails the request.
      console.error(`[PageCache] Failed to ${action} for ${cacheKey}:`, error)
      return undefined
    }
  }
}

function notFoundKey(cacheKey) {
  return `${NOT_FOUND_PREFIX}${cacheKey}`
}

function parseNotFound(marker) {
  try {
    const notFound = marker && JSON.parse(marker)
    return typeof notFound?.lastModified === 'number' ? notFound : undefined
  } catch {
    return undefined
  }
}

async function readBuildOutput({ fs, serverDistDir }, cacheKey, ctx) {
  if (!fs || !serverDistDir) return null
  let reader = buildOutputReaders.get(serverDistDir)
  if (!reader) {
    // Read-only: never flushes to disk, no memory cache of its own.
    reader = new FileSystemCache({
      fs,
      serverDistDir,
      flushToDisk: false,
      revalidatedTags: [],
      maxMemoryCacheSize: 0,
    })
    buildOutputReaders.set(serverDistDir, reader)
  }
  try {
    const found = await reader.get(cacheKey, ctx)
    return found?.value ? found : null
  } catch (error) {
    console.error(`[PageCache] Reading the build output of ${cacheKey} failed:`, error)
    return null
  }
}

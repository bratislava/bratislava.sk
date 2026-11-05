// The withCache default behaviour keeps the cached pages in redis for 1.5 x revalidate. The override
// here keeps them for MIN_LIFETIME_SECONDS (7 days)
import { createPageCacheHandler } from '@mrjasonroy/cache-components-cache-handler'
// The package loads ioredis lazily, which Next's file tracer can't follow; importing it here gets
// it and its dependencies into the standalone output.
import 'ioredis'

const MIN_LIFETIME_SECONDS = 7 * 24 * 60 * 60

export default class PageCacheHandler extends createPageCacheHandler() {
  async set(cacheKey, data, ctx) {
    await super.set(cacheKey, data, ctx)
    // `runtime.connection` and `redisKey` are the package's internals (16.4.5): recheck them when
    // upgrading it. Without Redis (local dev, `next build`, the edge runtime, an outage) there is no
    // ready connection and entries keep the package's lifetimes.
    const connection = this.runtime.connection
    if (!data || !connection?.isReady()) return
    try {
      // GT only ever lengthens the TTL the package just set.
      await connection.client.expire(this.redisKey(cacheKey), MIN_LIFETIME_SECONDS, 'GT')
    } catch (error) {
      // The entry keeps the package's lifetime; a cache error never fails the request.
      console.error(
        `[PageCache] Extending the cache lifetime of ${cacheKey} to ${MIN_LIFETIME_SECONDS} s failed:`,
        error,
      )
    }
  }
}

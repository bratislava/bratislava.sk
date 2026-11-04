// Next's cacheHandler (ISR pages, cached fetches, optimized images): the Redis handler from
// @mrjasonroy/cache-components-cache-handler, with every entry kept in Redis for at least 7 days.
//
// The package keeps an entry for 1.5 x revalidate (15 s for revalidate: 10) and then lets Redis
// delete it, so a request after that has no stale copy to serve and renders while the visitor
// waits. Keeping the entry longer lets Next serve the stale copy at once and revalidate in the
// background, as its file-system cache did. When an entry counts as stale still follows revalidate.
import { createPageCacheHandler } from '@mrjasonroy/cache-components-cache-handler'

const MIN_LIFETIME_SECONDS = 7 * 24 * 60 * 60

export default class PageCacheHandler extends createPageCacheHandler() {
  async set(cacheKey, data, ctx) {
    await super.set(cacheKey, data, ctx)
    // `runtime.connection` and `redisKey` are the package's internals (16.4.3): recheck them when
    // upgrading it. Without Redis (local dev, an outage) entries keep the package's lifetimes.
    const connection = this.edge ? undefined : this.runtime.connection
    if (!data || !connection?.isReady()) return
    try {
      // GT only ever lengthens the TTL the package just set.
      await connection.client.expire(this.redisKey(cacheKey), MIN_LIFETIME_SECONDS, 'GT')
    } catch {
      // The entry keeps the package's lifetime; a cache error never fails the request.
    }
  }
}

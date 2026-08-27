import { buildInventory } from './buildInventory'
import { Inventory } from './types'

const SNAPSHOT_TTL_MS = 10 * 60 * 1000 // 10 min

type Snapshot = Inventory & {
  builtAt: number
}

/**
 * Only the whole snapshot is cached, never per-query responses - a public endpoint must not let anyone grow the cache
 * by varying query parameters. Filtering and pagination are applied to this array per request.
 *
 * The app runs as a long-lived node server (`output: 'standalone'`), so module state survives between requests. Next's
 * own data cache (`unstable_cache`, `"use cache"`, `revalidateTag`) is app router only and not available here.
 */
let snapshot: Snapshot | null = null

/** Set while a build is running, so concurrent requests share one Strapi round trip instead of starting their own. */
let inFlight: Promise<Snapshot> | null = null

export const getInventorySnapshot = (): Promise<Snapshot> => {
  if (snapshot && Date.now() - snapshot.builtAt < SNAPSHOT_TTL_MS) {
    return Promise.resolve(snapshot)
  }

  if (inFlight) {
    return inFlight
  }

  inFlight = buildInventory()
    .then((inventory) => {
      snapshot = { builtAt: Date.now(), ...inventory }

      return snapshot
    })
    .finally(() => {
      inFlight = null
    })

  return inFlight
}

/** Not used yet - call it from the Strapi revalidate webhook if the ttl ever turns out to be too coarse. */
export const clearInventorySnapshot = () => {
  snapshot = null
}

import { buildInventory } from './buildInventory'
import { SNAPSHOT_TTL_MS } from './config'
import { Inventory } from './types'

export type InventorySnapshot = Inventory & {
  builtAt: number
}

/**
 * Only the whole snapshot is cached, never per-query responses - an endpoint must not let anyone grow the cache by
 * varying query parameters. Filtering and pagination are applied to this array per request.
 *
 * The app runs as a long-lived node server (`output: 'standalone'`), so module state survives between requests. Next's
 * own data cache (`unstable_cache`, `"use cache"`, `revalidateTag`) is app router only and not available here.
 */
let snapshot: InventorySnapshot | null = null

/**
 * Set while a build is running, so concurrent requests share one build instead of starting their own. A build walks
 * every content type in chunks, which takes a while.
 */
let inFlight: Promise<InventorySnapshot> | null = null

export const getInventorySnapshot = (): Promise<InventorySnapshot> => {
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

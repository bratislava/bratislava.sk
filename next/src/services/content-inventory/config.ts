/** The shape of the entries, bumped whenever a change can break consumers. Changelog in content-inventory.md. */
export const INVENTORY_VERSION = 3

/** The whole inventory is built at once and served from memory until it expires. */
export const SNAPSHOT_TTL_MS = 60 * 60 * 1000 // 1 hour

/** How many entries one request to Strapi asks for - a whole content type at once (`limit: -1`) can kill Strapi. */
export const FETCH_CHUNK_SIZE = 100

/** Used when a page is requested without a page size. Without any pagination parameter everything is returned. */
export const DEFAULT_PAGE_SIZE = 100

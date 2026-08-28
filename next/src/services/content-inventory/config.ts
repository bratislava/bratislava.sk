/**
 * The whole inventory is built at once and served from memory until it expires.
 */
export const SNAPSHOT_TTL_MS = 60 * 60 * 1000 // 1 hour

/**
 * How many entries one request to Strapi asks for. Asking for a whole content type at once (`limit: -1`) can kill Strapi.
 */
export const FETCH_CHUNK_SIZE = 100

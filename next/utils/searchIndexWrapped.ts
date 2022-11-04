import { SearchResponse } from 'meilisearch'

/**
 * A type that describes an entity wrapped in shared search index.
 * E.g.:
 * {
 *     type: "article",
 *     article: {...}
 * }
 */
export type SearchIndexWrapped<T extends string, K extends object> = {
  [key in T]: K
} & {
  type: T
}

/**
 * Unwraps entities in Meilisearch response from shared search index.
 * @param type
 */
export const unwrapFromSearchIndex = <T extends string, K extends object>(type: T) => {
  return (response: SearchResponse<SearchIndexWrapped<T, K>>) => {
    return { ...response, hits: response.hits.map((hit) => hit[type] as K) }
  }
}

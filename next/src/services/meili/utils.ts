import { SearchResponse } from 'meilisearch'

import { SearchIndexWrapped } from './types'

/**
 * Unwraps entities in Meilisearch response from shared search index.
 * @param type
 */
export const unwrapFromSearchIndex = <T extends string, K extends object>(type: T) => {
  return (response: SearchResponse<SearchIndexWrapped<T, K>>) => {
    return { ...response, hits: response.hits.map((hit) => hit[type] as K) }
  }
}

export const getMeilisearchPageOptions = ({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) => ({
  limit: pageSize,
  offset: (page - 1) * pageSize,
})

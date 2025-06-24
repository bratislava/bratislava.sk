import { meiliClient } from '../meiliClient'
import { DocumentMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type DocumentFilters = {
  search: string
  pageSize: number
  page: number
}

export const DocumentDefaultFilters: DocumentFilters = {
  search: '',
  pageSize: 9,
  page: 1,
}

export const getDocumentsQueryKey = (filters: DocumentFilters) => ['Search', 'Documents', filters]

export const documentsFetcher = (filters: DocumentFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'document', DocumentMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "document"'],
      sort: ['document.updatedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('document'))
}

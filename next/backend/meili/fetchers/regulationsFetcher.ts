import { meiliClient } from '../meiliClient'
import { RegulationMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type RegulationFilters = {
  search: string
  pageSize: number
  page: number
}

export const RegulationDefaultFilters: RegulationFilters = {
  search: '',
  pageSize: 9,
  page: 1,
}

export const getRegulationsQueryKey = (filters: RegulationFilters) => ['Regulation', filters]

export const regulationsFetcher = (filters: RegulationFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'regulation', RegulationMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "regulation"'],
      sort: ['regulation.effectiveFromTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('regulation'))
}

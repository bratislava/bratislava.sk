import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped, UrbanStudyMeili } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type UrbanStudiesFilters = {
  search: string
  pageSize: number
  page: number
}

export const urbanStudiesDefaultFilters: Required<UrbanStudiesFilters> = {
  search: '',
  pageSize: 10,
  page: 1,
}

export const getUrbanStudiesQueryKey = (filters: UrbanStudiesFilters) => [
  'Search',
  'UrbanStudies',
  filters,
]

export const urbanStudiesFetcher = (filters: UrbanStudiesFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'urban-study', UrbanStudyMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "urban-study"'],
      sort: ['urban-study.customPublishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('urban-study'))
}

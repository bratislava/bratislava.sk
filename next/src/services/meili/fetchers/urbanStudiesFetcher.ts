import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped, UrbanStudyMeili } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type UrbanStudiesFilters = {
  search: string
  pageSize: number
  page: number
  state?: string[]
  categories?: string[]
}

export const urbanStudiesDefaultFilters: Required<UrbanStudiesFilters> = {
  search: '',
  pageSize: 10,
  page: 1,
  state: [],
  categories: [],
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
      filter: [
        'type = "urban-study"',
        ...(filters.state?.length
          ? [`urban-study.urbanStudyState.slug IN [${filters.state.join(',')}]`]
          : []),
        ...(filters.categories?.length
          ? [`urban-study.urbanStudyCategory.slug IN [${filters.categories.join(',')}]`]
          : []),
      ],
      sort: ['urban-study.customPublishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('urban-study'))
}

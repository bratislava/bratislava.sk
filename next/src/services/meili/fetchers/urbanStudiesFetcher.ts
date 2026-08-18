import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped, UrbanStudyMeili } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type UrbanStudiesFilters = {
  search: string
  pageSize: number
  page: number
  state?: string
  categories?: string[]
}

export const urbanStudiesDefaultFilters: UrbanStudiesFilters = {
  search: '',
  pageSize: 10,
  page: 1,
  state: undefined,
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
        filters.state ? [`urban-study.urbanStudyState.slug = ${filters.state}`] : null,
        filters.categories?.length
          ? [`urban-study.urbanStudyCategory.slug IN [${filters.categories.join(',')}]`]
          : null,
      ].filter(isDefined),
      sort: ['urban-study.customPublishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('urban-study'))
}

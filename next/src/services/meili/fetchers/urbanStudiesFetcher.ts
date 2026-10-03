import { UrbanStudiesSectionFragment } from '@/src/services/graphql'
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

/**
 * Filters the section fetches with on its first render, or null if it doesn't fetch at all
 * (it shows all urban studies with its own search, or only manually selected ones).
 * Used both by the section and for prefetching.
 */
export const getUrbanStudiesSectionFilters = (
  section: UrbanStudiesSectionFragment,
): UrbanStudiesFilters | null => {
  const categories = section.categories.filter(isDefined).map((category) => category.slug)
  const state = section.stateUrbanStudiesSection?.slug

  // "Show all" variant fetches on its own, manually selected studies alone need no fetch
  if (
    section.showAll ||
    (section.urbanStudies.filter(isDefined).length > 0 && !categories.length && !state)
  ) {
    return null
  }

  return { ...urbanStudiesDefaultFilters, state, categories }
}

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

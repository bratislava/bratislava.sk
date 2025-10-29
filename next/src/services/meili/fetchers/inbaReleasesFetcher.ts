import { meiliClient } from '../meiliClient'
import { InbaReleaseMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type InbaReleasesFilters = {
  search: string
  pageSize: number
  page: number
}

export const inbaReleasesDefaultFilters: InbaReleasesFilters = {
  search: '',
  pageSize: 12,
  page: 1,
}

export const getInbaReleasesQueryKey = (filters: InbaReleasesFilters) => ['InbaReleases', filters]

export const inbaReleasesFetcher = (filters: InbaReleasesFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'inba-release', InbaReleaseMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "inba-release"'],
      sort: ['inba-release.releaseDate:desc'],
    })
    .then(unwrapFromSearchIndex('inba-release'))
}

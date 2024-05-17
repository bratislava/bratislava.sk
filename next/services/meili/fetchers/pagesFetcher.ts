import { Key } from 'swr'

import { meiliClient } from '../meiliClient'
import { PageMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type PagesFilters = {
  search: string
  page: number
  pageSize: number
}

export const pagesDefaultFilters: PagesFilters = {
  search: '',
  page: 1,
  pageSize: 5,
}

export const getPagesSwrKey = (filters: PagesFilters, locale: string) =>
  ['Pages', filters, locale] as Key

export const getPagesQueryKey = (filters: PagesFilters, locale: string) => [
  'Search',
  'Pages',
  filters,
  locale,
]

export const pagesFetcherUseQuery = (filters: PagesFilters, locale: string) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'page', PageMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page ?? 1, pageSize: filters.pageSize ?? 5 }),
      filter: ['type = "page"', `locale = ${locale}`],
      sort: [],
    })
    .then(unwrapFromSearchIndex('page'))
}

export const pagesFetcher = (filters: PagesFilters, locale: string) => () => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'page', PageMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page ?? 1, pageSize: filters.pageSize ?? 5 }),
      filter: ['type = "page"', `locale = ${locale}`],
      sort: [],
    })
    .then(unwrapFromSearchIndex('page'))
}

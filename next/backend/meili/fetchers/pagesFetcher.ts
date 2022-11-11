import { Key } from 'swr'

import { meiliClient } from '../meiliClient'
import { PageMeili, SearchIndexWrapped } from '../types'
import { unwrapFromSearchIndex } from '../utils'

export type PagesFilters = {
  search: string
}

export const pagesDefaultFilters: PagesFilters = {
  search: '',
}

export const getPagesSwrKey = (filters: PagesFilters, locale: string) => ['Pages', filters, locale] as Key

export const pagesFetcher = (filters: PagesFilters, locale: string) => () => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'page', PageMeili>>(filters.search, {
      filter: ['type = "page"', `locale = ${locale}`],
      sort: [],
    })
    .then(unwrapFromSearchIndex('page'))
}

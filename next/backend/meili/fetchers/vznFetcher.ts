import { Key } from 'swr'

import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped, VznMeili } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type VznFilters = {
  search: string
  pageSize: number
  page: number
}

export const vznDefaultFilters: VznFilters = {
  search: '',
  pageSize: 6,
  page: 1,
}

export const getVznSwrKey = (filters: VznFilters) => ['Vzn', filters] as Key

export const vznFetcher = (filters: VznFilters) => () => {
  console.log(filters)
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'vzn', VznMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "vzn"'],
      sort: ['vzn.validFrom:desc'],
    })
    .then(unwrapFromSearchIndex('vzn'))
}

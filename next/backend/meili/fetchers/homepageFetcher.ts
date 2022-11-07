import { SearchResponse } from 'meilisearch'
import { Key } from 'swr'

import { meiliClient } from '../meiliClient'
import { MixedResults } from '../types'
import { getMeilisearchPageOptions } from '../utils'

export type HomepageSearchFilters = {
  search: string
}

export const homepageSearchDefaultFilters: HomepageSearchFilters = {
  search: '',
}

export const allSearchTypes = ['page' as const, 'blog-post' as const]

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type SearchType = Unpacked<typeof allSearchTypes>

export type HomepageSearchResult = {
  type: SearchType
  title: string
  link: string
}

export type HomepageSearchData = SearchResponse<HomepageSearchResult>

export const getHomepageSearchSwrKey = (filters: HomepageSearchFilters, locale: string) =>
  ['HomepageSearch', filters, locale] as Key

export const homepageFetcher = (filters: HomepageSearchFilters, locale: string) => () => {
  return meiliClient
    .index('search_index')
    .search<MixedResults>(filters.search, {
      ...getMeilisearchPageOptions({ page: 1, pageSize: 5 }),
      filter: ['type = "page" OR type = "blog-post"', `locale = ${locale}`],
    })
    .then((response) => {
      const newHits = response.hits.map((hit) => {
        console.log(hit)
        const { type } = hit
        // TODO: Fix types, but not worth it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
        const dataInner = (hit as any)[type]
        const { title, slug: link } = dataInner

        console.log('hit:', type, title, link)

        return { type, title, link, data: dataInner } as HomepageSearchResult
      })

      return { ...response, hits: newHits }
    })
}

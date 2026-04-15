import { SearchResponse } from 'meilisearch'

import { getLinkProps } from '@/src/utils/getLinkProps'

import { meiliClient } from '../meiliClient'
import { MixedResults } from '../types'
import { getMeilisearchPageOptions } from '../utils'

export type HomepageSearchFilters = {
  search: string
}

export const homepageSearchDefaultFilters: HomepageSearchFilters = {
  search: '',
}

export const allSearchTypes = ['page' as const, 'article' as const, 'regulation' as const]

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type SearchType = Unpacked<typeof allSearchTypes>

export type HomepageSearchResult = {
  type: SearchType
  title: string
  link: string
}

export type HomepageSearchData = SearchResponse<HomepageSearchResult>

export const getHomepageSearchQueryKey = (filters: HomepageSearchFilters, locale: string) => [
  'HomepageSearch',
  filters,
  locale,
]

export const homepageSearchFetcher = (filters: HomepageSearchFilters, locale: string) => {
  return meiliClient
    .index('search_index')
    .search<MixedResults>(filters.search, {
      ...getMeilisearchPageOptions({ page: 1, pageSize: 5 }),
      filter: [
        'type = "page" OR type = "article" OR type = "regulation"',
        `locale = ${locale} OR locale NOT EXISTS`,
      ],
    })
    .then((response) => {
      const newHits = response.hits.map((hit) => {
        const { type } = hit

        // TODO: Fix types, but not worth it.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const dataInner = (hit as any)[type]

        if (type === 'page') {
          const { title } = dataInner

          return {
            type,
            title,
            link: getLinkProps({ page: dataInner }).href,
            data: dataInner,
          } as HomepageSearchResult
        }

        if (type === 'article') {
          const { title } = dataInner

          return {
            type,
            title,
            link: getLinkProps({ article: dataInner }).href,
            data: dataInner,
          } as HomepageSearchResult
        }

        if (type === 'regulation') {
          const { regNumber, titleText, fullTitle } = dataInner

          return {
            type,
            title: `VZN ${regNumber} ${titleText ?? fullTitle}`,
            link: getLinkProps({ regulation: dataInner }).href,
            data: dataInner,
          } as HomepageSearchResult
        }

        const { title, slug: link } = dataInner

        return { type, title, link, data: dataInner } as HomepageSearchResult
      })

      return { ...response, hits: newHits }
    })
}

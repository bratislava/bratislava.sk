import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import useSWR from 'swr'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

import { meiliClient } from '../backend/utils/meili'
import { getMeilisearchPageOptions } from './getMeilisearchPageOptions'
import { PageMeili } from './meiliTypes'
import { SearchIndexWrapped } from './searchIndexWrapped'
import useGetSwrExtras from './useGetSwrExtras'

export const allSearchTypes = [
  'page' as const,
  // 'article' as const,
]

type Results = SearchIndexWrapped<'page', PageMeili>
// | SearchIndexWrapped<'article', { slug: string }>

// https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type SearchType = Unpacked<typeof allSearchTypes>

export interface SearchFilters {
  pageSize: number
  page: number
  /**
   * If none are selected, all the types are displayed.
   */
  selectedTypes: SearchType[]
}

export type SearchData = SearchResponse<SearchResult>

export type UseSearchOptions = {
  filters: SearchFilters
  isSyncedWithUrlQuery?: boolean
}

export type SearchResult = {
  type: SearchType
  title: string
  link: string
}

export const useSearch = ({ filters, isSyncedWithUrlQuery = false }: UseSearchOptions) => {
  const { i18n } = useTranslation()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [routerSearchQuery, setRouterSearchQuery] = useQueryParam('query', withDefault(StringParam, ''), {
    removeDefaultsFromUrl: true,
  })

  const debouncedSearchQuery = useDebounce(isSyncedWithUrlQuery ? routerSearchQuery : searchQuery, 300)

  const emptySearchQuery = !debouncedSearchQuery || debouncedSearchQuery.trim() === ''

  const { data, error } = useSWR(['Search', filters, debouncedSearchQuery], () => {
    if (emptySearchQuery) {
      return Promise.resolve(null)
    }

    // If no type is selected, no filters are generated, so all of them are displayed.
    const selectedTypesFilter = filters.selectedTypes.map((type) => `type = ${type}`).join(' OR ')

    return meiliClient
      .index('search_index')
      .search<Results>(debouncedSearchQuery, {
        ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
        filter: [`locale = ${i18n.language ?? 'sk'} OR locale NOT EXISTS`, selectedTypesFilter],
      })
      .then((response) => {
        const newHits = response.hits.map((hit) => {
          const { type } = hit
          // TODO: Fix types, but not worth it.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataInner = hit[type]
          const link = dataInner.slug
          return { type, title: dataInner.title, link, data: dataInner } as SearchResult
        })

        return { ...response, hits: newHits }
      })
  })

  const swrExtras = useGetSwrExtras({
    data,
    error,
  })

  return {
    searchQuery: isSyncedWithUrlQuery ? routerSearchQuery : searchQuery,
    setSearchQuery: isSyncedWithUrlQuery ? setRouterSearchQuery : setSearchQuery,
    emptySearchQuery,
    data,
    error,
    ...swrExtras,
  }
}

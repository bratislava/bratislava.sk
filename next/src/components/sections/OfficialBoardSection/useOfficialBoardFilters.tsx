import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  OFFICIAL_BOARD_PUBLICATION_STATES,
  officialBoardListDefaultFilters,
  OfficialBoardListFilters,
  OfficialBoardPublicationStateInUrl,
} from '@/src/services/ginis/fetchers/officialBoardListFetcher'

export const useOfficialBoardFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      categoryId: parseAsString.withDefault(officialBoardListDefaultFilters.categoryId),
      publicationState: parseAsStringLiteral(OFFICIAL_BOARD_PUBLICATION_STATES).withDefault(
        'vyveseno',
      ),
      publicationYear: parseAsString.withDefault(officialBoardListDefaultFilters.publicationYear),
    },
    {
      history: 'replace',
      urlKeys: {
        categoryId: 'categoryId',
        publicationState: 'publicationState',
        publicationYear: 'publicationYear',
      },
    },
  )
  const [search, setSearch] = useState(officialBoardListDefaultFilters.search)
  const [page, setPage] = useState(officialBoardListDefaultFilters.page)

  const filters = {
    ...filtersQueryParams,
    search,
    page,
    pageSize: officialBoardListDefaultFilters.pageSize,
  }

  // const setFilters = (newFilters: Partial<OfficialBoardListFilters>) => {
  //   console.log(newFilters)
  //   void setFiltersQueryParams({
  //     categoryId: newFilters.categoryId ?? '',
  //     publicationState: toOfficialBoardPublicationStateInUrl(newFilters.publicationState),
  //     publicationYear:
  //       newFilters.publicationYear ?? officialBoardListDefaultFilters.publicationYear,
  //   })
  //   setSearch(newFilters.search)
  //   setPage(newFilters.page)
  // }

  const setFilters = (newFilters: Partial<OfficialBoardListFilters>) => {
    const toUrlPublicationState = (
      value: NonNullable<OfficialBoardListFilters['publicationState']>,
    ): OfficialBoardPublicationStateInUrl =>
      value === 'vyveseno' || value === 'sejmuto' ? value : 'vyveseno'

    void setFiltersQueryParams((prevQuery) => ({
      categoryId: newFilters.categoryId ?? prevQuery.categoryId,
      publicationState:
        newFilters.publicationState !== undefined
          ? toUrlPublicationState(newFilters.publicationState)
          : prevQuery.publicationState,
      publicationYear: newFilters.publicationYear ?? prevQuery.publicationYear,
    }))
    setSearch((prevSearch) => newFilters.search ?? prevSearch)
    setPage((prevPage) => newFilters.page ?? prevPage)
  }

  return {
    filters,
    setFilters,
    setSearch,
    setPage,
  } as const
}

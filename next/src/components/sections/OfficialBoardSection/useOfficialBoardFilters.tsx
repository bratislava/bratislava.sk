import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  officialBoardListDefaultFilters,
  OfficialBoardListFilters,
} from '@/src/services/ginis/fetchers/officialBoardListFetcher'
import { OfficialBoardPublicationState } from '@/src/services/ginis/types'

export type OfficialBoardPublicationStateInUrl = (typeof OFFICIAL_BOARD_PUBLICATION_STATES)[number]

/** Values accepted by GINIS `Stav` for list filtering (see getOfficialBoardParsedList). */
export const OFFICIAL_BOARD_PUBLICATION_STATES = [
  'vyveseno',
  'sejmuto',
] as const satisfies readonly OfficialBoardPublicationState[]

const toOfficialBoardPublicationStateInUrl = (
  value: OfficialBoardPublicationState | undefined,
): OfficialBoardPublicationStateInUrl =>
  value === 'vyveseno' || value === 'sejmuto' ? value : 'vyveseno'

export const useOfficialBoardFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      categoryId: parseAsString.withDefault(officialBoardListDefaultFilters.categoryId),
      publicationState: parseAsStringLiteral(OFFICIAL_BOARD_PUBLICATION_STATES).withDefault(
        toOfficialBoardPublicationStateInUrl(officialBoardListDefaultFilters.publicationState),
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

  const setFilters = (newFilters: Partial<OfficialBoardListFilters>) => {
    void setFiltersQueryParams((prevQuery) => ({
      categoryId: newFilters.categoryId ?? prevQuery.categoryId,
      publicationState:
        newFilters.publicationState !== undefined
          ? toOfficialBoardPublicationStateInUrl(newFilters.publicationState)
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

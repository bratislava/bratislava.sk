import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  OFFICIAL_BOARD_PUBLICATION_STATES,
  officialBoardListDefaultFilters,
  OfficialBoardListFilters,
  toOfficialBoardPublicationStateInUrl,
} from '@/src/services/ginis/fetchers/officialBoardListFetcher'

export const useOfficialBoardFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      categoryId: parseAsString.withDefault(''),
      publicationState: parseAsStringLiteral(OFFICIAL_BOARD_PUBLICATION_STATES).withDefault('vyveseno'),
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

  const setFilters = (newFilters: OfficialBoardListFilters) => {
    void setFiltersQueryParams({
      categoryId: newFilters.categoryId ?? '',
      publicationState: toOfficialBoardPublicationStateInUrl(newFilters.publicationState),
      publicationYear: newFilters.publicationYear ?? officialBoardListDefaultFilters.publicationYear,
    })
    setSearch(newFilters.search)
    setPage(newFilters.page)
  }

  return {
    filters,
    setFilters,
    setSearch,
    setPage,
  } as const
}

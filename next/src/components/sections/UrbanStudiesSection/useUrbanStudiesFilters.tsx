import { useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  urbanStudiesDefaultFilters,
  UrbanStudiesFilters,
} from '@/src/services/meili/fetchers/urbanStudiesFetcher'

export const useUrbanStudiesFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      categories: {
        defaultValue: urbanStudiesDefaultFilters.categories,
        parse: (value) => (value ? [value] : []),
      },
      state: {
        defaultValue: urbanStudiesDefaultFilters.state ?? null,
        parse: (value) => value || null,
      },
    },
    {
      history: 'replace',
      urlKeys: {
        categories: 'category',
        state: 'state',
      },
    },
  )
  const [search, setSearch] = useState(urbanStudiesDefaultFilters.search)
  const [page, setPage] = useState(urbanStudiesDefaultFilters.page)

  const filters = {
    ...filtersQueryParams,
    categories: filtersQueryParams.categories ?? [],
    state: filtersQueryParams.state ?? undefined,
    search,
    page,
    pageSize: urbanStudiesDefaultFilters.pageSize,
  }

  const setFilters = (newFilters: UrbanStudiesFilters) => {
    void setFiltersQueryParams({
      categories: newFilters.categories ?? [],
      state: newFilters.state ?? null,
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

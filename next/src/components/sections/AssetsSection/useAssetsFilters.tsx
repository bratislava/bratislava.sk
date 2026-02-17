import { useQueryStates } from 'nuqs'
import { useState } from 'react'

import { assetsDefaultFilters, AssetsFilters } from '@/src/services/meili/fetchers/assetsFetcher'

export const useAssetsFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      assetCategorySlugs: {
        defaultValue: assetsDefaultFilters.assetCategorySlugs,
        parse: (value) => (value ? [value] : []),
      },
      adminGroupSlugs: {
        defaultValue: assetsDefaultFilters.adminGroupSlugs,
        parse: (value) => (value ? [value] : []),
      },
      excludeAssetsWithAssignedAdminGroups: {
        defaultValue: assetsDefaultFilters.excludeAssetsWithAssignedAdminGroups,
        parse: (value) => value === 'true',
      },
    },
    {
      history: 'replace',
      urlKeys: {
        assetCategorySlugs: 'type',
        adminGroupSlugs: 'author',
        excludeAssetsWithAssignedAdminGroups: 'cityHallOnly',
      },
    },
  )
  const [search, setSearch] = useState(assetsDefaultFilters.search)
  const [page, setPage] = useState(assetsDefaultFilters.page)

  const filters = {
    ...filtersQueryParams,
    search,
    page,
    pageSize: assetsDefaultFilters.pageSize,
  }

  const setFilters = (newFilters: AssetsFilters) => {
    // TODO promise ignored on purpose ?
    void setFiltersQueryParams(newFilters)
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

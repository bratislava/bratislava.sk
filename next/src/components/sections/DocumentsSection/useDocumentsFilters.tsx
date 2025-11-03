import { useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  documentsDefaultFilters,
  DocumentsFilters,
} from '@/src/services/meili/fetchers/documentsFetcher'

export const useDocumentsFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
    {
      documentCategorySlugs: {
        defaultValue: documentsDefaultFilters.documentCategorySlugs,
        parse: (value) => (value ? [value] : []),
      },
      adminGroupSlugs: {
        defaultValue: documentsDefaultFilters.adminGroupSlugs,
        parse: (value) => (value ? [value] : []),
      },
      excludeDocumentsWithAssignedAdminGroups: {
        defaultValue: documentsDefaultFilters.excludeDocumentsWithAssignedAdminGroups,
        parse: (value) => value === 'true',
      },
    },
    {
      history: 'replace',
      urlKeys: {
        documentCategorySlugs: 'type',
        adminGroupSlugs: 'author',
        excludeDocumentsWithAssignedAdminGroups: 'cityHallOnly',
      },
    },
  )
  const [search, setSearch] = useState(documentsDefaultFilters.search)
  const [page, setPage] = useState(documentsDefaultFilters.page)

  const filters = {
    ...filtersQueryParams,
    search,
    page,
    pageSize: documentsDefaultFilters.pageSize,
  }

  const setFilters = (newFilters: DocumentsFilters) => {
    setFiltersQueryParams(newFilters)
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

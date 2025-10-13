import { useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  articlesDefaultFilters,
  ArticlesFilters,
} from '@/src/services/meili/fetchers/articlesFetcher'

type ArticlesFiltersQueryParams = Pick<
  ArticlesFilters,
  | 'articleCategoryDocumentIds'
  | 'tagDocumentIds'
  | 'adminGroupDocumentIds'
  | 'excludeArticlesWithAssignedAdminGroups'
>

// TODO: query by slug instead of documentId for better readability
export const useArticlesFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams]: [
    ArticlesFiltersQueryParams,
    (filters: ArticlesFiltersQueryParams) => void,
  ] = useQueryStates(
    {
      articleCategoryDocumentIds: {
        defaultValue: articlesDefaultFilters.articleCategoryDocumentIds,
        parse: (value) => [value].filter(Boolean),
      },
      tagDocumentIds: {
        defaultValue: articlesDefaultFilters.tagDocumentIds,
        parse: (value) => [value].filter(Boolean),
      },
      adminGroupDocumentIds: {
        defaultValue: articlesDefaultFilters.adminGroupDocumentIds,
        parse: (value) => [value].filter(Boolean),
      },
      excludeArticlesWithAssignedAdminGroups: {
        defaultValue: articlesDefaultFilters.excludeArticlesWithAssignedAdminGroups,
        parse: (value) => value === 'true',
      },
    },
    {
      history: 'replace',
      urlKeys: {
        articleCategoryDocumentIds: 'type',
        tagDocumentIds: 'topic',
        adminGroupDocumentIds: 'author',
        excludeArticlesWithAssignedAdminGroups: 'cityHallOnly',
      },
    },
  )
  const [search, setSearch] = useState(articlesDefaultFilters.search)
  const [page, setPage] = useState(articlesDefaultFilters.page)

  const filters = { ...filtersQueryParams, search, page, pageSize: articlesDefaultFilters.pageSize }

  const setFilters = (newFilters: ArticlesFilters) => {
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

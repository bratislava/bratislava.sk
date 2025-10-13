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

export const useArticlesFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams]: [
    ArticlesFiltersQueryParams,
    (filters: ArticlesFiltersQueryParams) => void,
  ] = useQueryStates(
    {
      articleCategorySlugs: {
        defaultValue: articlesDefaultFilters.articleCategorySlugs,
        parse: (value) => (value ? [value] : []),
      },
      tagSlugs: {
        defaultValue: articlesDefaultFilters.tagSlugs,
        parse: (value) => (value ? [value] : []),
      },
      adminGroupSlugs: {
        defaultValue: articlesDefaultFilters.adminGroupSlugs,
        parse: (value) => (value ? [value] : []),
      },
      excludeArticlesWithAssignedAdminGroups: {
        defaultValue: articlesDefaultFilters.excludeArticlesWithAssignedAdminGroups,
        parse: (value) => value === 'true',
      },
    },
    {
      history: 'replace',
      urlKeys: {
        articleCategorySlugs: 'type',
        tagSlugs: 'topic',
        adminGroupSlugs: 'author',
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

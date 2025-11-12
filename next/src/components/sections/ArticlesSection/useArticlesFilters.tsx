import { useQueryStates } from 'nuqs'
import { useState } from 'react'

import {
  articlesDefaultFilters,
  ArticlesFilters,
} from '@/src/services/meili/fetchers/articlesFetcher'

export const useArticlesFilters = () => {
  const [filtersQueryParams, setFiltersQueryParams] = useQueryStates(
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
    // TODO check if this is fine
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

import { useQueryStates } from 'nuqs'

import {
  articlesDefaultFilters,
  ArticlesFilters,
} from '@/src/services/meili/fetchers/articlesFetcher'

// TODO query by slug instead of documentId for better readability
export const useArticlesFilters = () => {
  const [filters, setFilters]: [ArticlesFilters, (filters: ArticlesFilters) => void] =
    useQueryStates(
      {
        search: {
          defaultValue: articlesDefaultFilters.search,
          parse: String,
        },
        articleCategoryDocumentIds: {
          defaultValue: articlesDefaultFilters.articleCategoryDocumentIds ?? [],
          parse: (value) => [value],
        },
        tagDocumentIds: {
          defaultValue: articlesDefaultFilters.tagDocumentIds ?? [],
          parse: (value) => [value],
        },
        adminGroupDocumentIds: {
          defaultValue: articlesDefaultFilters.adminGroupDocumentIds ?? [],
          parse: (value) => [value],
        },
        excludeArticlesWithAssignedAdminGroups: {
          defaultValue: articlesDefaultFilters.excludeArticlesWithAssignedAdminGroups ?? false,
          parse: (value) => value === 'true',
        },
        page: {
          defaultValue: articlesDefaultFilters.page,
          parse: Number,
        },
        pageSize: {
          defaultValue: articlesDefaultFilters.pageSize,
          parse: Number,
        },
      },
      {
        history: 'push',
        urlKeys: {
          search: 'search',
          articleCategoryDocumentIds: 'type',
          tagDocumentIds: 'topic',
          adminGroupDocumentIds: 'author',
          excludeArticlesWithAssignedAdminGroups: 'cityHallOnly',
          page: 'page',
          pageSize: 'pageSize',
        },
      },
    )

  return { filters, setFilters } as const
}

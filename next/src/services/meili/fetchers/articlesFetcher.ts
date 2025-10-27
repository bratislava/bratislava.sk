import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { ArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type ArticlesFilters = {
  search: string
  pageSize: number
  page: number
  articleCategoryDocumentIds?: string[]
  articleCategorySlugs?: string[]
  tagDocumentIds?: string[]
  tagSlugs?: string[]
  adminGroupDocumentIds?: string[]
  adminGroupSlugs?: string[]
  excludeArticlesWithAssignedAdminGroups?: boolean
}

export const articlesDefaultFilters: Required<ArticlesFilters> = {
  search: '',
  pageSize: 6,
  page: 1,
  articleCategoryDocumentIds: [],
  articleCategorySlugs: [],
  tagDocumentIds: [],
  tagSlugs: [],
  adminGroupDocumentIds: [],
  adminGroupSlugs: [],
  excludeArticlesWithAssignedAdminGroups: false,
}

export const getArticlesQueryKey = (filters: ArticlesFilters, locale: string) => [
  'Search',
  'Articles',
  filters,
  locale,
]

export const articlesFetcher = (filters: ArticlesFilters, locale: string) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'article', ArticleMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "article"',
        `locale = ${locale}`,
        filters.articleCategoryDocumentIds?.length
          ? `article.articleCategory.documentId IN [${filters.articleCategoryDocumentIds.join(',')}]`
          : '',
        filters.articleCategorySlugs?.length
          ? `article.articleCategory.slug IN [${filters.articleCategorySlugs.join(',')}]`
          : '',
        filters.tagDocumentIds?.length
          ? `article.tags.documentId IN [${filters.tagDocumentIds.join(',')}]`
          : '',
        filters.tagSlugs?.length ? `article.tags.slug IN [${filters.tagSlugs.join(',')}]` : '',
        filters.adminGroupDocumentIds?.length
          ? `article.adminGroups.documentId IN [${filters.adminGroupDocumentIds.join(',')}]`
          : '',
        filters.adminGroupSlugs?.length
          ? `article.adminGroups.slug IN [${filters.adminGroupSlugs.join(',')}]`
          : '',
        filters.excludeArticlesWithAssignedAdminGroups
          ? 'article.adminGroups.documentId NOT EXISTS'
          : '',
      ].filter(isDefined),
      sort: ['article.addedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('article'))
    .then((response) => {
      const hits = response.hits.map((article) => {
        return {
          documentId: article.documentId,
          __typename: 'Article',
          title: article.title,
          slug: article.slug,
          perex: article.perex,
          addedAt: article.addedAt,
          coverMedia: article.coverMedia,
          tag: article.tag,
          tags: article.tags,
          articleCategory: article.articleCategory,
        } as const
      })

      return { ...response, hits }
    })
}

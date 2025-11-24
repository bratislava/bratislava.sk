import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { ArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type ArticlesFilters = {
  search: string
  pageSize: number
  page: number
  articleCategorySlugs?: string[]
  tagSlugs?: string[]
  adminGroupDocumentIds?: string[]
  adminGroupSlugs?: string[]
  excludeArticlesWithAssignedAdminGroups?: boolean
  inbaReleaseSlugs?: string[]
}

export const articlesDefaultFilters: Required<ArticlesFilters> = {
  search: '',
  pageSize: 6,
  page: 1,
  articleCategorySlugs: [],
  tagSlugs: [],
  adminGroupDocumentIds: [],
  adminGroupSlugs: [],
  excludeArticlesWithAssignedAdminGroups: false,
  inbaReleaseSlugs: [],
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
        filters.articleCategorySlugs?.length
          ? `article.articleCategory.slug IN [${filters.articleCategorySlugs.join(',')}]`
          : '',
        filters.tagSlugs?.length ? `article.tags.slug IN [${filters.tagSlugs.join(',')}]` : '',
        filters.adminGroupSlugs?.length
          ? `article.adminGroups.slug IN [${filters.adminGroupSlugs.join(',')}]`
          : '',
        filters.excludeArticlesWithAssignedAdminGroups
          ? 'article.adminGroups.documentId NOT EXISTS'
          : '',
        filters.inbaReleaseSlugs?.length
          ? `article.inbaRelease.slug IN [${filters.inbaReleaseSlugs.join(',')}]`
          : '',
      ].filter(isDefined),
      sort: ['article.addedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('article'))
}

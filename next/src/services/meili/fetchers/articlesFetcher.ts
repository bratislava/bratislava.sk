import { CITY_HALL_ADMINGROUP_SLUG } from '@/src/utils/adminGroupUtils'
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
  inbaReleaseSlugs?: string[]
}

export const articlesDefaultFilters: Required<ArticlesFilters> = {
  search: '',
  pageSize: 15,
  page: 1,
  articleCategorySlugs: [],
  tagSlugs: [],
  adminGroupDocumentIds: [],
  adminGroupSlugs: [],
  inbaReleaseSlugs: [],
}

export const getArticlesQueryKey = (filters: ArticlesFilters, locale: string) => [
  'Search',
  'Articles',
  filters,
  locale,
]

export const articlesFetcher = (filters: ArticlesFilters, locale: string) => {
  const adminGroupSlugsWithoutCityHall = filters.adminGroupSlugs?.filter(
    (slug) => slug !== CITY_HALL_ADMINGROUP_SLUG,
  )

  const showCityHallArticles = filters.adminGroupSlugs?.includes(CITY_HALL_ADMINGROUP_SLUG)
  const showOnlyCityHallArticles = showCityHallArticles && !adminGroupSlugsWithoutCityHall?.length

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
        filters.inbaReleaseSlugs?.length
          ? `article.inbaRelease.slug IN [${filters.inbaReleaseSlugs.join(',')}]`
          : '',
        filters.adminGroupDocumentIds?.length
          ? `article.adminGroups.documentId IN [${filters.adminGroupDocumentIds.join(',')}]`
          : '',
        adminGroupSlugsWithoutCityHall?.length
          ? showCityHallArticles
            ? `(article.adminGroups.slug IN [${adminGroupSlugsWithoutCityHall.join(',')}]) OR article.adminGroups.documentId NOT EXISTS`
            : `article.adminGroups.slug IN [${adminGroupSlugsWithoutCityHall.join(',')}]`
          : '',
        showOnlyCityHallArticles ? 'article.adminGroups.documentId NOT EXISTS' : '',
      ].filter(isDefined),
      sort: ['article.addedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('article'))
}

import { meiliClient } from '../meiliClient'
import { InbaArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type InbaArticlesFilters = {
  search: string
  pageSize: number
  page: number
  tagIds: string[]
}

export const inbaArticlesDefaultFilters: InbaArticlesFilters = {
  search: '',
  pageSize: 9,
  page: 1,
  tagIds: [],
}

export const getInbaArticlesQueryKey = (filters: InbaArticlesFilters, locale: string) => [
  'Search',
  'InbaArticles',
  filters,
  locale,
]

export const inbaArticlesFetcher = (filters: InbaArticlesFilters, locale: string) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'inba-article', InbaArticleMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "inba-article"',
        `locale = ${locale}`,
        filters.tagIds.length > 0 ? `inba-article.inbaTag.id IN [${filters.tagIds.join(',')}]` : '',
      ],
      sort: ['inba-article.publishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('inba-article'))
    .then((response) => {
      const hits = response.hits.map((inbaArticle) => {
        return {
          documentId: inbaArticle.documentId,
          title: inbaArticle.title,
          slug: inbaArticle.slug,
          perex: inbaArticle.perex,
          publishedAt: inbaArticle.publishedAt,
          ...(inbaArticle.coverImage && {
            coverImage: {
              documentId: inbaArticle.coverImage.documentId,
              url: inbaArticle.coverImage.url,
            },
          }),
          ...(inbaArticle.inbaTag && {
            inbaTag: {
              documentId: inbaArticle.inbaTag.documentId,
              title: inbaArticle.inbaTag.title,
            },
          }),
        } as const
      })

      return { ...response, hits }
    })
}

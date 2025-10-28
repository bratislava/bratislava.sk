import { meiliClient } from '../meiliClient'
import { InbaArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type InbaArticlesFilters = {
  search: string
  pageSize: number
  page: number
  tagDocumentIds?: string[]
  releaseDocumentIds?: string[]
}

export const inbaArticlesDefaultFilters: InbaArticlesFilters = {
  search: '',
  pageSize: 9,
  page: 1,
  tagDocumentIds: [],
  releaseDocumentIds: [],
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
        filters.tagDocumentIds?.length
          ? `inba-article.inbaTag.documentId IN [${filters.tagDocumentIds.join(',')}]`
          : '',
        filters.releaseDocumentIds?.length
          ? `inba-article.inbaRelease.documentId IN [${filters.releaseDocumentIds.join(',')}]`
          : '',
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
          coverImage: inbaArticle.coverImage,
          inbaTag: inbaArticle.inbaTag,
          tags: inbaArticle.tags,
        } as const
      })

      return { ...response, hits }
    })
}

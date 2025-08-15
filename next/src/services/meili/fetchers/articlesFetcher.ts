import { meiliClient } from '../meiliClient'
import { ArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type ArticlesFilters = {
  search: string
  pageSize: number
  page: number
  tagDocumentIds: string[]
  adminGroupDocumentIds: string[]
}

export const articlesDefaultFilters: ArticlesFilters = {
  search: '',
  pageSize: 6,
  page: 1,
  tagDocumentIds: [],
  adminGroupDocumentIds: [],
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
        filters.tagDocumentIds.length > 0
          ? `article.tag.documentId IN [${filters.tagDocumentIds.join(',')}]`
          : '',
        filters.adminGroupDocumentIds.length > 0
          ? `article.adminGroups.documentId IN [${filters.adminGroupDocumentIds.join(',')}]`
          : '',
      ],
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
          ...(article.coverMedia && {
            coverMedia: {
              documentId: article.coverMedia.documentId,
              url: article.coverMedia.url ?? '',
              name: article.coverMedia.name ?? '',
              alternativeText: article.coverMedia.alternativeText ?? '',
            },
          }),
          ...(article.tag && {
            tag: {
              documentId: article.tag.documentId,
              title: article.tag.title,
              ...(article.tag.pageCategory && {
                pageCategory: {
                  documentId: article.tag.pageCategory.documentId,
                  color: article.tag.pageCategory.color,
                },
              }),
            },
          }),
          ...(article.articleCategory && {
            articleCategory: {
              documentId: article.articleCategory.documentId,
              title: article.articleCategory.title,
            },
          }),
        } as const
      })

      return { ...response, hits }
    })
}

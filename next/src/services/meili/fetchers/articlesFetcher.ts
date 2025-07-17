import { meiliClient } from '../meiliClient'
import { ArticleMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type ArticlesFilters = {
  search: string
  pageSize: number
  page: number
  tagIds: string[]
}

export const articlesDefaultFilters: ArticlesFilters = {
  search: '',
  pageSize: 6,
  page: 1,
  tagIds: [],
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
        filters.tagIds.length > 0 ? `article.tag.id IN [${filters.tagIds.join(',')}]` : '',
      ],
      sort: ['article.addedAtTimestamp:desc'],
      attributesToRetrieve: [
        // Only properties that are required to display listing are retrieved
        'article.id',
        'article.title',
        'article.perex',
        'article.content',
        'article.slug',
        'article.coverMedia.url',
        'article.addedAt',
        'article.tag.title',
        'article.tag.pageCategory.color',
        'article.tag.pageCategory.shortTitle',
        'article.articleCategory.title',
      ],
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

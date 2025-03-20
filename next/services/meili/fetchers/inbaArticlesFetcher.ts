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
      attributesToRetrieve: [
        // Only properties that are required to display listing are retrieved
        'inba-article.title',
        'inba-article.slug',
        'inba-article.perex',
        'inba-article.coverImage.url',
        'inba-article.publishedAt',
        'inba-article.inbaTag.title',
      ],
    })
    .then(unwrapFromSearchIndex('inba-article'))
    .then((response) => {
      const hits = response.hits.map((inbaArticle) => {
        return {
          attributes: {
            title: inbaArticle.title,
            slug: inbaArticle.slug,
            perex: inbaArticle.perex,
            publishedAt: inbaArticle.publishedAt,
            coverImage: {
              data: {
                attributes: {
                  url: inbaArticle.coverImage?.url,
                },
              },
            },
            inbaTag: {
              data: {
                attributes: {
                  title: inbaArticle.inbaTag?.title,
                },
              },
            },
          },
        } as const
      })

      return { ...response, hits }
    })
}

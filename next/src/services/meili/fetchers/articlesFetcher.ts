import { ArticleCardEntityFragment } from '@/src/services/graphql'

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
      ],
    })
    .then(unwrapFromSearchIndex('article'))
    .then((response) => {
      const hits = response.hits.map((article) => {
        return {
          attributes: {
            title: article.title,
            slug: article.slug,
            perex: article.perex,
            addedAt: article.addedAt,
            ...(article.coverMedia && {
              coverMedia: {
                data: {
                  attributes: {
                    url: article.coverMedia.url ?? '',
                    name: article.coverMedia.name ?? '',
                    alternativeText: article.coverMedia.alternativeText ?? '',
                  },
                },
              },
            }),
            ...(article.tag && {
              tag: {
                data: {
                  attributes: {
                    title: article.tag.title,
                    ...(article.tag.pageCategory && {
                      pageCategory: {
                        data: {
                          attributes: {
                            color: article.tag.pageCategory.color,
                          },
                        },
                      },
                    }),
                  },
                },
              },
            }),
          },
        } satisfies Pick<ArticleCardEntityFragment, 'attributes'>
      })

      return { ...response, hits }
    })
}

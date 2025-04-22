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
        filters.tagIds.length > 0 ? `article.tags.id IN [${filters.tagIds.join(',')}]` : '',
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
        'article.tags.title',
        'article.tags.pageCategory.color',
        'article.tags.pageCategory.shortTitle',
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
            coverMedia: {
              data: {
                attributes: {
                  url: article.coverMedia?.url ?? '',
                  name: article.coverMedia?.name ?? '',
                  alternativeText: article.coverMedia?.alternativeText ?? '',
                },
              },
            },
            // TODO tags
            // tags: {
            //   data: [
            //     article.tags?.map((tag) => ({
            //       __typename: "TagEntity",
            //       attributes: {
            //         __typename: "Tag"
            //         title: tag.title,
            //         pageCategory: {
            //           data: {
            //             attributes: {
            //               color: tag.pageCategory?.color,
            //             },
            //           },
            //         },
            //       },
            //     })),
            //   ],
            // },
          },
        } satisfies Pick<ArticleCardEntityFragment, 'attributes'>
      })

      return { ...response, hits }
    })
}

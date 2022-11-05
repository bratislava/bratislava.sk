// @ts-strict-ignore
import { getMeilisearchPageOptions } from '@utils/getMeilisearchPageOptions'
import { BlogPostMeili } from '@utils/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@utils/searchIndexWrapped'
import { Key } from 'swr'

import { meiliClient } from '../meili'

export type BlogPostsFilters = {
  search: string
  pageSize: number
  page: number
}

export const blogPostsDefaultFilters: BlogPostsFilters = {
  search: '',
  pageSize: 10,
  page: 1,
}

export const getBlogPostsSwrKey = (filters: BlogPostsFilters, locale: string) => ['BlogPost', filters, locale] as Key

export const blogPostsFetcher = (filters: BlogPostsFilters, locale: string) => async () => {
  const data = await meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'blog-post', BlogPostMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "blog-post"', `locale = ${locale}`],
      sort: ['blog-post.publishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('blog-post'))

  const hits = data.hits.map((article) => {
    return {
      attributes: {
        coverImage: {
          data: {
            attributes: {
              url: article.coverImage.url,
            },
          },
        },
        publishedAt: article.publishedAt,
        tag: {
          data: {
            attributes: {
              pageCategory: {
                data: {
                  attributes: {
                    color: 'red', // hardcoded, api does not return this attribute
                    shortTitle: article.tag.title,
                  },
                },
              },
            },
          },
        },
        title: article.title,
        slug: article.slug,
      },
    }
  })

  return { ...data, hits }
}

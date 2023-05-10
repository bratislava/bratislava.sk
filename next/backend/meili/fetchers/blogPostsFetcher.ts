import { Enum_Pagecategory_Color } from '@backend/graphql'
import { BlogItem } from '@components/ui/BlogSearchCard/BlogSearchCard'
import { Key } from 'swr'

import { meiliClient } from '../meiliClient'
import { BlogPostMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

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

export const getBlogPostsSwrKey = (filters: BlogPostsFilters, locale: string) =>
  ['BlogPost', filters, locale] as Key

export const blogPostsFetcher = (filters: BlogPostsFilters, locale: string) => async () => {
  // Tmp fix:
  // We sort first in meilisearch by publish date because date_added is not required and then in FE by date_added
  // TODO make date_added required

  const data = await meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'blog-post', BlogPostMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "blog-post"', `locale = ${locale}`],
      sort: ['blog-post.publishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('blog-post'))

  const hits = data.hits
    .map((article) => {
      return {
        attributes: {
          title: article.title,
          slug: article.slug,
          publishedAt: article.publishedAt,
          date_added: article.date_added,
          coverImage: {
            data: {
              attributes: {
                url: article.coverImage?.url,
              },
            },
          },
          tag: {
            data: {
              attributes: {
                pageCategory: {
                  data: {
                    attributes: {
                      color: 'main' as Enum_Pagecategory_Color, // hardcoded, api does not return this attribute
                      shortTitle: article.tag?.title,
                    },
                  },
                },
              },
            },
          },
        },
      } as BlogItem
    })
    .sort((a, b) => {
      if (!a.attributes?.date_added || !b.attributes?.date_added) {
        return 0
      }
      return (
        new Date(b.attributes.date_added).getTime() - new Date(a.attributes.date_added).getTime()
      )
    })

  return { ...data, hits }
}

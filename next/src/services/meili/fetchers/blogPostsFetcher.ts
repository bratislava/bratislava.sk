import { LatestBlogPostEntityFragment } from '@/src/services/graphql'

import { meiliClient } from '../meiliClient'
import { BlogPostMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type BlogPostsFilters = {
  search: string
  pageSize: number
  page: number
  tagIds: string[]
}

export const blogPostsDefaultFilters: BlogPostsFilters = {
  search: '',
  pageSize: 6,
  page: 1,
  tagIds: [],
}

export const getBlogPostsQueryKey = (filters: BlogPostsFilters, locale: string) => [
  'Search',
  'BlogPost',
  filters,
  locale,
]

export const blogPostsFetcher = (filters: BlogPostsFilters, locale: string) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'blog-post', BlogPostMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "blog-post"',
        `locale = ${locale}`,
        filters.tagIds.length > 0 ? `blog-post.tag.id IN [${filters.tagIds.join(',')}]` : '',
      ],
      sort: ['blog-post.addedAtTimestamp:desc'],
      attributesToRetrieve: [
        // Only properties that are required to display listing are retrieved
        'blog-post.id',
        'blog-post.title',
        'blog-post.excerpt',
        'blog-post.text',
        'blog-post.slug',
        'blog-post.coverImage.url',
        'blog-post.addedAt',
        'blog-post.tag.title',
        'blog-post.tag.pageCategory.color',
        'blog-post.tag.pageCategory.shortTitle',
      ],
    })
    .then(unwrapFromSearchIndex('blog-post'))
    .then((response) => {
      const hits = response.hits.map((blogPost) => {
        return {
          attributes: {
            title: blogPost.title,
            excerpt: blogPost.excerpt,
            slug: blogPost.slug,
            addedAt: blogPost.addedAt,
            coverImage: {
              data: {
                attributes: {
                  url: blogPost.coverImage?.url ?? '',
                },
              },
            },
            tag: {
              data: {
                attributes: {
                  title: blogPost.tag?.title,
                  pageCategory: {
                    data: {
                      attributes: {
                        color: blogPost.tag?.pageCategory?.color,
                      },
                    },
                  },
                },
              },
            },
          },
        } satisfies Pick<LatestBlogPostEntityFragment, 'attributes'>
      })

      return { ...response, hits }
    })
}

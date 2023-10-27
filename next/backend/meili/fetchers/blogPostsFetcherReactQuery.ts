import { Enum_Pagecategory_Color, LatestBlogPostEntityFragment } from '@backend/graphql'
import {
  BlogPostCategory,
  BlogPostSubCategory,
} from '@components/ui/ArticlesFilter/BlogPostsFilter'

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
  pageSize: 9,
  page: 1,
  tagIds: [],
}

export const pageCategoriesFetcher = (locale: string) => {
  return meiliClient
    .index('page-category')
    .search('', {
      // TODO: locale not working
      // filter: [`locale = ${locale}`],
      attributesToRetrieve: ['id', 'title', 'color'],
    })
    .then((response) => {
      return response.hits.map((pageCategory) => {
        return {
          id: pageCategory.id,
          title: pageCategory.title,
          // TODO: overiť, či je tento type assertion ok
          color: pageCategory.color as Enum_Pagecategory_Color,
        } as BlogPostCategory
      })
    })
}

export const blogPostsTagsFetcher = (locale: string) => {
  return meiliClient
    .index('tag')
    .search('', {
      // TODO: locale not working
      // filter: [`locale = ${locale}`],
      attributesToRetrieve: ['id', 'title', 'pageCategory'],
    })
    .then((response) => {
      return response.hits.map((tag) => {
        return {
          id: tag.id,
          title: tag.title,
          pageCategoryId: tag.pageCategory.id,
          pageCategoryColor: tag.pageCategory.color,
        } as BlogPostSubCategory
      })
    })
}

export const blogPostsTagsFetcherOriginal = (locale: string) => {
  return meiliClient
    .index('tag')
    .search('', {
      // TODO: locale not working
      // filter: [`locale = ${locale}`],
      attributesToRetrieve: ['id', 'title'],
    })
    .then((response) => {
      return response.hits.map((pageCategory) => {
        return {
          id: pageCategory.id,
          title: pageCategory.title,
        } as BlogPostSubCategory
      })
    })
}

export const getBlogPostsQueryKey = (filters: BlogPostsFilters, locale: string) => [
  'BlogPost',
  filters,
  locale,
]

export const blogPostsFetcher = (filters: BlogPostsFilters, locale: string) => {
  // Tmp fix:
  // We sort first in meilisearch by publish date because date_added is not required and then in FE by date_added
  // TODO make date_added require
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'blog-post', BlogPostMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "blog-post"',
        `locale = ${locale}`,
        filters.tagIds.length > 0 ? `blog-post.tag.id IN [${filters.tagIds.join(',')}]` : '',
      ],
      sort: ['blog-post.publishedAtTimestamp:desc'],
      attributesToRetrieve: [
        // Only properties that are required to display listing are retrieved
        'blog-post.id',
        'blog-post.title',
        'blog-post.text',
        'blog-post.slug',
        'blog-post.coverImage.url',
        'blog-post.publishedAt',
        'blog-post.date_added',
        'blog-post.tag.title',
        'blog-post.tag.pageCategory.color',
        'blog-post.tag.pageCategory.shortTitle',
      ],
    })
    .then(unwrapFromSearchIndex('blog-post'))
    .then((response) => {
      const hits = response.hits
        .map((blogPost) => {
          return {
            attributes: {
              title: blogPost.title,
              slug: blogPost.slug,
              publishedAt: blogPost.publishedAt,
              date_added: blogPost.date_added,
              coverImage: {
                data: {
                  attributes: {
                    url: blogPost.coverImage?.url,
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
          } as Pick<LatestBlogPostEntityFragment, 'attributes'>
        })
        .sort((a, b) => {
          if (!a.attributes?.date_added || !b.attributes?.date_added) {
            return 0
          }
          return (
            new Date(b.attributes.date_added).getTime() -
            new Date(a.attributes.date_added).getTime()
          )
        })

      return { ...response, hits }
    })
}

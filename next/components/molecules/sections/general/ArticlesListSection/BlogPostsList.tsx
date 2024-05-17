import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import BlogPostCard from '@/components/molecules/presentation/BlogPostCard'
import BlogPostsFilter from '@/components/ui/BlogPostsFilter/BlogPostsFilter'
import Pagination from '@/components/ui/Pagination/Pagination'
import { BlogPostsListSectionFragment } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@/services/meili/fetchers/blogPostsFetcher'
import { getCategoryColorLocalStyle } from '@/utils/colors'
import { getNumericLocalDate } from '@/utils/formatDate'
import { generateImageSizes } from '@/utils/generateImageSizes'
import { useRoutePreservedState } from '@/utils/useRoutePreservedState'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

type Props = {
  section: BlogPostsListSectionFragment
}

const BlogPostsByTags = ({ section }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const { title, text } = section

  const [filters, setFilters] = useRoutePreservedState({
    ...blogPostsDefaultFilters,
  })

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const { data: pageCategoriesData } = useQuery({
    queryKey: ['pageCategories', locale],
    queryFn: () => client.pageCategories({ locale }),
    staleTime: Infinity,
  })

  const { data: blogPostsTagsData } = useQuery({
    queryKey: ['blogPostsTags', locale],
    queryFn: () => client.blogPostsTags({ locale }),
    staleTime: Infinity,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleTagsChange = (tags: string[]) => {
    setFilters({ ...filters, tagIds: tags })
  }

  return (
    <div className="flex flex-col gap-8">
      <BlogPostsFilter
        pageCategories={pageCategoriesData?.pageCategories?.data ?? []}
        blogPostsTags={blogPostsTagsData?.tags?.data ?? []}
        onTagChange={handleTagsChange}
      />
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.hits.map((card) => {
          if (!card.attributes) return null

          // TODO refactor sections that use BlogPostCard - it needs too much duplicate code while passing props
          const {
            title: blogPostTitle,
            slug,
            coverImage,
            tag,
            date_added,
            publishedAt,
            excerpt,
          } = card.attributes
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={slug}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="shadow"
              date={getNumericLocalDate(date_added ?? publishedAt)}
              tag={tagTitle ?? undefined}
              title={blogPostTitle ?? ''}
              text={excerpt ?? undefined}
              linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={imageSizes}
            />
          )
        })}
      </div>

      {data?.estimatedTotalHits ? (
        <Pagination
          key={filters.search}
          totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
          currentPage={filters.page}
          onPageChange={handlePageChange}
        />
      ) : null}
    </div>
  )
}

export default BlogPostsByTags

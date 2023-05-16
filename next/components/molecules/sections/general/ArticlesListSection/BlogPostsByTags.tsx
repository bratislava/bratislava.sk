import { BlogPostsListSectionFragment } from '@backend/graphql'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  getBlogPostsQueryKey,
} from '@backend/meili/fetchers/blogPostsFetcherReactQuery'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import Pagination from '@components/ui/Pagination/Pagination'
import { useQuery } from '@tanstack/react-query'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import { getNumericLocalDate } from '@utils/local-date'
import { useRoutePreservedState } from '@utils/useRoutePreservedState'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

type Props = {
  section: BlogPostsListSectionFragment
}

const BlogPostsByTags = ({ section }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const { title, text, tags } = section

  const tagIds = tags?.data.map((tag) => tag.id).filter(isDefined) ?? []

  const [filters, setFilters] = useRoutePreservedState({
    ...blogPostsDefaultFilters,
    tagIds,
  })

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <div className="flex flex-col gap-8">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <h2 className="text-h2">{title}</h2>}
          {text && <div>{text}</div>}
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
          } = card.attributes
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={card.id}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="shadow"
              date={getNumericLocalDate(date_added ?? publishedAt)}
              tag={tagTitle ?? undefined}
              title={blogPostTitle ?? ''}
              linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
              imgSrc={coverImage?.data?.attributes?.url}
              imgSizes={imageSizes}
            />
          )
        })}
      </div>

      {data?.estimatedTotalHits && (
        <Pagination
          key={filters.search}
          totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
          currentPage={filters.page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default BlogPostsByTags

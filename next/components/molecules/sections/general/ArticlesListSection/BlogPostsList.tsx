import { BlogPostsByTagsSectionFragment, BlogPostsListSectionFragment } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import {
  blogPostsDefaultFilters,
  blogPostsFetcher,
  blogPostsTagsFetcher,
  getBlogPostsQueryKey,
  pageCategoriesFetcher,
} from '@backend/meili/fetchers/blogPostsFetcherReactQuery'
import BlogPostsFilter from '@bratislava/ui-bratislava/ArticlesFilter/BlogPostsFilter'
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
  section: BlogPostsByTagsSectionFragment | BlogPostsListSectionFragment
}

const BlogPostsByTags = ({ section }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const { title, text } = section

  const [filters, setFilters] = useRoutePreservedState({
    ...blogPostsDefaultFilters,
  })

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  // GRAPHQL fetchers
  const { data: pageCategoriesFromGraphqlData } = useQuery({
    queryKey: ['pageCategoriesFromGraphQL', locale],
    queryFn: () => client.pageCategories({ locale }),
    staleTime: Infinity,
  })

  const { data: blogPostsTagsFromGraphqlData } = useQuery({
    queryKey: ['BlogPostsTagsFromGraphQL', locale],
    queryFn: () => client.blogPostsTags({ locale }),
    staleTime: Infinity,
  })

  // MEILI fetchers
  const { data: pageCategoriesData } = useQuery({
    queryKey: ['PageCategories', locale],
    queryFn: () => pageCategoriesFetcher(locale),
  })

  const { data: blogPostsTagsData } = useQuery({
    queryKey: ['BlogPostsTags', locale],
    queryFn: () => blogPostsTagsFetcher(locale),
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleTagFilterChange = (tags: string[]) => {
    setFilters({ ...filters, tagIds: tags })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Debug Graphql ↓↓ */}
      <div>
        <div>
          <p className="text-size-h5">PageCategories from GraphQL</p>
          <div className="grid grid-cols-2">
            {pageCategoriesFromGraphqlData?.pageCategories?.data.map((pageCategory, i) => (
              <p className="py-2 text-size-p-small">
                {i}: {JSON.stringify(pageCategory)}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-size-h5">Blog Post tags from GraphQL</p>
          <div className="grid grid-cols-3">
            {blogPostsTagsFromGraphqlData?.tags?.data.map((tag, i) => (
              <p className="py-1 text-[7pt]">
                {i}: {JSON.stringify(tag)}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Debug Graphql ↑↑ */}
      {/* Debug Meili ↓↓ */}
      {/* <div>
        <p className="text-size-h5">PageCategories from Meilisearch</p>
        <div className="grid grid-cols-2">
          {pageCategoriesData?.map((pageCategory, i) => (
            <p className="py-2 text-size-p-small">
              {i}: {JSON.stringify(pageCategory)}
            </p>
          ))}
        </div>
      </div>
      <div>
        <p className="text-size-h5">Blog Post tags from Meilisearch</p>
        <div className="grid grid-cols-2">
          {blogPostsTagsData?.map((tag, i) => (
            <p className="py-2 text-size-p-small">
              {i}: {JSON.stringify(tag)}
            </p>
          ))}
        </div>
      </div> */}
      {/* Debug Meili ↑↑ */}
      <BlogPostsFilter
        tags={pageCategoriesFromGraphqlData?.pageCategories?.data ?? []}
        subTags={blogPostsTagsFromGraphqlData?.tags?.data ?? []}
        onSubTagChange={handleTagFilterChange}
      />
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
              key={slug}
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

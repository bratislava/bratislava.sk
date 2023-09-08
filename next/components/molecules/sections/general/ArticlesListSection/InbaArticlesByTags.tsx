import { InbaArticlesListSectionFragment } from '@backend/graphql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@backend/meili/fetchers/inbaArticlesFetcher'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import Pagination from '@components/ui/Pagination/Pagination'
import { useQuery } from '@tanstack/react-query'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getNumericLocalDate } from '@utils/local-date'
import { useRoutePreservedState } from '@utils/useRoutePreservedState'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

type Props = {
  section: InbaArticlesListSectionFragment
}

const InbaArticlesByTags = ({ section }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const { title, text } = section

  // TODO filter by tags
  // const tagIds = tags?.data.map((tag) => tag.id).filter(isDefined) ?? []

  const [filters, setFilters] = useRoutePreservedState({ ...inbaArticlesDefaultFilters })

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
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
          const { title: blogPostTitle, slug, coverImage, publishedAt } = card.attributes
          // const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          // const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={slug}
              // style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="shadow"
              date={getNumericLocalDate(publishedAt)}
              // tag={tagTitle ?? undefined}
              title={blogPostTitle ?? ''}
              linkProps={{ children: t('readMore'), href: `/inba/blog/${slug}` }}
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

export default InbaArticlesByTags

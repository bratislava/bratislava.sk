import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import BlogPostCard from '@/src/components/cards/BlogPostCard'
import Pagination from '@/src/components/common/Pagination/Pagination'
import { BlogPostsByCategorySectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'
import { useTranslation } from '@/src/utils/useTranslation'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

type Props = {
  section: BlogPostsByCategorySectionFragment
}

const BlogPostsByCategory = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text, category } = section

  const [filters, setFilters] = useRoutePreservedState({
    ...articlesDefaultFilters,
  })

  const { data: tagsData } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
  })

  const tagIds =
    tagsData?.tags?.data
      .filter((tag) => {
        return tag.attributes?.pageCategory?.data?.id === category?.data?.id
      })
      .map((tag) => tag.id ?? '')
      .filter(isDefined) ?? []

  useEffect(() => {
    setFilters({ ...filters, tagIds })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsData])

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
    enabled: filters.tagIds.length > 0,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <div className="flex flex-col gap-8">
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
          const { title: articleTitle, slug, coverMedia, tag, addedAt } = card.attributes
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={slug}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              date={getNumericLocalDate(addedAt)}
              tag={tagTitle ?? undefined}
              title={articleTitle ?? ''}
              linkProps={{ children: t('readMore'), href: `/spravy/${slug}` }}
              imgSrc={coverMedia?.data?.attributes?.url}
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

export default BlogPostsByCategory

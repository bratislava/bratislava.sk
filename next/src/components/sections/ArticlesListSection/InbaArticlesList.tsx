import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import InbaArticlesFilter from '@/src/components/common/InbaArticlesFilter/InbaArticlesFilter'
import Pagination from '@/src/components/common/Pagination/Pagination'
import { InbaArticlesListSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'
import { useTranslation } from '@/src/utils/useTranslation'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

type Props = {
  section: InbaArticlesListSectionFragment
}

const InbaArticlesList = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text } = section

  const [filters, setFilters] = useRoutePreservedState({ ...inbaArticlesDefaultFilters })

  const { data: tagData } = useQuery({
    queryKey: ['InbaTags', locale],
    queryFn: () => client.InbaTags({ locale }),
    staleTime: Infinity,
  })

  // TODO prefetch section
  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleTagFilterChange = (tags: string[]) => {
    setFilters({ ...filters, tagIds: tags })
  }

  return (
    <div className="flex flex-col gap-8">
      <InbaArticlesFilter tags={tagData?.inbaTags?.data || []} onChange={handleTagFilterChange} />
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.hits.map((card) => {
          if (!card.attributes) return null

          // TODO refactor sections that use ArticleCard - it needs too much duplicate code while passing props
          const {
            title: inbaArticleTitle,
            slug,
            coverImage,
            publishedAt,
            inbaTag,
            perex,
          } = card.attributes
          const tagTitle = inbaTag?.data?.attributes?.title

          return (
            <ArticleCard
              key={slug}
              date={getNumericLocalDate(publishedAt)}
              tag={tagTitle}
              title={inbaArticleTitle}
              text={perex ?? undefined}
              linkProps={{ children: t('readMore'), href: `/inba/clanky/${slug}` }}
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

export default InbaArticlesList

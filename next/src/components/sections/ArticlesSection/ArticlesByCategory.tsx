import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ArticlesSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: ArticlesSectionFragment
}

/**
 * TODO Figma link
 */

const ArticlesByCategory = ({ section }: Props) => {
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
    tagsData?.tags
      .filter((tag) => {
        return tag?.pageCategory?.documentId === category?.documentId
      })
      .map((tag) => tag?.documentId ?? '')
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
      <SectionHeader title={title} text={text} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.hits.map((card) => <ArticleCard key={card.slug} {...transformArticleProps(card)} />)}
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

export default ArticlesByCategory

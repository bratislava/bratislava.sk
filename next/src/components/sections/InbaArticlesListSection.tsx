import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformInbaArticleProps } from '@/src/components/cards/transformInbaArticleProps'
import InbaArticlesFilter from '@/src/components/common/InbaArticlesFilter/InbaArticlesFilter'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { InbaArticlesListSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: InbaArticlesListSectionFragment
}

/**
 * TODO Figma link
 */

const InbaArticlesListSection = ({ section }: Props) => {
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
    <SectionContainer>
      <div className="flex flex-col gap-8">
        <InbaArticlesFilter tags={tagData?.inbaTags?.data || []} onChange={handleTagFilterChange} />
        <SectionHeader title={title} text={text} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.hits.map((card) => {
            return card.attributes ? (
              <ArticleCard
                key={card.attributes.slug}
                {...transformInbaArticleProps(card.attributes)}
              />
            ) : null
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
    </SectionContainer>
  )
}

export default InbaArticlesListSection

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import InbaReleaseCard from '@/src/components/cards/InbaReleaseCard'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { InbaReleasesSectionFragment } from '@/src/services/graphql'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@/src/services/meili/fetchers/inbaReleasesFetcher'
import { formatDate } from '@/src/utils/formatDate'

type Props = { section: InbaReleasesSectionFragment }

/**
 * TODO Figma link
 */

const InbaReleasesSection = ({ section }: Props) => {
  const { title, text } = section

  const [filters, setFilters] = useState(inbaReleasesDefaultFilters)

  const { data } = useQuery({
    queryKey: getInbaReleasesQueryKey(filters),
    queryFn: () => inbaReleasesFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <SectionContainer>
      <div className="flex flex-col gap-8">
        <SectionHeader title={title} text={text} />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {data?.hits.map((inbaRelease) => {
          const {
            title: inbaReleaseTitle,
            slug,
            coverImage,
            releaseDate,
            perex,
          } = inbaRelease.attributes

          return (
            <InbaReleaseCard
              key={slug}
              date={formatDate(releaseDate)}
              title={inbaReleaseTitle}
              text={perex}
              linkHref={`/inba/vydania/${slug}`}
              imgSrc={coverImage?.data?.attributes?.url}
              // imgSizes={imageSizes}
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

export default InbaReleasesSection

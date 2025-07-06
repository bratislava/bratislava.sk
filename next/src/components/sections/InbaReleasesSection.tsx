import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import InbaReleaseHorizontalCard from '@/src/components/cards/InbaReleaseHorizontalCard'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { InbaReleasesSectionFragment } from '@/src/services/graphql'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@/src/services/graphql/fetchers/inbaReleases.fetcher'
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

  if (!data?.inbaReleases?.data?.length) {
    return null
  }

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <SectionContainer>
      <div className="flex flex-col gap-8">
        <SectionHeader title={title} text={text} />

        <div className="flex flex-col gap-8">
          {data.inbaReleases.data.map((inbaRelease) => {
            if (!inbaRelease.attributes) return null

            // TODO refactor sections that use ArticleCard - it needs too much duplicate code while passing props
            const {
              title: inbaReleaseTitle,
              slug,
              coverImage,
              releaseDate,
              perex,
            } = inbaRelease.attributes

            return (
              <InbaReleaseHorizontalCard
                key={slug}
                date={formatDate(releaseDate)}
                title={inbaReleaseTitle}
                text={perex}
                linkHref={`/inba/archiv/${slug}`}
                imgSrc={coverImage?.data?.attributes?.url}
                // imgSizes={imageSizes}
              />
            )
          })}
        </div>

        {data.inbaReleases.data.length > 0 ? (
          <Pagination
            totalCount={Math.ceil(data.inbaReleases.data.length / filters.pageSize)}
            currentPage={filters.page}
            onPageChange={handlePageChange}
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default InbaReleasesSection

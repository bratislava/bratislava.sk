import { InbaReleasesSectionFragment } from '@backend/graphql'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@backend/graphql/fetchers/inbaReleases.fetcher'
import { Typography } from '@bratislava/component-library'
import InbaReleaseHorizontalCard from '@components/molecules/presentation/InbaReleaseHorizontalCard'
import Pagination from '@components/ui/Pagination/Pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/local-date'
import React, { useState } from 'react'

type Props = { section: InbaReleasesSectionFragment }

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
    <div className="flex flex-col gap-8">
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}

      <div className="flex flex-col gap-8">
        {data.inbaReleases.data.map((inbaRelease) => {
          if (!inbaRelease.attributes) return null

          // TODO refactor sections that use BlogPostCard - it needs too much duplicate code while passing props
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
              variant="shadow"
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
  )
}

export default InbaReleasesSection

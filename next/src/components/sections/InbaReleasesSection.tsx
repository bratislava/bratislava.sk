import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import InbaReleaseCard from '@/src/components/cards/InbaReleaseCard'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { InbaReleasesSectionFragment } from '@/src/services/graphql'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@/src/services/meili/fetchers/inbaReleasesFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '25vw' })

type Props = { section: InbaReleasesSectionFragment }

/**
 * TODO Figma link
 */

const InbaReleasesSection = ({ section }: Props) => {
  const { t } = useTranslation()

  const { title, text } = section

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  const [filters, setFilters] = useState(inbaReleasesDefaultFilters)

  useEffect(() => {
    setFilters((previousState) => ({ ...previousState, search: debouncedInput, page: 1 }))
  }, [debouncedInput, setFilters])

  const { data, isPending, isError, error, isFetching } = useQuery({
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

        <SearchBar
          input={input}
          setInput={setInput}
          setSearchQuery={(value) =>
            setFilters((previousState) => ({ ...previousState, search: value, page: 1 }))
          }
          isLoading={isFetching}
        />

        {isError ? (
          <Typography variant="p-default">{error?.message}</Typography>
        ) : isPending ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-12">
            {data.hits.length > 0 ? (
              <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {data.hits.map((inbaRelease) => {
                  const {
                    title: inbaReleaseTitle,
                    slug,
                    coverImage,
                    releaseDate,
                    perex,
                  } = inbaRelease.attributes

                  return (
                    <li key={slug}>
                      <InbaReleaseCard
                        date={formatDate(releaseDate)}
                        title={inbaReleaseTitle}
                        text={perex}
                        linkHref={`/inba/vydania/${slug}`}
                        imgSrc={coverImage?.data?.attributes?.url}
                        imgSizes={imageSizes}
                      />
                    </li>
                  )
                })}
              </ul>
            ) : null}

            {data?.estimatedTotalHits ? (
              <Pagination
                key={filters.search}
                totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
                currentPage={filters.page}
                onPageChange={handlePageChange}
              />
            ) : (
              <Typography>{t('SearchPage.noResults')}</Typography>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default InbaReleasesSection

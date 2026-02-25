import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import JobOfferRowCard from '@/src/components/cards/JobOfferRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import PaginationWithInput from '@/src/components/common/Pagination/PaginationWithInput'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { JobOffersSectionFragment } from '@/src/services/graphql'
import {
  fetchNalgooJobOffers,
  getNalgooJobOffersQueryKey,
} from '@/src/services/nalgoo/nalgooJobOffers.fetcher'
import { useTranslation } from '@/src/utils/useTranslation'

type JobOffersSectionProps = { section: JobOffersSectionFragment }

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-16152&t=7BaHype1nMgzyjER-4
 */

const JobOffersSection = ({ section }: JobOffersSectionProps) => {
  const { t } = useTranslation()
  const { title, text, titleLevel } = section

  const { data, isPending, isError, error } = useQuery({
    queryKey: getNalgooJobOffersQueryKey(),
    queryFn: () => fetchNalgooJobOffers(),
    staleTime: Infinity,
  })

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
    totalItems: 0,
  })

  useEffect(() => {
    if (data?.length && !isError)
      setPagination((prev) => ({ ...prev, currentPage: 1, totalItems: data.length }))
  }, [data, isError])

  const paginatedData =
    data?.length && !isError
      ? data.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize,
        )
      : []

  return (
    <SectionContainer>
      <div className="flex w-full flex-col gap-6">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />
        {isPending ? (
          <LoadingSpinner />
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <ul className="flex flex-col rounded-lg border py-2">
                  {paginatedData.map((jobOffer, index) => {
                    return (
                      <Fragment key={jobOffer.id}>
                        {index > 0 ? (
                          <HorizontalDivider className="mx-4 lg:mx-6" asListItem />
                        ) : null}
                        <li className="w-full">
                          <JobOfferRowCard
                            cardTitleLevel={getCardTitleLevel(titleLevel)}
                            jobOffer={jobOffer}
                          />
                        </li>
                      </Fragment>
                    )
                  })}
                </ul>
                {pagination.totalItems > pagination.pageSize && (
                  <div className="self-center">
                    <PaginationWithInput
                      currentPage={pagination.currentPage}
                      totalCount={
                        pagination.totalItems > 0
                          ? Math.ceil(pagination.totalItems / pagination.pageSize)
                          : 1
                      }
                      onPageChange={(newPage) => {
                        setPagination((prev) => ({ ...prev, currentPage: newPage }))
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <Typography>{t('SearchPage.noResults')}</Typography>
            )}
          </>
        )}
      </div>
    </SectionContainer>
  )
}

export default JobOffersSection

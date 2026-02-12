import { useQuery } from '@tanstack/react-query'
import React, { Fragment } from 'react'

import JobOfferRowCard from '@/src/components/cards/JobOfferRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Spinner from '@/src/components/common/Spinner/Spinner'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { JobOffersSectionFragment } from '@/src/services/graphql'
import {
  fetchNalgooJobOffers,
  getNalbooJobOffersQueryKey,
} from '@/src/services/nalgoo/nalgooJobOffers.fetcher'

type JobOffersSectionProps = { section: JobOffersSectionFragment }

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-16152&t=7BaHype1nMgzyjER-4
 */

const JobOffersSection = ({ section }: JobOffersSectionProps) => {
  const { title, text, titleLevel } = section

  const { data, isPending, isError, error } = useQuery({
    queryKey: getNalbooJobOffersQueryKey(),
    queryFn: () => fetchNalgooJobOffers(),
    staleTime: Infinity,
  })

  return (
    <SectionContainer>
      {isPending ? (
        <Spinner />
      ) : isError ? (
        <div>{error.message}</div>
      ) : (
        <div className="flex w-full flex-col gap-6">
          <SectionHeader title={title} text={text} />
          <ul className="flex flex-col rounded-lg border">
            {data.map((jobOffer, index) => {
              return (
                <Fragment key={jobOffer.id}>
                  {index > 0 ? <HorizontalDivider asListItem /> : null}
                  <li className="w-full p-1">
                    <JobOfferRowCard titleLevel={titleLevel} jobOffer={jobOffer} />
                  </li>
                </Fragment>
              )
            })}
          </ul>
        </div>
      )}
    </SectionContainer>
  )
}

export default JobOffersSection

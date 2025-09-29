import { useQuery } from '@tanstack/react-query'
import React from 'react'

import TootootEventCard from '@/src/components/cards/TootootEventCard'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import Spinner from '@/src/components/common/Spinner/Spinner'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { TootootEventsSectionFragment } from '@/src/services/graphql'
import {
  getTootootEvents,
  getTootootEventsQueryKey,
} from '@/src/services/tootoot/tootootEvents.fetcher'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

type Props = {
  section: TootootEventsSectionFragment
  variant?: 'carousel' | 'grid'
  className?: string
}

/**
 * TODO Figma link
 */

const TootootEventsSection = ({ section, variant = 'carousel', className }: Props) => {
  const { title, text, showMoreLink } = section

  const { data, isPending, isError, error } = useQuery({
    queryKey: getTootootEventsQueryKey(),
    queryFn: () => getTootootEvents(),
  })

  const eventCards =
    data?.map((event) => {
      const {
        title: eventTitle,
        url,
        image: imageSrc,
        address,
        beginDate,
        endDate,
        isLongTerm,
      } = event

      return (
        <TootootEventCard
          key={url}
          lang="sk" // Specify language for screen readers because we fetch only SK events also on EN page
          title={eventTitle}
          linkHref={url}
          imageSrc={imageSrc}
          address={address}
          dateFrom={beginDate}
          dateTo={endDate}
          isLongTerm={isLongTerm}
          imageSizes={imageSizes}
          className="h-full"
        />
      )
    }) ?? []

  return (
    <SectionContainer className={className}>
      <div
        className={cn('flex flex-col', {
          'max-md:gap-6': variant === 'carousel', // From md screen, we don't want gap because we show carousel control buttons and it would be too much white space
          'gap-6 lg:gap-12': variant === 'grid', // We always want a gap for grid variant
        })}
      >
        <div className="flex flex-col gap-6 lg:gap-8">
          <SectionHeader title={title} text={text} isCentered />

          {isPending ? (
            <Spinner />
          ) : isError ? (
            <div>{error.message}</div>
          ) : variant === 'carousel' ? (
            <ResponsiveCarousel
              shiftVariant="byPage"
              hasVerticalPadding={false}
              items={eventCards}
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {eventCards}
            </div>
          )}
        </div>

        {showMoreLink && (
          <div className="flex justify-center">
            <Button variant="outline" {...getLinkProps(showMoreLink)} />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default TootootEventsSection

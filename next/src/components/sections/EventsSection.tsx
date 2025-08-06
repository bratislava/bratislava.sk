import React, { useRef, useState } from 'react'

import EventCard from '@/src/components/cards/EventCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { EventsSectionFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type EventsSectionProps = {
  section: EventsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15683&t=TnBDoFjQ0SyGzgY6-4
 */

const EventsSection = ({ section }: EventsSectionProps) => {
  const { title, text, titleLevelEventsSection: titleLevel, eventPages } = section

  const imageSizes = generateImageSizes({ default: '100vw', md: '33vw' })

  const [currentPage, setCurrentPage] = useState<number>(1)
  const PAGE_SIZE = 8

  const totalEventPages = eventPages.filter(isDefined)
  const eventPagesToShow = totalEventPages.slice(
    PAGE_SIZE * (currentPage - 1),
    PAGE_SIZE * currentPage,
  )

  const scrollRef = useRef<null | HTMLDivElement>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex scroll-m-20 flex-col gap-8" ref={scrollRef}>
        <div className="flex flex-col gap-6 lg:gap-12">
          <SectionHeader title={title} text={text} titleLevel={titleLevel} />

          <ul className="flex flex-col gap-8 lg:gap-4">
            {eventPagesToShow.map((eventPage) => {
              const {
                documentId,
                title: eventPageTitle,
                pageBackgroundImage,
                pageHeaderSections,
              } = eventPage

              // Pages have always max 1 header
              const [header] = pageHeaderSections ?? []
              const { date, address } =
                header?.__typename === 'ComponentHeaderSectionsEvent' ? header : {}

              const metadata = [formatDate(date), address]
                .filter((metadataItem) => !!metadataItem)
                .join('  •  ')

              return (
                <li key={documentId}>
                  <EventCard
                    title={eventPageTitle}
                    linkHref={getLinkProps({ page: eventPage }).href}
                    imageSrc={pageBackgroundImage?.url}
                    imageSizes={imageSizes}
                    metadata={metadata}
                    cardTitleLevel={getCardTitleLevel(titleLevel)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        {totalEventPages.length > PAGE_SIZE ? (
          <Pagination
            totalCount={Math.ceil(totalEventPages.length / PAGE_SIZE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default EventsSection

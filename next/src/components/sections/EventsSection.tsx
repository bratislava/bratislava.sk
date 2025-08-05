import React from 'react'

import EventCard from '@/src/components/cards/EventCard'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { EventsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type EventsSectionProps = {
  section: EventsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15683&t=TnBDoFjQ0SyGzgY6-4
 */

const EventsSection = ({ section }: EventsSectionProps) => {
  const { title, text, titleLevelEventsSection: titleLevel, eventPages } = section

  const filteredEventPages = eventPages.filter(isDefined)

  return (
    <SectionContainer className="py-6 lg:py-12">
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />

        <ul className="flex flex-col gap-8 lg:gap-4">
          {filteredEventPages.map((eventPage) => (
            <li key={eventPage.documentId}>
              <EventCard eventPage={eventPage} cardTitleLevel={getCardTitleLevel(titleLevel)} />
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default EventsSection

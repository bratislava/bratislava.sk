import { TimelineSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Timeline } from '@bratislava/ui-bratislava'
import { isDefined } from '@utils/isDefined'
import React from 'react'

type TimelineSectionProps = {
  section: TimelineSectionFragment
}

const TimelineSection = ({ section }: TimelineSectionProps) => {
  return (
    <Timeline
      timelineItems={
        section?.timelineItems?.filter(isDefined).map((timelineItem) => {
          return { title: timelineItem.timelineItemTitle, ...timelineItem }
        }) ?? []
      }
    />
  )
}

export default TimelineSection

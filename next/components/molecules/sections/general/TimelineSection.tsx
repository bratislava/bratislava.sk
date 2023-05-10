import { TimelineSectionFragment } from '@backend/graphql'
import { Timeline } from '@bratislava/ui-bratislava/Timeline/Timeline'
import { isDefined } from '@utils/isDefined'
import React from 'react'

type TimelineSectionProps = {
  section: TimelineSectionFragment
}

const TimelineSection = ({ section }: TimelineSectionProps) => {
  return <Timeline timelineItems={section?.timelineItems?.filter(isDefined) ?? []} />
}

export default TimelineSection

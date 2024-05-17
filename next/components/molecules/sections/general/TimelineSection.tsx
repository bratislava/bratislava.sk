import React from 'react'

import { TimelineSectionFragment } from '@/backend/graphql'
import Timeline from '@/components/ui/Timeline/Timeline'
import { isDefined } from '@/utils/isDefined'

type TimelineSectionProps = {
  section: TimelineSectionFragment
}

const TimelineSection = ({ section }: TimelineSectionProps) => {
  return <Timeline timelineItems={section?.timelineItems?.filter(isDefined) ?? []} />
}

export default TimelineSection

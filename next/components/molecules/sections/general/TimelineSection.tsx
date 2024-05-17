import React from 'react'

import Timeline from '@/components/ui/Timeline/Timeline'
import { TimelineSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

type TimelineSectionProps = {
  section: TimelineSectionFragment
}

const TimelineSection = ({ section }: TimelineSectionProps) => {
  return <Timeline timelineItems={section?.timelineItems?.filter(isDefined) ?? []} />
}

export default TimelineSection

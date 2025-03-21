import React from 'react'

import Timeline from '@/src/components/common/Timeline/Timeline'
import { TimelineSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type TimelineSectionProps = {
  section: TimelineSectionFragment
}

const TimelineSection = ({ section }: TimelineSectionProps) => {
  return <Timeline timelineItems={section?.timelineItems?.filter(isDefined) ?? []} />
}

export default TimelineSection

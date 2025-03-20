import { Typography } from '@bratislava/component-library'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

import Markdown from '@/components/formatting/Markdown/Markdown'
import { TimelineItemBlockFragment } from '@/services/graphql'

type TimelineProps = {
  timelineItems: TimelineItemBlockFragment[]
}

const Timeline = ({ timelineItems }: TimelineProps) => {
  return (
    <VerticalTimeline animate={false} lineColor="rgb(var(--color-category-600))">
      {timelineItems.map((timelineItem, index) => (
        <VerticalTimelineElement
          key={timelineItem.id}
          textClassName="shadow-md"
          iconClassName="bg-category-600 flex flex-col justify-center items-center text-white text-h4 font-bold shadow-none"
          icon={<>{index + 1}</>}
        >
          <Typography type="h3" size="h4">
            {timelineItem.title}
          </Typography>
          <Markdown content={timelineItem.content} />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

export default Timeline

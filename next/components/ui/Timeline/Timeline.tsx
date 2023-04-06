import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

type TimelineItemProps = {
  id: string
  title?: string | null
  content?: string | null
}

type TimelineProps = {
  timelineItems: TimelineItemProps[]
}

export const Timeline = ({ timelineItems }: TimelineProps) => {
  return (
    <VerticalTimeline animate={false} lineColor="rgb(var(--color-category-600))">
      {timelineItems.map((timelineItem, index) => (
        <VerticalTimelineElement
          key={timelineItem.id}
          className={cx('vertical-timeline-element--borderless', {
            'vertical-timeline-element--with-image': index === 1 || index === 2,
          })}
          textClassName="shadow-md"
          iconClassName="bg-category-600 flex flex-col justify-center items-center text-white text-h4-bold shadow-none"
          icon={<>{index + 1}</>}
        >
          {index === 1 && (
            <Markdown
              content={`<img style='width: 200px; margin-top: -300px;' src='/email-mock-phone.png'><h4>${timelineItem.title}</h4>${timelineItem.content}`}
            />
          )}
          {index === 2 && (
            <Markdown
              content={`<img style='width: 200px; margin-top: -300px;' src='/payment-detail.png'><h4>${timelineItem.title}</h4>${timelineItem.content}`}
            />
          )}
          {index !== 1 && index !== 2 && (
            <Markdown content={`<h4>${timelineItem.title}</h4>${timelineItem.content}`} />
          )}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

export default Timeline

import cx from 'classnames'
import Image from 'next/image'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

import Markdown from '@/components/formatting/Markdown/Markdown'
import { TimelineItemBlockFragment } from '@/services/graphql'
import { generateImageSizes } from '@/utils/generateImageSizes'

type TimelineProps = {
  timelineItems: TimelineItemBlockFragment[]
}

const Timeline = ({ timelineItems }: TimelineProps) => {
  return (
    <VerticalTimeline animate={false} lineColor="rgb(var(--color-category-600))">
      {timelineItems.map((timelineItem, index) => (
        <VerticalTimelineElement
          key={timelineItem.id}
          className={cx({
            'vertical-timeline-element--with-image': index === 1 || index === 2,
          })}
          textClassName="shadow-md"
          iconClassName="bg-category-600 flex flex-col justify-center items-center text-white text-h4 font-bold shadow-none"
          icon={<>{index + 1}</>}
        >
          {(index === 1 || index === 2) && (
            <Image
              className="mx-auto -mt-72 w-52"
              src={index === 1 ? '/email-mock-phone.png' : '/payment-detail.png'}
              alt=""
              sizes={generateImageSizes({ default: '100vw', lg: '50vw' })}
              width={0}
              height={0}
            />
          )}
          {/* FIXME Typography. Convert to use Typography. Issue: Probably safe to convert but cant find page where is this used for testing */}
          <h3 className="text-h4">{timelineItem.title}</h3>
          <Markdown content={timelineItem.content} />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

export default Timeline

import { TimelineItemBlockFragment } from '@bratislava/strapi-sdk-homepage'
import Markdown from '@components/atoms/Markdown'
import { generateImageSizes } from '@utils/generateImageSizes'
import cx from 'classnames'
import Image from 'next/image'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'

type TimelineProps = {
  timelineItems: TimelineItemBlockFragment[]
}

export const Timeline = ({ timelineItems }: TimelineProps) => {
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
          <h3 className="text-h4">{timelineItem.title}</h3>
          <Markdown content={timelineItem.content} />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}

export default Timeline

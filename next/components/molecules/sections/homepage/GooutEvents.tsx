import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Carousel, Link } from '@bratislava/ui-bratislava'
import React from 'react'

import { FetchGooutEventsResult, GooutEvent } from '../../../../utils/goout'
import CardGradient from '../../../atoms/CardGradient'

interface IProps {
  title: string
  linkTitle: string
  linkUrl: string
  className?: string
}

const fetchGooutEvents = async () => {
  const res = await fetch('/api/goout-events')
  const data: FetchGooutEventsResult = await res.json()
  return data.events
}

const GooutEvents = ({ title, linkTitle, linkUrl, className }: IProps) => {
  const [gooutEvents, setGooutEvents] = React.useState<GooutEvent[]>([])

  const { Link: UILink } = useUIContext()

  React.useEffect(() => {
    fetchGooutEvents().then(setGooutEvents).catch(error => console.log(error))
  }, [])

  if (gooutEvents.length === 0) return null

  return (
    <div className={className}>
      <h2 className="text-center text-default font-semibold lg:text-2xl">{title}</h2>

      <div className="mt-6 gap-x-5 py-6 lg:mt-14 lg:gap-x-6">
        <Carousel
          className="-ml-7.5 -mr-7.5"
          shiftIndex={3}
          visibleItems={3}
          items={gooutEvents.map((ev, i) => (
            <CardGradient
              key={i}
              {...ev}
              mainImage={{
                id: ev.mainImage.id,
                src: ev.mainImage.src.replace('%%%', '800'),
              }}
              title={ev.title}
              description={
                <UILink
                  className="flex flex-col p-6 text-default font-semibold text-primary"
                  href={ev.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{ev.venue}</span>
                  <span>{ev.schedule}</span>
                </UILink>
              }
            />
          ))}
        />
      </div>

      <div className="mt-10 justify-center flex w-full text-center mb-10">
        <Link
          href={linkUrl}
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          iconPosition="right"
          className=" box-border rounded-lg border-2 border-primary py-3.5 px-6 text-sm lg:text-default"
        >
          {linkTitle}
        </Link>
      </div>
    </div>
  )
}

export default GooutEvents

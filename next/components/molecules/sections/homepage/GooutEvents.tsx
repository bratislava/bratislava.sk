import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Carousel, Link } from '@bratislava/ui-bratislava'
import { FetchGooutEventsResult, GooutEvent } from '@utils/goout'
import React from 'react'

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
    fetchGooutEvents()
      .then(setGooutEvents)
      .catch((error) => console.log(error))
  }, [])

  if (gooutEvents.length === 0) return null

  return (
    <div className={className}>
      <h2 className="text-h1 text-center">{title}</h2>

      <div className="mt-6 gap-x-5 py-6 lg:mt-14 lg:gap-x-6">
        <Carousel
          className="-mx-7.5"
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
                  className="text-p1 flex flex-col p-6 font-semibold text-primary"
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

      <div className="mt-10 flex w-full justify-center pb-[5rem] text-center">
        <Link
          href={linkUrl}
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          iconPosition="right"
          className=" text-p1 box-border rounded-lg border-2 border-primary py-3.5 px-6"
        >
          {linkTitle}
        </Link>
      </div>
    </div>
  )
}

export default GooutEvents

import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Carousel, Link } from '@bratislava/ui-bratislava'
import { ArrowRight, ChevronRight } from '@assets/images'
import React from 'react'
import { FetchGooutEventsResult, GooutEvent } from '../../../../utils/goout'
import CardGradient from '../../../atoms/CardGradient'

interface IProps {
  title: string
  linkTitle: string
  linkUrl: string
  className?: string
}

const GooutEvents = ({ title, linkTitle, linkUrl, className }: IProps) => {
  const [gooutEvents, setGooutEvents] = React.useState<GooutEvent[]>([])

  const { Link: UILink } = useUIContext()

  React.useEffect(() => {
    fetchGooutEvents().then(setGooutEvents)
  }, [])

  if (gooutEvents.length === 0) return null

  return (
    <div className={className}>
      <h2 className="font-semibold text-default text-center lg:text-2xl">{title}</h2>

      <div className="gap-x-5 lg:gap-x-6 mt-3 lg:mt-14 py-6">
        <Carousel
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
                  className="flex flex-col text-primary p-6 font-semibold text-default"
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

      <div className="hidden lg:flex w-full justify-center mt-10">
        <Link
          href={linkUrl}
          icon={<ChevronRight />}
          hoverIcon={<ArrowRight />}
          iconPosition="right"
          className="border-2 border-primary text-default py-3.5 px-6 box-border rounded-lg"
        >
          {linkTitle}
        </Link>
      </div>
    </div>
  )
}

const fetchGooutEvents = async () => {
  const res = await fetch('/api/goout-events')
  const data: FetchGooutEventsResult = await res.json()
  return data.events
}

export default GooutEvents

import { Typography } from '@bratislava/component-library'

import EventCard from '@/src/components/cards/EventCard'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

const EventsHomepageSection = () => {
  const { homepage, tootootEvents } = useHomepageContext()
  const { eventsSection } = homepage?.attributes ?? {}
  const { title, text, eventsPageLink } = eventsSection ?? {}

  return (
    <SectionContainer>
      <div className="py-8 md:pt-0">
        {title || text ? (
          <div className="flex flex-col gap-2 text-center lg:pt-18">
            {title && <Typography type="h2">{title}</Typography>}
            {text && <Typography type="p">{text}</Typography>}
          </div>
        ) : null}

        <ResponsiveCarousel
          shiftVariant="byPage"
          itemClassName="h-[14.5rem] lg:h-[18.75rem]" // 232px, lg: 300px
          items={
            tootootEvents?.map((event) => {
              const {
                title: eventTitle,
                url,
                image: imageSrc,
                address,
                beginDate,
                endDate,
                isLongTerm,
              } = event

              return (
                <EventCard
                  key={url}
                  title={eventTitle}
                  linkHref={url}
                  imageSrc={imageSrc}
                  address={address}
                  dateFrom={beginDate}
                  dateTo={endDate}
                  isLongTerm={isLongTerm}
                  imageSizes={imageSizes}
                />
              )
            }) ?? []
          }
        />
        {eventsPageLink && (
          <div className="flex justify-center">
            <Button variant="outline" {...getLinkProps(eventsPageLink)} />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default EventsHomepageSection

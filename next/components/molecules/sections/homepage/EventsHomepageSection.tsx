import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import EventCard from '@components/molecules/presentation/EventCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import React from 'react'

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

export const EventsHomepageSection = () => {
  const { homepage, tootootEvents } = useHomepageContext()
  const { eventsSection } = homepage?.attributes ?? {}
  const { title, text, eventsPageLink } = eventsSection ?? {}

  return (
    <SectionContainer>
      <div className="py-8 md:pt-0">
        {title || text ? (
          <div className="flex flex-col gap-2 text-center lg:pt-18">
            {title && <h2 className="text-h2">{title}</h2>}
            {text && <div>{text}</div>}
          </div>
        ) : null}

        <ResponsiveCarousel
          shiftIndex="all"
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
            <Button
              variant="category-outline"
              {...getCommonLinkProps(eventsPageLink)}
              endIcon={<ArrowRightIcon />}
            />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default EventsHomepageSection

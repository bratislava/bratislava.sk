import { ArrowRightIcon } from '@assets/ui-icons'
import { Carousel as CarouselOld } from '@bratislava/ui-bratislava/Carousel/Carousel'
import Button from '@components/forms/simple-components/Button'
import EventCard from '@components/molecules/presentation/EventCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import React from 'react'

// TODO: Old carousel works better on desktop, new one on mobile. We should unify them.

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
        {/* TODO standardize negative scroll spacing and card width */}
        <Carousel
          className="-mx-4 md:hidden"
          shiftIndex={1}
          visibleCount={1}
          listClassName="gap-4 py-8 px-4"
          itemClassName="w-[calc(100%-1rem)]"
          hideControls
          items={
            tootootEvents?.map((event, index) => {
              const {
                title: eventTitle,
                url,
                image: imageSrc,
                address,
                beginDate,
                endDate,
                isLongTerm,
              } = event

              return {
                key: `${index}`,
                element: (
                  <EventCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    title={eventTitle}
                    linkHref={url}
                    imageSrc={imageSrc}
                    address={address}
                    dateFrom={beginDate}
                    dateTo={endDate}
                    isLongTerm={isLongTerm}
                    imageSizes={imageSizes}
                  />
                ),
              }
            }) ?? []
          }
        />
        <CarouselOld
          className="hidden md:block"
          shiftIndex={3}
          visibleItems={3}
          scrollerClassName=""
          items={tootootEvents?.map((event, index) => {
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
              <div className="py-8">
                <EventCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  title={eventTitle}
                  linkHref={url}
                  imageSrc={imageSrc}
                  address={address}
                  dateFrom={beginDate}
                  dateTo={endDate}
                  isLongTerm={isLongTerm}
                  imageSizes={imageSizes}
                />
              </div>
            )
          })}
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

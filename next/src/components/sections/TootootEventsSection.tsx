import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'

import EventCard from '@/src/components/cards/EventCard'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import Spinner from '@/src/components/common/Spinner/Spinner'
import { TootootEventsSectionFragment } from '@/src/services/graphql'
import {
  getTootootEvents,
  getTootootEventsQueryKey,
} from '@/src/services/tootoot/tootootEvents.fetcher'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

const imageSizes = generateImageSizes({ default: '100vw', lg: '33vw' })

type Props = {
  section: TootootEventsSectionFragment
}

const TootootEventsSection = ({ section }: Props) => {
  const { title, text, showMoreLink } = section

  const { data, isPending, isError, error } = useQuery({
    queryKey: getTootootEventsQueryKey(),
    queryFn: () => getTootootEvents(),
  })

  return (
    <SectionContainer>
      <div className="py-8 md:pt-0">
        {title || text ? (
          <div className="flex flex-col gap-2 text-center lg:pt-18">
            {title && <Typography variant="h2">{title}</Typography>}
            {text && <Typography variant="p-default">{text}</Typography>}
          </div>
        ) : null}

        {isPending ? (
          <Spinner />
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          <ResponsiveCarousel
            shiftVariant="byPage"
            itemClassName="h-[14.5rem] lg:h-[18.75rem]" // 232px, lg: 300px
            items={
              data?.map((event) => {
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
                    lang="sk" // Specify language for screen readers because we fetch only SK events also on EN page
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
        )}
        {showMoreLink && (
          <div className="flex justify-center">
            <Button variant="outline" {...getLinkProps(showMoreLink)} />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default TootootEventsSection

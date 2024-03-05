import EventCard from '@components/molecules/presentation/EventCard'
import Stack from '@components/styleguide/Stack'
import Wrapper from '@components/styleguide/Wrapper'
import { generateImageSizes } from '@utils/generateImageSizes'
import React from 'react'

const EventCardShowcase = () => {
  return (
    <Wrapper direction="column" title="Event Card">
      <Stack direction="row">
        {/* Height end width should be set by parent component, e.g. Carousel */}
        <EventCard
          title="My Awesome Event"
          linkHref="#"
          address="123 Main St, Anytown USA"
          dateFrom="2023-05-12T15:00:00Z"
          dateTo="2023-05-12T15:00:00Z"
          imageSrc="https://cdn-api.bratislava.sk/strapi-homepage/upload/silvester_odpocitavanie_f45d8e6629.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="h-[14.5rem] w-[272px] lg:h-[18.75rem] lg:w-96"
        />
        <EventCard
          title="My Awesome With Very Very Very Very Very Very Very Very Very Long Event Name"
          linkHref="#"
          address="123 Main St, Very Very Very Very Very Very Long City USA"
          dateFrom="2023-05-12T15:00:00Z"
          dateTo="2023-05-12T18:00:00Z"
          imageSrc="https://cdn-api.bratislava.sk/strapi-homepage/upload/stretnutie_primatori_V4_Kyjev_2023_4ce75dbf56.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="h-[14.5rem] w-[272px] lg:h-[18.75rem] lg:w-96"
        />
      </Stack>
    </Wrapper>
  )
}
export default EventCardShowcase

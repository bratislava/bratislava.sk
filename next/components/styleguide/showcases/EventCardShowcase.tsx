import { Stack } from '@components/styleguide/Stack'
import { Wrapper } from '@components/styleguide/Wrapper'
import EventCard from '@components/ui/EventCard/EventCard'
import { generateImageSizes } from '@utils/generateImageSizes'
import React from 'react'

const EventCardShowcase = () => {
  return (
    <Wrapper direction="column" title="Event Card">
      <Stack direction="row">
        <EventCard
          headline="My Awesome Event"
          href="#"
          address="123 Main St, Anytown USA"
          dateTime="Saturday, April 9th at 7:00 PM"
          imageUrl="https://cdn-api.bratislava.sk/strapi-homepage/upload/silvester_odpocitavanie_f45d8e6629.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="w-[272px] lg:w-96"
        />
        <EventCard
          headline="My Awesome With Very Very Very Very Very Very Very Very Very Long Event Name"
          href="#"
          address="123 Main St, Very Very Very Very Very Very Long City USA"
          dateTime="Saturday, April 9th at 7:00 PM"
          imageUrl="https://cdn-api.bratislava.sk/strapi-homepage/upload/stretnutie_primatori_V4_Kyjev_2023_4ce75dbf56.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="w-[272px] lg:w-96"
        />
      </Stack>
    </Wrapper>
  )
}
export default EventCardShowcase

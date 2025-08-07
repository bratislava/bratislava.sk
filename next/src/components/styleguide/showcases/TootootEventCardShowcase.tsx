import React from 'react'

import TootootEventCard from '@/src/components/cards/TootootEventCard'
import Stack from '@/src/components/styleguide/Stack'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

const TootootEventCardShowcase = () => {
  return (
    <Wrapper direction="column" title="Event Card">
      <Stack direction="row">
        {/* Height end width should be set by parent component, e.g. Carousel */}
        <TootootEventCard
          title="My Awesome Event"
          linkHref="#"
          address="123 Main St, Anytown USA"
          dateFrom="2023-05-12T15:00:00Z"
          dateTo="2023-05-12T15:00:00Z"
          imageSrc="https://cdn-api.bratislava.sk/strapi-homepage/upload/silvester_odpocitavanie_f45d8e6629.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="h-58 w-[272px] lg:h-75 lg:w-96"
        />
        <TootootEventCard
          title="My Awesome With Very Very Very Very Very Very Very Very Very Long Event Name"
          linkHref="#"
          address="123 Main St, Very Very Very Very Very Very Long City USA"
          dateFrom="2023-05-12T15:00:00Z"
          dateTo="2023-05-12T18:00:00Z"
          imageSrc="https://cdn-api.bratislava.sk/strapi-homepage/upload/stretnutie_primatori_V4_Kyjev_2023_4ce75dbf56.jpg"
          imageSizes={generateImageSizes({ default: '272px', lg: '384px' })}
          className="h-58 w-[272px] lg:h-75 lg:w-96"
        />
      </Stack>
    </Wrapper>
  )
}
export default TootootEventCardShowcase

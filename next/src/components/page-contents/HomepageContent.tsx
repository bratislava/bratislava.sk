import React from 'react'

import Waves from '@/src/components/common/Waves/Waves'
import BookmarksHomepageSection from '@/src/components/sections/homepage-sections/BookmarksHomepageSection'
import EventsHomepageSection from '@/src/components/sections/homepage-sections/EventsHomepageSection'
import InbaHomepageSection from '@/src/components/sections/homepage-sections/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@/src/components/sections/homepage-sections/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@/src/components/sections/homepage-sections/TopServicesHomepageSection'
import WelcomeHomepageSection from '@/src/components/sections/homepage-sections/WelcomeHomepageSection'

const HomepageContent = () => {
  return (
    <>
      <BookmarksHomepageSection />

      <WelcomeHomepageSection />

      <Waves waveColor="rgb(var(--color-grey-50))" wavePosition="top" />

      <NewsAndInfoHomepageSection />

      <Waves wavePosition="bottom" waveColor="rgb(var(--color-grey-50))" />

      <EventsHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

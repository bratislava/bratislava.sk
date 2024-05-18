import { useTranslations } from 'next-intl'
import React from 'react'

import Waves from '@/components/common/Waves/Waves'
import BookmarksHomepageSection from '@/components/sections/homepage-sections/BookmarksHomepageSection'
import EventsHomepageSection from '@/components/sections/homepage-sections/EventsHomepageSection'
import InbaHomepageSection from '@/components/sections/homepage-sections/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@/components/sections/homepage-sections/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@/components/sections/homepage-sections/TopServicesHomepageSection'
import WelcomeHomepageSection from '@/components/sections/homepage-sections/WelcomeHomepageSection'

const HomepageContent = () => {
  const t = useTranslations()

  return (
    <>
      <BookmarksHomepageSection />

      <WelcomeHomepageSection />

      <Waves waveColor="rgb(var(--color-gray-50))" wavePosition="top" />

      <NewsAndInfoHomepageSection />

      <Waves wavePosition="bottom" waveColor="rgb(var(--color-gray-50))" />

      <EventsHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

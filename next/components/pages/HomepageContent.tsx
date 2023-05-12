import BookmarksHomepageSection from '@components/molecules/sections/homepage/BookmarksHomepageSection'
import EventsHomepageSection from '@components/molecules/sections/homepage/EventsHomepageSection'
import InbaHomepageSection from '@components/molecules/sections/homepage/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@components/molecules/sections/homepage/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@components/molecules/sections/homepage/TopServicesHomepageSection'
import { WelcomeHomepageSection } from '@components/molecules/sections/homepage/WelcomeHomepageSection'
import { Waves } from '@components/ui/Waves/Waves'
import { useTranslations } from 'next-intl'
import React from 'react'

const HomepageContent = () => {
  const t = useTranslations()

  return (
    <>
      <BookmarksHomepageSection />
      <WelcomeHomepageSection />

      <Waves waveColor="rgb(var(--color-gray-50))" wavePosition="top" />

      <NewsAndInfoHomepageSection />

      <Waves wavePosition="bottom" waveColor="rgb(var(--color-gray-50))" />

      {/* Replace with Tootoot, no need to extract. */}
      {/* <SectionContainer> */}
      {/*  <GooutEventsHomepageSection */}
      {/*    linkTitle={t('allEvents')} */}
      {/*    linkUrl="https://www.bkis.sk/podujatia/" */}
      {/*    title={t('upComingEvents')} */}
      {/*    className="mt-14" */}
      {/*  /> */}
      {/* </SectionContainer> */}

      <EventsHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

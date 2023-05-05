import BookmarksHomepageSection from '@components/molecules/sections/homepage/BookmarksHomepageSection'
import GooutEventsHomepageSection from '@components/molecules/sections/homepage/GooutEventsHomepageSection'
import InbaHomepageSection from '@components/molecules/sections/homepage/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@components/molecules/sections/homepage/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@components/molecules/sections/homepage/TopServicesHomepageSection'
import { WelcomeHomepageSection } from '@components/molecules/sections/homepage/WelcomeHomepageSection'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
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

      {/* Replace with Toottoot, no need to extract. */}
      <SectionContainer>
        <GooutEventsHomepageSection
          linkTitle={t('allEvents')}
          linkUrl="https://www.bkis.sk/podujatia/"
          title={t('upComingEvents')}
          className="mt-14"
        />
      </SectionContainer>

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

import BlogCardsPrimatorHomepageSection from '@components/molecules/sections/homepage/BlogCardsPrimatorHomepageSection'
import BookmarksHomepageSection from '@components/molecules/sections/homepage/BookmarksHomepageSection'
import GooutEventsHomepageSection from '@components/molecules/sections/homepage/GooutEventsHomepageSection'
import InbaHomepageSection from '@components/molecules/sections/homepage/InbaHomepageSection'
import TopNineHomepageSection from '@components/molecules/sections/homepage/TopNineHomepageSection'
import { WelcomeHomepageSection } from '@components/molecules/sections/homepage/WelcomeHomepageSection'
import { SectionContainer, Waves } from '@components/ui'
import { useTranslation } from 'next-i18next'
import React from 'react'

const HomepageContent = () => {
  const { t } = useTranslation('common')

  return (
    <>
      <BookmarksHomepageSection />
      <WelcomeHomepageSection />

      <Waves waveColor="rgb(var(--color-gray-50))" wavePosition="top" />

      <BlogCardsPrimatorHomepageSection />

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

      <TopNineHomepageSection />

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

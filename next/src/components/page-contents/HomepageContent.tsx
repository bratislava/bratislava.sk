import React from 'react'

import Waves from '@/src/components/common/Waves/Waves'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import InbaHomepageSection from '@/src/components/sections/homepage-sections/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@/src/components/sections/homepage-sections/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@/src/components/sections/homepage-sections/TopServicesHomepageSection'
import WelcomeHomepageSection from '@/src/components/sections/homepage-sections/WelcomeHomepageSection'
import TootootEventsSection from '@/src/components/sections/TootootEventsSection'

const HomepageContent = () => {
  const { homepage } = useHomepageContext()

  return (
    <>
      <WelcomeHomepageSection />

      <Waves waveColor="rgb(var(--color-grey-50))" wavePosition="top" />

      <NewsAndInfoHomepageSection />

      <Waves wavePosition="bottom" waveColor="rgb(var(--color-grey-50))" />

      {homepage?.attributes?.eventsSection ? (
        <TootootEventsSection section={homepage.attributes.eventsSection} />
      ) : null}

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />
      <TopServicesHomepageSection />
      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      {homepage?.attributes?.inbaSection ? <InbaHomepageSection /> : null}
    </>
  )
}

export default HomepageContent


import { Button } from '@bratislava/component-library'

import Waves from '@/src/components/common/Waves/Waves'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import InbaHomepageSection from '@/src/components/sections/homepage-sections/InbaHomepageSection'
import NewsAndInfoHomepageSection from '@/src/components/sections/homepage-sections/NewsAndInfoHomepageSection'
import TopServicesHomepageSection from '@/src/components/sections/homepage-sections/TopServicesHomepageSection'
import WelcomeHomepageSection from '@/src/components/sections/homepage-sections/WelcomeHomepageSection'
import TootootEventsSection from '@/src/components/sections/TootootEventsSection'

  const handleCookieConsentRenew = () => {
    if (typeof window === 'undefined') return
    console.log("Log after window check")
    const cookiebot = window.Cookiebot as { renew?: () => void } | undefined
    console.log("Cookiebot: ", cookiebot)
    cookiebot?.renew?.()
  }

const HomepageContent = () => {
  const { homepage } = useHomepageContext()

  const { eventsSection } = homepage ?? {}

  return (
    <>
    <SectionContainer>
      
      <Button variant="solid" fullWidth onClick={handleCookieConsentRenew}
      // eslint-disable-next-line i18next/no-literal-string
      >
        Cookiebot
      </Button>
    </SectionContainer>


      <WelcomeHomepageSection />

      <Waves waveColor="var(--color-grey-50)" wavePosition="top" />

      <NewsAndInfoHomepageSection />

      <Waves wavePosition="bottom" waveColor="var(--color-grey-50)" />

      {eventsSection ? (
        <TootootEventsSection section={eventsSection} className="lg:pt-18 py-8" />
      ) : null}

      <Waves waveColor="var(--color-category-200)" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="var(--color-category-200)" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

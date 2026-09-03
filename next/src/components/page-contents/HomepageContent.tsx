import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Waves from '@/src/components/common/Waves/Waves'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import AnnouncementBannerSection from '@/src/components/sections/homepage-sections/AnnouncementBannerSection'
import HighlightsHomepageSection from '@/src/components/sections/homepage-sections/HighlightsHomepageSection'
import HomepageTabs from '@/src/components/sections/homepage-sections/HomepageTabs/HomepageTabs'
import InbaHomepageSection from '@/src/components/sections/homepage-sections/InbaHomepageSection'
import MayorAndCouncilHomepageSection from '@/src/components/sections/homepage-sections/MayorAndCouncilHomepageSection'
import TopServicesHomepageSection from '@/src/components/sections/homepage-sections/TopServicesHomepageSection'
import WelcomeHomepageSection from '@/src/components/sections/homepage-sections/WelcomeHomepageSection'
import TootootEventsSection from '@/src/components/sections/TootootEventsSection'

const HomepageContent = () => {
  const { homepage } = useHomepageContext()

  const { eventsSection, announcementBannerSection } = homepage ?? {}

  return (
    <>
      <WelcomeHomepageSection />

      <Waves waveColor="var(--color-grey-50)" wavePosition="top" />

      <SectionContainer className="bg-background-passive-primary pb-14">
        <HighlightsHomepageSection />

        <HomepageTabs className="lg:mt-10" />

        {announcementBannerSection ? (
          <AnnouncementBannerSection
            {...announcementBannerSection}
            className="mt-8 mb-7.5 lg:mt-18 lg:mb-8.5"
          />
        ) : (
          <HorizontalDivider className="mt-8 lg:mt-18" />
        )}

        <MayorAndCouncilHomepageSection className="mt-8 lg:mt-18" />
      </SectionContainer>

      <Waves wavePosition="bottom" waveColor="var(--color-grey-50)" />

      {eventsSection ? (
        <TootootEventsSection section={eventsSection} className="py-8 lg:pt-18" />
      ) : null}

      <Waves waveColor="var(--color-category-200)" wavePosition="top" />

      <TopServicesHomepageSection />

      <Waves waveColor="var(--color-category-200)" wavePosition="bottom" />

      <InbaHomepageSection />
    </>
  )
}

export default HomepageContent

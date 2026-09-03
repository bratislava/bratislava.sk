import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import AnnouncementBannerSection, {
  AnnouncementBannerSectionProps,
} from '@/src/components/sections/homepage-sections/AnnouncementBannerSection'
import HighlightsHomepageSection from '@/src/components/sections/homepage-sections/HighlightsHomepageSection'
import HomepageTabs from '@/src/components/sections/homepage-sections/HomepageTabs/HomepageTabs'
import MayorAndCouncilHomepageSection from '@/src/components/sections/homepage-sections/MayorAndCouncilHomepageSection'

type Props = {
  announcementBannerSectionProps?: AnnouncementBannerSectionProps | null
}

const NewsAndInfoHomepageSection = ({ announcementBannerSectionProps }: Props) => {
  return (
    <SectionContainer className="bg-background-passive-primary pb-14">
      <HighlightsHomepageSection />

      <HomepageTabs className="lg:mt-10" />

      {announcementBannerSectionProps ? (
        <AnnouncementBannerSection
          {...announcementBannerSectionProps}
          variant="dark"
          className="mt-18 mb-8.5"
        />
      ) : (
        <HorizontalDivider className="mt-8 lg:mt-18" />
      )}

      <MayorAndCouncilHomepageSection className="mt-8 lg:mt-18" />
    </SectionContainer>
  )
}

export default NewsAndInfoHomepageSection

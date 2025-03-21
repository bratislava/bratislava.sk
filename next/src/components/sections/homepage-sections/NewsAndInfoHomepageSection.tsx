import React from 'react'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import HighlightsHomepageSection from '@/src/components/sections/homepage-sections/HighlightsHomepageSection'
import HomepageTabs from '@/src/components/sections/homepage-sections/HomepageTabs/HomepageTabs'
import MayorAndCouncilHomepageSection from '@/src/components/sections/homepage-sections/MayorAndCouncilHomepageSection'

const NewsAndInfoHomepageSection = () => {
  return (
    <SectionContainer className="bg-grey-50 pb-14">
      <HighlightsHomepageSection />
      <HomepageTabs className="lg:mt-10" />
      <HorizontalDivider className="mt-8 lg:mt-18" />
      <MayorAndCouncilHomepageSection className="mt-8 lg:mt-18" />
    </SectionContainer>
  )
}

export default NewsAndInfoHomepageSection

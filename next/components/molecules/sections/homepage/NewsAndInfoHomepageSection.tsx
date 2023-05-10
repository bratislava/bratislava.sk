import HighlightsHomepageSection from '@components/molecules/sections/homepage/HighlightsHomepageSection'
import HomepageTabs from '@components/molecules/sections/homepage/HomepageTabs/HomepageTabs'
import MayorAndCouncilHomepageSection from '@components/molecules/sections/homepage/MayorAndCouncilHomepageSection'
import HorizontalDivider from '@components/ui/Divider/HorizontalDivider'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import React from 'react'

const NewsAndInfoHomepageSection = () => {
  return (
    <SectionContainer className="bg-gray-50 pb-14 md:px-8">
      <HighlightsHomepageSection />
      <HomepageTabs className="lg:mt-10" />
      <HorizontalDivider className="mt-8 lg:mt-18" />
      <MayorAndCouncilHomepageSection className="mt-8 lg:mt-18" />
    </SectionContainer>
  )
}

export default NewsAndInfoHomepageSection

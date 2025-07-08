import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import GlobalSearchSectionContent from '@/src/components/sections/SearchSection/GlobalSearchSectionContent'

const RegulationsListSection = () => {
  return (
    <SectionContainer>
      <GlobalSearchSectionContent variant="specific" searchOption="regulations" />
    </SectionContainer>
  )
}

export default RegulationsListSection

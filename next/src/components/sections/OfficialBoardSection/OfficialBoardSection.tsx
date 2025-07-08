import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import GlobalSearchSectionContent from '@/src/components/sections/SearchSection/GlobalSearchSectionContent'

const OfficialBoardSection = () => {
  return (
    <SectionContainer>
      <GlobalSearchSectionContent variant="specific" searchOption="officialBoard" />
    </SectionContainer>
  )
}

export default OfficialBoardSection

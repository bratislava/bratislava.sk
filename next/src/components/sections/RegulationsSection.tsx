import React from 'react'

import Regulations from '@/src/components/common/Regulations/Regulations'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import GlobalSearchSectionContent from '@/src/components/sections/SearchSection/GlobalSearchSectionContent'
import { RegulationsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  const { showAll, regulations } = section

  return (
    <SectionContainer>
      {showAll ? (
        <GlobalSearchSectionContent variant="specific" searchOption="regulations" />
      ) : (
        <Regulations regulations={regulations.filter(isDefined)} />
      )}
    </SectionContainer>
  )
}

export default RegulationsSection

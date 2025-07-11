import React from 'react'

import Regulations from '@/src/components/common/Regulations/Regulations'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { RegulationsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return (
    <SectionContainer>
      <Regulations regulations={section.regulations.filter(isDefined)} />
    </SectionContainer>
  )
}

export default RegulationsSection

import React from 'react'

import Regulations from '@/src/components/common/Regulations/Regulations'
import { RegulationsSectionFragment } from '@/src/services/graphql'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations regulations={section.regulations?.data} />
}

export default RegulationsSection

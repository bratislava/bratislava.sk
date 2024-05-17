import React from 'react'

import Regulations from '@/components/molecules/sections/general/Regulations'
import { RegulationsSectionFragment } from '@/services/graphql'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations regulations={section.regulations?.data} />
}

export default RegulationsSection

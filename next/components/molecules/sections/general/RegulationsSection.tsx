import React from 'react'

import { RegulationsSectionFragment } from '@/backend/graphql'
import Regulations from '@/components/molecules/sections/general/Regulations'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations regulations={section.regulations?.data} />
}

export default RegulationsSection

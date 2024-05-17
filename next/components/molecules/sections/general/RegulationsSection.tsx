import Regulations from '@components/molecules/sections/general/Regulations'
import React from 'react'

import { RegulationsSectionFragment } from '@/backend/graphql'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations regulations={section.regulations?.data} />
}

export default RegulationsSection

import { RegulationsSectionFragment } from '@backend/graphql'
import Regulations from '@components/molecules/sections/general/Regulations'
import React from 'react'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations regulations={section.regulations?.data} />
}

export default RegulationsSection

import { RegulationsSectionFragment } from '@backend/graphql'
import Regulations from '@components/molecules/Regulations/Regulations'
import React from 'react'

type Props = {
  section: RegulationsSectionFragment
}

const RegulationsSection = ({ section }: Props) => {
  return <Regulations title={section.title ?? ''} regulations={section.regulations?.data} />
}

export default RegulationsSection

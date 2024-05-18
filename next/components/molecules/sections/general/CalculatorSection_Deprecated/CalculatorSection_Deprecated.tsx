import React from 'react'

import MinimumCalculator_Deprecated from '@/components/molecules/sections/general/CalculatorSection_Deprecated/MinimumCalculator_Deprecated'
import { CalculatorSectionFragment } from '@/services/graphql'

type CalculatorSectionProps = {
  section: CalculatorSectionFragment
}

const CalculatorSection = ({ section }: CalculatorSectionProps) => {
  return (
    <MinimumCalculator_Deprecated
      singleAdultValue={section.single_adult_value ?? 0}
      anotherAdultValue={section.another_adult_value ?? 0}
      childValue={section.child_value ?? 0}
    />
  )
}

export default CalculatorSection

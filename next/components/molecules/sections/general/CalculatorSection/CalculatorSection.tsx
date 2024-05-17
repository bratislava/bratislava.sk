import React from 'react'

import MinimumCalculator from '@/components/molecules/sections/general/CalculatorSection/MinimumCalculator'
import { CalculatorSectionFragment } from '@/services/graphql'

type CalculatorSectionProps = {
  section: CalculatorSectionFragment
}

const CalculatorSection = ({ section }: CalculatorSectionProps) => {
  return (
    <MinimumCalculator
      singleAdultValue={section.single_adult_value ?? 0}
      anotherAdultValue={section.another_adult_value ?? 0}
      childValue={section.child_value ?? 0}
    />
  )
}

export default CalculatorSection

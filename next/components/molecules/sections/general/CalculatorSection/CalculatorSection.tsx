import { ComponentSectionsCalculatorFragment } from '@bratislava/strapi-sdk-homepage'
import React from 'react'

import MinimumCalculator from './MinimumCalculator'

type CalculatorSectionProps = {
  section: ComponentSectionsCalculatorFragment
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

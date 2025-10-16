import React from 'react'

import NumbersOverview from '@/src/components/common/NumbersOverview/NumbersOverview'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { NumbersOverviewSectionFragment } from '@/src/services/graphql'

type NumbersOverviewSectionProps = {
  section: NumbersOverviewSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15665&t=Wf48kVcOZJ5EW5yW-4
 */

const NumbersOverviewSection = ({ section }: NumbersOverviewSectionProps) => {
  return (
    <SectionContainer className="py-6 lg:py-16">
      <NumbersOverview section={section} />
    </SectionContainer>
  )
}

export default NumbersOverviewSection

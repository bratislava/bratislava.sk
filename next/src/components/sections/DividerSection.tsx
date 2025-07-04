import React from 'react'

import Divider from '@/src/components/common/Divider/Divider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { DividerSectionFragment } from '@/src/services/graphql'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return (
    <SectionContainer>
      <Divider dividerStyle={section.style ?? undefined} />
    </SectionContainer>
  )
}

export default DividerSection

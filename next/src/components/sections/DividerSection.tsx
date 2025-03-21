import React from 'react'

import Divider from '@/src/components/common/Divider/Divider'
import { DividerSectionFragment } from '@/src/services/graphql'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

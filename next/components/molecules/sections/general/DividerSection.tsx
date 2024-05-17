import React from 'react'

import Divider from '@/components/ui/Divider/Divider'
import { DividerSectionFragment } from '@/services/graphql'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

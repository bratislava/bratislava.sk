import React from 'react'

import { DividerSectionFragment } from '@/backend/graphql'
import Divider from '@/components/ui/Divider/Divider'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

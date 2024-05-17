import Divider from '@bratislava/ui-bratislava/Divider/Divider'
import React from 'react'

import { DividerSectionFragment } from '@/backend/graphql'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

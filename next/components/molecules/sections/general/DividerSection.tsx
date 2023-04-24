import { DividerSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Divider } from '@bratislava/ui-bratislava/Divider/Divider'
import React from 'react'

type DividerSectionProps = {
  section: DividerSectionFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

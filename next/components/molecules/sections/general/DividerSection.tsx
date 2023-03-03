import { ComponentSectionsDividerFragment } from '@bratislava/strapi-sdk-homepage'
import { Divider } from '@bratislava/ui-bratislava'
import React from 'react'

type DividerSectionProps = {
  section: ComponentSectionsDividerFragment
}

const DividerSection = ({ section }: DividerSectionProps) => {
  return <Divider dividerStyle={section.style ?? undefined} />
}

export default DividerSection

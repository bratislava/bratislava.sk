import { ComponentSectionsNarrowTextFragment } from '@bratislava/strapi-sdk-homepage'
import { NarrowText } from '@bratislava/ui-bratislava'
import React from 'react'

type NarrowTextSectionProps = {
  section: ComponentSectionsNarrowTextFragment
}

const NarrowTextSection = ({ section }: NarrowTextSectionProps) => {
  return (
    <NarrowText
      align={section.align ?? undefined}
      content={section.content ?? undefined}
      width={section.width ?? undefined}
      hasBackground={section.hasBackground ?? false}
    />
  )
}

export default NarrowTextSection

import { NarrowTextSectionFragment } from '@backend/graphql'
import { NarrowText } from '@bratislava/ui-bratislava/NarrowText/NarrowText'
import React from 'react'

type NarrowTextSectionProps = {
  section: NarrowTextSectionFragment
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

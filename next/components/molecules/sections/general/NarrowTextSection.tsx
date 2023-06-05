import { NarrowTextSectionFragment } from '@backend/graphql'
import { NarrowText } from '@bratislava/ui-bratislava/NarrowText/NarrowText'
import Markdown from '@components/atoms/Markdown'
import React from 'react'

type NarrowTextSectionProps = {
  section: NarrowTextSectionFragment
}

const NarrowTextSection = ({ section }: NarrowTextSectionProps) => {
  if (!section.content) {
    return null
  }

  return (
    <NarrowText align={section.align ?? undefined} width={section.width ?? undefined}>
      <Markdown content={section.content} />
    </NarrowText>
  )
}

export default NarrowTextSection

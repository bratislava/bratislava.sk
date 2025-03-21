import React from 'react'

import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { NarrowTextSectionFragment } from '@/src/services/graphql'

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

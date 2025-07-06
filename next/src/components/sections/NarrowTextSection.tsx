import React from 'react'

import NarrowText from '@/src/components/common/NarrowText/NarrowText'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { NarrowTextSectionFragment } from '@/src/services/graphql'

type NarrowTextSectionProps = {
  section: NarrowTextSectionFragment
}

/**
 * TODO Figma link
 */

const NarrowTextSection = ({ section }: NarrowTextSectionProps) => {
  if (!section.content) {
    return null
  }

  return (
    <SectionContainer>
      <NarrowText align={section.align ?? undefined} width={section.width ?? undefined}>
        <Markdown content={section.content} />
      </NarrowText>
    </SectionContainer>
  )
}

export default NarrowTextSection

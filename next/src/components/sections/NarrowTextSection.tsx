import React from 'react'

import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { NarrowTextSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

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
      <div
        className={cn('w-full', {
          // TODO decide what is the default width
          // Using @container for apply narrower width only on pages without sidebar (50rem)
          '@min-[50rem]:w-10/12': section.width !== 'full',
        })}
      >
        <Markdown content={section.content} />
      </div>
    </SectionContainer>
  )
}

export default NarrowTextSection

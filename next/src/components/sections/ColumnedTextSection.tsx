import React from 'react'

import ColumnedText from '@/src/components/common/ColumnedText/ColumnedText'
import { ColumnedTextSectionFragment } from '@/src/services/graphql'

type ColumnedTextSectionProps = { section: ColumnedTextSectionFragment }

const ColumnedTextSection = ({ section }: ColumnedTextSectionProps) => {
  return (
    <ColumnedText
      content={section.content ?? ''}
      hasBackground={section.hasBackground ?? false}
      contentAlignment={section.contentAlignment ?? undefined}
    />
  )
}

export default ColumnedTextSection

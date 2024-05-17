import React from 'react'

import { ColumnedTextSectionFragment } from '@/backend/graphql'
import ColumnedText from '@/components/ui/ColumnedText/ColumnedText'

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

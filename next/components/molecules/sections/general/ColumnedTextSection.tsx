import { ColumnedTextSectionFragment } from '@backend/graphql'
import ColumnedText from '@bratislava/ui-bratislava/ColumnedText/ColumnedText'
import React from 'react'

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

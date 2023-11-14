import {
  ColumnedTextSectionFragment,
  Enum_Componentsectionscolumnedtext_Contentalignment,
} from '@backend/graphql'
import { ColumnedText } from '@bratislava/ui-bratislava/ColumnedText/ColumnedText'
import React from 'react'

type ColumnedTextSectionProps = { section: ColumnedTextSectionFragment }

const ColumnedTextSection = ({ section }: ColumnedTextSectionProps) => {
  return (
    <ColumnedText
      content={section.content ?? ''}
      hasBackground={section.hasBackground ?? false}
      contentAlignment={
        section.contentAlignment ?? Enum_Componentsectionscolumnedtext_Contentalignment.Left
      }
    />
  )
}

export default ColumnedTextSection

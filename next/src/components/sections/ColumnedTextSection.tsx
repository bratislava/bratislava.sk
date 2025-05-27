import React from 'react'

import ColumnedText from '@/src/components/common/ColumnedText/ColumnedText'
import { ColumnedTextSectionFragment } from '@/src/services/graphql'

type ColumnedTextSectionProps = { section: ColumnedTextSectionFragment }

const ColumnedTextSection = ({ section }: ColumnedTextSectionProps) => {
  return <ColumnedText title={section.title} content={section.content ?? ''} />
}

export default ColumnedTextSection

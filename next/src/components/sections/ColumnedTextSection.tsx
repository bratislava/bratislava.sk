import React from 'react'

import ColumnedText from '@/src/components/common/ColumnedText/ColumnedText'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { ColumnedTextSectionFragment } from '@/src/services/graphql'

type ColumnedTextSectionProps = { section: ColumnedTextSectionFragment }

const ColumnedTextSection = ({ section }: ColumnedTextSectionProps) => {
  return (
    <SectionContainer>
      <ColumnedText title={section.title} content={section.content ?? ''} />
    </SectionContainer>
  )
}

export default ColumnedTextSection

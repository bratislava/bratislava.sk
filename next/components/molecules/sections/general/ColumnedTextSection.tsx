import { ComponentSectionsColumnedTextFragment } from '@bratislava/strapi-sdk-homepage'
import { ColumnedText } from '@bratislava/ui-bratislava'
import React from 'react'

type ColumnedTextSectionProps = {section: ComponentSectionsColumnedTextFragment}

const ColumnedTextSection = ({section}: ColumnedTextSectionProps) => {
  return (
    <ColumnedText
      content={section.content ?? ''}
      hasBackground={section.hasBackground ?? false}
    />
  )
}

export default ColumnedTextSection

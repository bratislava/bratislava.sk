import TextWithImage from '@bratislava/ui-bratislava/TextWithImage/TextWithImage'
import React from 'react'

import { TextWithImageSectionFragment } from '@/backend/graphql'

type TextWithImageSectionProps = {
  section: TextWithImageSectionFragment
}

const TextWithImageSection = ({ section }: TextWithImageSectionProps) => {
  return (
    <TextWithImage
      imageSrc={section.imageSrc?.data?.attributes?.url ?? ''}
      imageWidth={section.imageSrc?.data?.attributes?.width}
      imageHeight={section.imageSrc?.data?.attributes?.height}
      imagePosition={section.imagePosition ?? 'left'}
      content={section.content ?? ''}
      imageAlternativeText={section.imageSrc?.data?.attributes?.alternativeText ?? undefined}
    />
  )
}

export default TextWithImageSection

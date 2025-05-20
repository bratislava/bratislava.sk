import React from 'react'

import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { TextWithImageSectionFragment } from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

type TextWithImageSectionProps = {
  section: TextWithImageSectionFragment
}

const TextWithImageSection = ({ section }: TextWithImageSectionProps) => {
  const { content, imagePosition, imageSrc: image } = section

  const ImageContent = (
    <div className="bg-background-passive-primary relative aspect-square size-full shrink-0 overflow-hidden rounded-3xl lg:size-[540px]">
      {image?.data?.attributes ? (
        <StrapiImage
          image={image.data.attributes}
          fill
          sizes={generateImageSizes({ default: '100vw', lg: '50vw' })}
          className="object-cover"
        />
      ) : (
        <ImagePlaceholder />
      )}
      <div />
    </div>
  )

  const TextContent = (
    <div>
      <Markdown content={content} />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-[8.5rem]">
      {imagePosition === 'left' ? (
        <>
          {ImageContent}
          {TextContent}
        </>
      ) : null}
      {imagePosition === 'right' ? (
        <>
          {TextContent}
          {ImageContent}
        </>
      ) : null}
    </div>
  )
}

export default TextWithImageSection

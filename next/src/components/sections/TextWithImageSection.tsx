import React from 'react'

import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import {
  Enum_Componentsectionstextwithimage_Imageaspectratio,
  TextWithImageSectionFragment,
} from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

type TextWithImageSectionProps = {
  section: TextWithImageSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16091-8478&m=dev
 *
 * Based on OLO ImageAndTextSection https://github.com/bratislava/olo.sk/blob/master/next/src/components/sections/ImageAndTextSection.tsx
 */

const TextWithImageSection = ({ section }: TextWithImageSectionProps) => {
  const { content, imagePosition, image, imageAspectRatio } = section

  const ImageContent = (
    <div
      className={cn(
        'bg-background-passive-primary relative size-full shrink-0 overflow-hidden rounded-3xl lg:w-[540px]',
        imageAspectRatio === Enum_Componentsectionstextwithimage_Imageaspectratio.Ratio_4_3
          ? 'aspect-[4/3]'
          : 'aspect-square',
      )}
    >
      {image.data?.attributes ? (
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

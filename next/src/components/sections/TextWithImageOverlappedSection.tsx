import React from 'react'

import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import {
  Enum_Componentsectionstextwithimageoverlapped_Imageposition,
  TextWithImageOverlappedSectionFragment,
} from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

type TextWithImageSectionProps = {
  section: TextWithImageOverlappedSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16091-8534&m=dev
 *
 * Based on OLO ImageAndTextOverlappedSection https://github.com/bratislava/olo.sk/blob/master/next/src/components/sections/ImageAndTextOverlappedSection.tsx
 */

const TextWithImageOverlappedSection = ({ section }: TextWithImageSectionProps) => {
  const { content, imagePositionTextWithImageOverlapped: imagePosition, image, links } = section
  const [primaryButton, secondaryButton] = links ?? []

  const isImageShifted =
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.LeftShifted ||
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.RightShifted

  const isImageLeft =
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.Left ||
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.LeftShifted
  const isImageRight =
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.Right ||
    imagePosition === Enum_Componentsectionstextwithimageoverlapped_Imageposition.RightShifted

  const TextContent = (
    <div className="flex grow flex-col gap-6">
      <Markdown content={content} />

      {primaryButton || secondaryButton ? (
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
          {primaryButton ? (
            <Button {...getLinkProps(primaryButton)} variant="solid" fullWidthMobile />
          ) : null}
          {secondaryButton ? (
            <Button {...getLinkProps(secondaryButton)} variant="outline" fullWidthMobile />
          ) : null}
        </div>
      ) : null}
    </div>
  )

  const DesktopTextContainer = (
    <div
      className={cn(
        'z-[1] flex grow flex-col gap-6 self-start rounded-lg bg-background-passive-primary p-6 lg:rounded-2xl lg:p-18',
        {
          'lg:-ml-9': isImageLeft,
          'lg:-mr-9': isImageRight,
          'my-18': !isImageShifted,
          'mt-18': isImageShifted,
        },
      )}
    >
      {TextContent}
    </div>
  )

  const MobileTextContainer = (
    <div
      className={cn(
        'z-[1] flex w-full grow flex-col gap-6 self-start rounded-lg bg-background-passive-primary p-6',
        // {
        //   '-mt-6': isImageLeft,
        //   '-mb-6': isImageRight,
        // },
      )}
    >
      {TextContent}
    </div>
  )

  const ImageContent = image?.data?.attributes ? (
    <StrapiImage
      image={image.data.attributes}
      fill
      sizes={generateImageSizes({ default: '100vw', lg: '50vw' })}
      className="object-cover"
    />
  ) : (
    <ImagePlaceholder />
  )

  const DesktopImageContainer = (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-2xl', {
        'lg:-mr-9': isImageLeft,
        'lg:-ml-9': isImageRight,
        'mb-18': isImageShifted,
      })}
    >
      {ImageContent}
    </div>
  )

  const MobileImageContainer = (
    <div
      className={cn('relative -mx-4 aspect-[320/246]', {
        '-mb-6': isImageLeft,
        '-mt-6': isImageRight,
      })}
    >
      {ImageContent}
    </div>
  )

  return (
    <div>
      <div className="hidden lg:grid lg:grid-cols-2">
        {isImageLeft ? (
          <>
            {DesktopImageContainer}
            {DesktopTextContainer}
          </>
        ) : (
          <>
            {DesktopTextContainer}
            {DesktopImageContainer}
          </>
        )}
      </div>
      <div className="flex flex-col justify-center lg:hidden">
        {isImageLeft ? (
          <>
            {MobileImageContainer}
            {MobileTextContainer}
          </>
        ) : (
          <>
            {MobileTextContainer}
            {MobileImageContainer}
          </>
        )}
      </div>
    </div>
  )
}

export default TextWithImageOverlappedSection

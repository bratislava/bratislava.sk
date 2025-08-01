import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import { ArrowRightIcon, ExportIcon } from '@/src/assets/icons'
import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage, { StrapiUploadImage } from '@/src/components/common/Image/StrapiImage'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type ListingCardProps = {
  title: string
  cardTitleLevel?: CardTitleLevel
  image?: StrapiUploadImage
  imageSizes?: string
  showImagePlaceholder?: boolean
  text?: string | null | undefined
  linkProps?: CommonLinkProps
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-734&m=dev
 * Loosely based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/cards/ListingCard.tsx
 */

const ListingCard = ({
  title,
  cardTitleLevel = 'h3',
  image,
  imageSizes,
  showImagePlaceholder = false,
  text,
  linkProps,
  className,
  ...rest
}: ListingCardProps) => {
  const titleId = useId()

  const shouldShowImage = image || showImagePlaceholder
  const imageToShow = image ? (
    <StrapiImage alt="" image={image} sizes={imageSizes} className="object-cover" fill />
  ) : (
    <ImagePlaceholder />
  )

  return (
    <CardBase
      variant="border"
      className={cn('h-full bg-background-passive-base', className)}
      {...rest}
    >
      {/* TODO create CardImage component, see OLO */}
      {shouldShowImage && (
        <div className="relative aspect-280/158 shrink-0 overflow-hidden">{imageToShow}</div>
      )}
      <div className="flex grow flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {/* TODO: title level based on section */}
            <Typography
              id={titleId}
              as={cardTitleLevel}
              variant="h5"
              className="group-hover:underline"
            >
              {title}
            </Typography>

            {text ? <Typography variant="p-small">{text}</Typography> : null}
          </div>
        </div>
        {linkProps ? (
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              variant="link"
              stretched
              {...linkProps}
              hasLinkIcon={false}
              aria-labelledby={titleId}
            />
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-passive-secondary p-1.5">
              {linkProps.href?.startsWith('http') ? <ExportIcon /> : <ArrowRightIcon />}
            </div>
          </div>
        ) : null}
      </div>
    </CardBase>
  )
}

export default ListingCard

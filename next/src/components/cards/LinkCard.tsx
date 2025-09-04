import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage, { StrapiUploadImage } from '@/src/components/common/Image/StrapiImage'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type LinkCardProps = {
  title: string
  cardTitleLevel?: CardTitleLevel
  image?: StrapiUploadImage | null | undefined
  imageSizes?: string
  text?: string | null | undefined
  linkProps?: CommonLinkProps
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-734&m=dev
 * Loosely based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/cards/LinkCard.tsx
 */

const LinkCard = ({
  title,
  cardTitleLevel = 'h3',
  image,
  imageSizes,
  text,
  linkProps,
  className,
  ...rest
}: LinkCardProps) => {
  const titleId = useId()

  const imageToShow = image ? (
    <StrapiImage alt="" image={image} sizes={imageSizes} className="object-cover" fill />
  ) : (
    <ImagePlaceholder />
  )

  const { children, ...restLinkProps } = linkProps || {}

  return (
    <CardBase
      variant="border"
      className={cn('h-full bg-background-passive-base', className)}
      {...rest}
    >
      {/* TODO create CardImage component, see OLO */}
      <div className="relative aspect-272/162 shrink-0 overflow-hidden lg:aspect-384/158">
        {imageToShow}
      </div>
      <div className="flex grow flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Typography
              id={titleId}
              as={cardTitleLevel}
              variant="h5"
              className={cn({ 'group-hover:underline': linkProps })}
            >
              {title}
            </Typography>

            {text ? <Typography variant="p-small">{text}</Typography> : null}
          </div>
        </div>
        {linkProps ? (
          <div className="flex justify-end">
            <Button
              variant="icon-wrapped"
              stretched
              {...restLinkProps}
              aria-labelledby={titleId}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-passive-secondary p-1.5"
            />
          </div>
        ) : null}
      </div>
    </CardBase>
  )
}

export default LinkCard

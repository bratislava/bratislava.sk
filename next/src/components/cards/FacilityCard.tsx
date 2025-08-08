import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import { ArrowRightIcon } from '@/src/assets/icons'
import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage, { StrapiUploadImage } from '@/src/components/common/Image/StrapiImage'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type Props = {
  title: string
  linkProps: CommonLinkProps
  cardTitleLevel?: CardTitleLevel
  image?: StrapiUploadImage | null | undefined
  imageSizes?: string
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15653&m=dev
 */

const FacilityCard = ({
  title,
  cardTitleLevel = 'h3',
  image,
  imageSizes,
  linkProps,
  className,
  ...rest
}: Props) => {
  const titleId = useId()

  return (
    <CardBase
      variant="border"
      className={cn('h-full rounded-lg bg-background-passive-base', className)}
      {...rest}
    >
      {/* TODO create CardImage component, see OLO */}
      <div className="relative aspect-384/272 shrink-0 overflow-hidden">
        {image ? (
          <StrapiImage alt="" image={image} sizes={imageSizes} className="object-cover" fill />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="flex h-full items-center justify-between gap-6 p-4 lg:p-6">
        <MLink href={linkProps.href} target={linkProps.target} stretched>
          <Typography
            id={titleId}
            as={cardTitleLevel}
            variant="h5"
            className={cn({ 'group-hover:underline': linkProps })}
          >
            {title}
          </Typography>
        </MLink>
        <ArrowRightIcon className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background-passive-primary p-2" />
      </div>
    </CardBase>
  )
}

export default FacilityCard

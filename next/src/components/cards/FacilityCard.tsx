import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import { ArrowRightIcon } from '@/src/assets/icons'
import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import CardImage from '@/src/components/common/Image/CardImage'
import { StrapiUploadImage } from '@/src/components/common/Image/StrapiImage'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type Props = {
  linkProps: CommonLinkProps
  cardTitleLevel?: CardTitleLevel
  image?: StrapiUploadImage | null | undefined
  imageClassName?: string
  imageSizes?: string
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15653&m=dev
 */

const FacilityCard = ({
  cardTitleLevel = 'h3',
  image,
  imageClassName,
  imageSizes,
  linkProps,
  className,
  ...rest
}: Props) => {
  const titleId = useId()

  const { children, ...restLinkProps } = linkProps

  return (
    <CardBase
      variant="border"
      className={cn('rounded-lg bg-background-passive-base', className)}
      {...rest}
    >
      <CardImage imgSrc={image?.url} className="aspect-592/272" sizes={imageSizes} />

      <div className="flex h-full items-center justify-between gap-6 p-4 lg:p-6">
        <MLink {...restLinkProps} stretched>
          <Typography
            id={titleId}
            as={cardTitleLevel}
            variant="h5"
            className="group-hover:underline"
          >
            {children}
          </Typography>
        </MLink>
        <ArrowRightIcon className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background-passive-primary p-2" />
      </div>
    </CardBase>
  )
}

export default FacilityCard

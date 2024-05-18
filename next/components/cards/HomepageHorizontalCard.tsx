import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import CardBase, { CardBaseProps } from '@/components/cards/CardBase'
import CardContent from '@/components/cards/CardContent'
import ImagePlaceholder from '@/components/common/Image/ImagePlaceholder'
import Button from '@/components/forms/simple-components/Button'
import { CommonLinkProps } from '@/utils/getCommonLinkProps'

type Props = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string
  imgSizes?: string
} & CardBaseProps

const HomepageHorizontalCard = ({
  imgSrc,
  imgSizes,
  title,
  linkProps,
  className,
  ...rest
}: Props) => {
  return (
    <CardBase className={twMerge('flex h-[196px] flex-row rounded-lg', className)} {...rest}>
      <div className="relative aspect-16/10 w-[240px] shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between lg:px-10 lg:py-8">
        <div className="flex flex-col">
          <Typography type="h3" size="h5" className="line-clamp-3 group-hover:underline">
            {title}
          </Typography>
        </div>
        <Button variant="black-link" stretched {...linkProps} className="mt-6" />
      </CardContent>
    </CardBase>
  )
}

export default HomepageHorizontalCard

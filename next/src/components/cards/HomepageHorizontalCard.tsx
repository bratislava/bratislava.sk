import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

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
  const titleId = useId()

  return (
    <CardBase className={cn('flex h-[196px] flex-row rounded-lg', className)} {...rest}>
      <div className="relative aspect-16/10 w-[240px] shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between lg:px-10 lg:py-8">
        <div className="flex flex-col">
          <Typography id={titleId} variant="h5" as="h3" className="line-clamp-3 group-hover:underline">
            {title}
          </Typography>
        </div>
        <Button
          variant="link"
          stretched
          {...linkProps}
          aria-labelledby={titleId}
          className="mt-6"
        />
      </CardContent>
    </CardBase>
  )
}

export default HomepageHorizontalCard

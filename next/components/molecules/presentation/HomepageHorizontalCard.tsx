import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Button from '@components/forms/simple-components/Button'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { CommonLinkProps } from '@utils/getCommonLinkProps'
import Image from 'next/image'
import React from 'react'

type Props = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string
  imgSizes?: string
} & CardBaseProps

const HomepageHorizontalCard = ({ imgSrc, imgSizes, title, linkProps, ...rest }: Props) => {
  return (
    <CardBase className="h-[196px] flex-row rounded-lg" {...rest}>
      <div className="relative aspect-16/10 w-[240px] shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between lg:px-10 lg:py-8">
        <div className="flex flex-col">
          <h3 className="text-h5 line-clamp-3 group-hover:underline">{title}</h3>
        </div>
        <Button variant="black-link" stretched {...linkProps} className="mt-6" />
      </CardContent>
    </CardBase>
  )
}

export default HomepageHorizontalCard

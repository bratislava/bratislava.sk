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
  date?: string
  text?: string
} & CardBaseProps

const BlogPostCard = ({ imgSrc, imgSizes, date, title, text, linkProps, ...rest }: Props) => {
  return (
    <CardBase className="h-full" {...rest}>
      <div className="relative aspect-[16_/_10] shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          {date && <div className="text-small pb-2 text-font">{date}</div>}
          <h3 className="text-h5 line-clamp-2 group-hover:underline">{title}</h3>
          {text && <div className="mt-1 line-clamp-4 text-font">{text}</div>}
        </div>
        <Button variant="black-link" stretched {...linkProps} className="mt-4 lg:mt-5" />
      </CardContent>
    </CardBase>
  )
}

export default BlogPostCard

import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import Image from 'next/image'
import React from 'react'

type Props = {
  title: string
  linkHref: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
} & CardBaseProps

const BlogPostHorizontalCard = ({
  imgSrc,
  imgSizes,
  title,
  linkHref,
  date,
  tag,
  ...rest
}: Props) => {
  return (
    <CardBase className="flex-row rounded-lg" {...rest}>
      <div className="relative h-full w-[240px] shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between">
        <div className="flex flex-col gap-2">
          {tag && <Tag text={tag} isColored />}
          <MLink href={linkHref} stretched>
            <h3 className="text-h5 line-clamp-3 group-hover:underline">{title}</h3>
          </MLink>
          {date && <div className="mt-1 text-font">{date}</div>}
        </div>
      </CardContent>
    </CardBase>
  )
}

export default BlogPostHorizontalCard

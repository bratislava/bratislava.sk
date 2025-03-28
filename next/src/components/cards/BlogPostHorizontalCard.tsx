import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import MLink from '@/src/components/common/MLink/MLink'
import Tag from '@/src/components/common/Tag/Tag'

type Props = {
  title: string
  linkHref: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
} & CardBaseProps

// TODO this component was created as a quickfix for Featured Blog Posts, it should be revisited or removed
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
            <Typography type="h3" size="h5" className="line-clamp-3 group-hover:underline">
              {title}
            </Typography>
          </MLink>
          {date && (
            <Typography type="p" className="mt-1">
              {date}
            </Typography>
          )}
        </div>
      </CardContent>
    </CardBase>
  )
}

export default BlogPostHorizontalCard

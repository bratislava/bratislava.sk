import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'

import ImagePlaceholder from '@/components/atoms/ImagePlaceholder'
import Button from '@/components/forms/simple-components/Button'
import Tag from '@/components/forms/simple-components/Tag'
import CardBase, { CardBaseProps } from '@/components/molecules/presentation/CardBase'
import CardContent from '@/components/molecules/presentation/CardContent'
import { CommonLinkProps } from '@/utils/getCommonLinkProps'

type Props = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
  text?: string
} & CardBaseProps

const BlogPostCard = ({ imgSrc, imgSizes, date, tag, title, text, linkProps, ...rest }: Props) => {
  return (
    <CardBase {...rest}>
      <div className="relative aspect-16/10 shrink-0">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent className="grow justify-between">
        <div className="flex flex-col">
          {(date || tag) && (
            <div className="flex items-center justify-between pb-2">
              {/* If no date, leaving empty div to push tag to the right */}
              <Typography type="p" size="p-small">
                {date}
              </Typography>

              {tag && <Tag text={tag} size="small" isColored />}
            </div>
          )}
          <Typography type="h3" size="h5" className="line-clamp-3 group-hover:underline">
            {title}
          </Typography>

          {text && (
            <Typography type="p" className="mt-1 line-clamp-4">
              {text}
            </Typography>
          )}
        </div>
        <Button variant="black-link" stretched {...linkProps} className="mt-4 lg:mt-5" />
      </CardContent>
    </CardBase>
  )
}

export default BlogPostCard

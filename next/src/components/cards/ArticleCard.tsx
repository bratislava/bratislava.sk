import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import Tag from '@/src/components/common/Tag/Tag'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type ArticleCardProps = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string | null | undefined
  imgSizes?: string
  date?: string | null | undefined
  tag?: string | null | undefined
  text?: string | null | undefined
} & CardBaseProps

const ArticleCard = ({
  imgSrc,
  imgSizes,
  date,
  tag,
  title,
  text,
  linkProps,
  ...rest
}: ArticleCardProps) => {
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
              <Typography variant="p-small">{date}</Typography>

              {tag && <Tag text={tag} size="small" isColored />}
            </div>
          )}
          <Typography as="h3" variant="h5" className="line-clamp-3 group-hover:underline">
            {title}
          </Typography>

          {text && (
            <Typography variant="p-default" className="mt-1 line-clamp-4">
              {text}
            </Typography>
          )}
        </div>
        <Button variant="link" stretched {...linkProps} className="mt-4 lg:mt-5" />
      </CardContent>
    </CardBase>
  )
}

export default ArticleCard

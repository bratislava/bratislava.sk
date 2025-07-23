import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import Tag from '@/src/components/common/Tag/Tag'
import cn from '@/src/utils/cn'
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

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=323-930&m=dev
 */

const ArticleCard = ({
  imgSrc,
  imgSizes,
  date,
  tag,
  title,
  text,
  linkProps,
  className,
  ...rest
}: ArticleCardProps) => {
  const titleId = useId()

  return (
    // TODO transparent background could be handled cleaner
    <CardBase variant="no-border" className={cn('gap-4 bg-transparent', className)} {...rest}>
      {/* TODO create CardImage component, see OLO */}
      <div className="relative aspect-16/10 shrink-0 overflow-hidden rounded-lg">
        {imgSrc ? (
          <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <CardContent variant="no-padding" className="grow justify-between">
        <div className="flex flex-col gap-2">
          {(date || tag) && (
            <div className="flex flex-wrap items-center justify-between">
              {/* If no date, leaving empty div to push tag to the right */}
              <Typography variant="p-small">{date}</Typography>

              {tag && <Tag text={tag} size="small" isColored />}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Typography
              id={titleId}
              as="h3"
              variant="h5"
              className="line-clamp-3 group-hover:underline"
            >
              {title}
            </Typography>

            {text ? (
              <Typography variant="p-small" className="mt-1 line-clamp-4">
                {text}
              </Typography>
            ) : null}
          </div>
        </div>
      </CardContent>

      <Button variant="link" stretched {...linkProps} aria-labelledby={titleId} />
    </CardBase>
  )
}

export default ArticleCard

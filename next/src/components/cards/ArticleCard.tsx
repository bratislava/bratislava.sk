import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import CardImage from '@/src/components/common/Image/CardImage'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type ArticleCardProps = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string | null | undefined
  imgSizes?: string
  date?: string | null | undefined
  text?: string | null | undefined
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=323-930&m=dev
 */

const ArticleCard = ({
  imgSrc,
  imgSizes,
  date,
  title,
  text,
  linkProps,
  className,
  ...rest
}: ArticleCardProps) => {
  const titleId = useId()

  return (
    <CardBase
      variant="no-border"
      className={cn(
        // TODO transparent background could be handled cleaner
        'gap-4 rounded-lg bg-transparent',
        className,
      )}
      {...rest}
    >
      <CardImage imgSrc={imgSrc} className="aspect-16/10 rounded-lg" />

      <CardContent variant="no-padding" className="grow justify-between">
        <div className="flex flex-col gap-2">
          {date && <Typography variant="p-small">{date}</Typography>}
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

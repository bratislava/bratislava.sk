import { Typography } from '@bratislava/component-library'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardImage from '@/src/components/common/Image/CardImage'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type ArticleRowCardProps = {
  title: string
  linkProps: CommonLinkProps
  imgSrc?: string | null | undefined
  imgSizes?: string
  metadata?: string[]
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-6345&t=U4e51CzBdWvas8QP-4
 */

const ArticleRowCard = ({
  title,
  linkProps,
  imgSrc,
  imgSizes,
  metadata,
  className,
  ...rest
}: ArticleRowCardProps) => {
  const titleId = useId()

  return (
    <CardBase
      variant="no-border"
      className={cn(
        // TODO transparent background could be handled cleaner
        'rounded-lg bg-transparent',
        className,
      )}
      {...rest}
    >
      {/* Screen: Desktop */}
      <div className="flex flex-row items-center gap-4 rounded-lg max-lg:hidden">
        <CardImage imgSrc={imgSrc} className="aspect-140/88 w-35 rounded-lg" />

        <div className="flex flex-col gap-2">
          {metadata?.length ? (
            <Typography variant="p-small">{metadata.join(' • ')}</Typography>
          ) : null}
          <MLink stretched {...linkProps}>
            <Typography
              id={titleId}
              as="h3"
              variant="h5"
              className="line-clamp-3 group-hover:underline"
            >
              {title}
            </Typography>
          </MLink>
        </div>
      </div>

      {/* Screen: Mobile */}
      <div className="flex flex-col items-start gap-4 lg:hidden">
        <div className="flex items-center gap-4">
          <CardImage imgSrc={imgSrc} className="aspect-102/64 w-25.5 rounded-lg" />
          {metadata?.length ? (
            <div>
              {metadata.map((metaDataItem, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Typography key={index} variant="p-small">
                  {metaDataItem}
                </Typography>
              ))}
            </div>
          ) : null}
        </div>

        <MLink stretched {...linkProps}>
          <Typography
            id={titleId}
            as="h3"
            variant="h5"
            className="line-clamp-3 group-hover:underline"
          >
            {title}
          </Typography>
        </MLink>
      </div>
    </CardBase>
  )
}

export default ArticleRowCard

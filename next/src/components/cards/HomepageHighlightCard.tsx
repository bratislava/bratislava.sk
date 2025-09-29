import { Typography } from '@bratislava/component-library'
import React from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import Button from '@/src/components/common/Button/Button'
import CardImage from '@/src/components/common/Image/CardImage'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

type Props = {
  linkProps: CommonLinkProps
  subtext?: string
  imgSrc?: string
  imgSizes?: string
} & CardBaseProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=6777-15629&m=dev
 */

const HomepageHighlightCard = ({
  linkProps,
  subtext,
  imgSrc,
  imgSizes,
  className,
  ...rest
}: Props) => {
  const { children: title, ...linkPropsRest } = linkProps

  return (
    <CardBase className={cn('flex flex-col rounded-lg lg:flex-row', className)} {...rest}>
      <CardImage imgSrc={imgSrc} sizes={imgSizes} className="aspect-16/10 lg:w-[240px]" />

      <CardContent className="grow gap-2 lg:px-10 lg:py-8">
        <Button
          variant="link"
          {...linkPropsRest}
          stretched
          fullWidth
          className="items-start justify-between [&>svg]:mt-0.5 lg:[&>svg]:-mr-2" // align link icon with first line and into right corner
          hasLinkIcon={linkPropsRest.target === '_blank'}
        >
          <Typography variant="h5" as="h3" className="line-clamp-3">
            {title}
          </Typography>
        </Button>
        {subtext ? <Typography variant="p-small">{subtext}</Typography> : null}
      </CardContent>
    </CardBase>
  )
}

export default HomepageHighlightCard

import { Typography } from '@bratislava/component-library'
import React, { HTMLAttributes } from 'react'

import CardBase from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import CardImage from '@/src/components/common/Image/CardImage'
import MLink from '@/src/components/common/MLink/MLink'
import FormatEventDateRange from '@/src/components/formatting/FormatEventDateRange'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type TootootEventCardProps = {
  title: string
  linkHref: string
  address?: string
  dateFrom: string
  dateTo: string | null
  isLongTerm?: boolean
  imageSrc: string
  imageSizes?: string
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=487-938&t=7RMKJATYwi0EYY9K-0
 */
const TootootEventCard = ({
  title,
  linkHref,
  address,
  dateFrom,
  dateTo,
  isLongTerm,
  imageSrc,
  imageSizes,
  className,
  ...rest
}: TootootEventCardProps) => {
  const { t } = useTranslation()

  return (
    <CardBase
      variant="no-border"
      className={cn('gap-4 rounded-lg bg-transparent', className)}
      {...rest}
    >
      <CardImage imgSrc={imageSrc} className="aspect-tootoot rounded-lg" sizes={imageSizes} />

      <CardContent variant="no-padding" className="grow gap-2">
        <Typography variant="h5" as="h3">
          <MLink
            stretched
            variant="underlineOnHover"
            {...getLinkProps({ label: title, url: linkHref })}
          />
        </Typography>
        <div className="flex flex-col">
          <Typography variant="p-small">
            {isLongTerm && `${t('common.from')} `}
            <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo ?? undefined} />
          </Typography>
          {address ? (
            <Typography variant="p-small" className="line-clamp-1">
              {address}
            </Typography>
          ) : null}
        </div>
      </CardContent>
    </CardBase>
  )
}

export default TootootEventCard

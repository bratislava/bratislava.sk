import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { HTMLAttributes } from 'react'

import CardBase from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import MLink from '@/src/components/common/MLink/MLink'
import FormatEventDateRange from '@/src/components/formatting/FormatEventDateRange'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

type EventCardProps = {
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
const EventCard = ({
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
}: EventCardProps) => {
  const { t } = useTranslation()

  return (
    <CardBase variant="no-border" className={cn('rounded-lg text-white', className)} {...rest}>
      <Image src={imageSrc} alt="" fill className="absolute object-cover" sizes={imageSizes} />
      <CardContent className="relative inline-flex size-full flex-col items-start justify-end bg-linear-to-b from-transparent to-[black] p-4 text-clip lg:p-5">
        <div className="flex w-full flex-col items-start gap-4 self-stretch">
          <Typography variant="h5" as="h3">
            <MLink href={linkHref} target="_blank" stretched variant="underlineOnHover">
              {title}
            </MLink>
          </Typography>

          <div className="flex flex-col items-start text-size-p-tiny font-medium">
            {/* FIXME Typography: Convert to use Typography. Issue: Different size and weight than typography have */}
            {address && <span className="line-clamp-1">{address}</span>}
            <span className="line-clamp-1">
              {isLongTerm && `${t('EventCard.from')} `}
              <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo ?? undefined} />
            </span>
          </div>
        </div>
      </CardContent>
    </CardBase>
  )
}

export default EventCard

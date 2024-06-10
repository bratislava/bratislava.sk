import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import CardBase from '@/components/cards/CardBase'
import CardContent from '@/components/cards/CardContent'
import MLink from '@/components/common/MLink/MLink'
import FormatEventDateRange from '@/components/formatting/FormatEventDateRange'
import { useTranslation } from '@/utils/useTranslation'

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
}

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
}: EventCardProps) => {
  const { t } = useTranslation()

  return (
    <CardBase variant="shadow" className={twMerge('rounded-lg text-white', className)}>
      <Image src={imageSrc} alt="" fill className="absolute object-cover" sizes={imageSizes} />
      <CardContent className="relative inline-flex h-full w-full flex-col items-start justify-end text-clip bg-gradient-to-b from-transparent to-[black] p-4 lg:p-5">
        <div className="flex w-full flex-col items-start gap-4 self-stretch">
          <Typography type="h3" size="h5">
            <MLink href={linkHref} target="_blank" stretched variant="underlineOnHover">
              {title}
            </MLink>
          </Typography>

          <div className="text-small flex flex-col items-start font-medium">
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

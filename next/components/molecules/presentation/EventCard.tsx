import FormatEventDateRange from '@components/atoms/FormatEventDateRange'
import MLink from '@components/forms/simple-components/MLink'
import CardBase from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type EventCardProps = {
  title: string
  linkHref: string
  address?: string
  dateFrom: string
  dateTo: string | null
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
  imageSrc,
  imageSizes,
  className,
}: EventCardProps) => {
  return (
    <CardBase
      variant="shadow"
      className={twMerge('h-[232px] rounded-lg text-white lg:h-[300px]', className)}
    >
      <Image src={imageSrc} alt="" fill className="absolute object-cover" sizes={imageSizes} />
      <CardContent className="relative inline-flex h-full w-full flex-col items-start justify-end text-clip bg-gradient-to-b from-transparent to-[black] p-4 lg:p-5">
        <div className="flex w-full flex-col items-start gap-4 self-stretch">
          <h3 className="text-h5 line-clamp-2">
            <MLink href={linkHref} target="_blank" stretched variant="underlineOnHover">
              {title}
            </MLink>
          </h3>
          <div className="text-small flex flex-col items-start font-medium">
            {address && <span className="line-clamp-1">{address}</span>}
            <span className="line-clamp-1">
              <FormatEventDateRange dateFrom={dateFrom} dateTo={dateTo ?? undefined} />
            </span>
          </div>
        </div>
      </CardContent>
    </CardBase>
  )
}

export default EventCard

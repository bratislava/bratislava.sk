import MLink from '@components/forms/simple-components/MLink'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type EventCardProps = {
  headline: string
  href: string | null
  address: string
  dateTime: string
  imageUrl: string
  imageSizes?: string
  className?: string
}

const EventCard = ({
  headline,
  href,
  address,
  dateTime,
  imageUrl,
  imageSizes,
  className,
}: EventCardProps) => {
  return (
    <div
      className={twMerge(
        'group relative h-[232px] overflow-hidden rounded-lg text-white lg:h-[300px]',
        className,
      )}
    >
      <Image src={imageUrl} alt="" fill className="absolute object-cover" sizes={imageSizes} />
      <div className="relative inline-flex h-full w-full flex-col items-start justify-end text-clip bg-gradient-to-b from-[rgba(0,0,0,0)] to-[black]">
        <div className="flex w-full flex-col items-start gap-4 self-stretch p-5">
          <MLink
            href={href ?? '#'}
            className="text-h5 line-clamp-2 group-hover:underline"
            stretched
          >
            {headline}
          </MLink>
          <div className="text-p3-medium flex flex-col items-start">
            <span className="line-clamp-1">{address}</span>
            <span className="line-clamp-1">{dateTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard

import { CommonLinkFragment } from '@backend/graphql'
import Breadcrumbs, { BreadcrumbsProps } from '@bratislava/ui-bratislava/Breadcrumbs/Breadcrumbs'
import { Waves } from '@bratislava/ui-bratislava/Waves/Waves'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import Image from 'next/image'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import Button from '../../forms/simple-components/Button'

type PageHeaderProps = {
  title?: string | null
  subtext?: string | null
  buttons?: CommonLinkFragment[] | null
  tag?: string | null
  className?: string | null
  imageSrc?: string | null
} & BreadcrumbsProps

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=888%3A3162&t=7uti0MQv3SyaK3Tk-4
 */
export const PageHeader = ({
  title,
  subtext,
  breadcrumbs,
  buttons,
  imageSrc,
  tag,
  className,
  children,
}: PropsWithChildren<PageHeaderProps>) => {
  return (
    <div className={twMerge('relative bg-category-200', className)}>
      {imageSrc && (
        <div className="absolute right-0 top-0 hidden h-full w-[350px] md:block lg:w-[750px]">
          <Image
            src={imageSrc}
            alt=""
            style={{
              WebkitMaskImage:
                '-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), color-stop(50%, rgba(0,0,0,1)), to(rgba(0,0,0,1)))',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 50%, rgba(0,0,0,1))',
            }}
            sizes={generateImageSizes({ default: '350px', lg: '750px' })}
            fill
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      )}
      <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
        <div className="flex flex-col">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className="mb-6 mt-3 flex flex-col gap-y-4 lg:mb-10 lg:mt-6 lg:gap-y-6">
            {tag && (
              <span className="text-default inline-block self-start rounded bg-category-700 px-3 py-1 font-medium text-white">
                {tag}
              </span>
            )}
            {(title || subtext) && (
              <div className="flex max-w-[800px] flex-col gap-y-1 lg:gap-y-4">
                {title && <h1 className="text-h1 ">{title}</h1>}
                {subtext && <p>{subtext}</p>}
              </div>
            )}
            {buttons && buttons.length > 0 && (
              <div className="flex max-w-[800px] flex-col gap-2 sm:flex-row lg:gap-3">
                {buttons.map((button, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    variant={index === 0 ? 'category' : 'category-outline'}
                    fullWidthMobile
                    {...getCommonLinkProps(button)}
                  />
                ))}
              </div>
            )}
            {children && <div className="empty:hidden">{children}</div>}
          </div>
        </div>
      </div>
      {/* Must be relative to cover up the image. */}
      <Waves wavePosition="top" waveColor="white" className="relative" />
    </div>
  )
}

export default PageHeader

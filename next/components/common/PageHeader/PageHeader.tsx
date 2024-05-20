import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import Image from 'next/image'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import Breadcrumbs, { BreadcrumbsProps } from '@/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/components/common/Button/Button'
import Waves from '@/components/common/Waves/Waves'
import { CommonLinkFragment } from '@/services/graphql'
import { generateImageSizes } from '@/utils/generateImageSizes'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'

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
const PageHeader = ({
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
    <div className={twMerge('relative overflow-x-clip bg-category-200', className)}>
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

          <div className="flex flex-col gap-y-4 pb-6 pt-3 lg:gap-y-6 lg:pb-10 lg:pt-6">
            {/* TODO this tag is not in DS */}
            {tag && (
              <span className="text-default inline-block self-start rounded bg-category-700 px-3 py-1 font-medium text-white">
                {tag}
              </span>
            )}

            {(title || subtext) && (
              <div className="flex max-w-[800px] flex-col gap-y-1 lg:gap-y-4">
                {title && (
                  <Typography type="h1" data-cy="page-heading">
                    {title}
                  </Typography>
                )}
                {subtext && (
                  <Typography type="p" size="p-large">
                    {subtext}
                  </Typography>
                )}
              </div>
            )}

            {buttons?.length ? (
              // wrapping to flex-row earlier (md) to prevent too wide buttons on tablet
              <div className="flex max-w-[800px] flex-col gap-2 md:flex-row lg:gap-3">
                {buttons.map((button, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    variant={index === 0 ? 'category-solid' : 'category-outline'}
                    fullWidthMobile
                    {...getCommonLinkProps(button)}
                  />
                ))}
              </div>
            ) : null}

            {children && <div className="empty:hidden">{children}</div>}
          </div>
        </div>
      </div>

      {imageSrc ? (
        <div className="relative aspect-2/1 md:hidden">
          <Image
            src={imageSrc}
            alt=""
            sizes={generateImageSizes({ default: '100%' })}
            fill
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ) : null}

      {/*
        Implemented by white "top" waves to cover up the image.
        On desktop, it must be positioned 'relative', to add space to the whole header and to cover the image positioned 'absolute' on the right.
        On mobile, if there is an image, it must be positioned 'absolute', to cover image positioned 'relative' below the Page header content,
        if there is no image, it must be positioned 'relative' (otherwise it'll cover up the header content padding).
          - Note: w-full fixes the overflow on mobile
        Overlap by 1px (-mb-px) to prevent a thin line between the waves and the main content.
      */}
      <Waves
        wavePosition="top"
        waveColor="white"
        className={cx('relative -mb-px', {
          'max-md:absolute max-md:bottom-0 max-md:w-full': !!imageSrc,
        })}
      />
    </div>
  )
}

export default PageHeader

import { Waves } from '@bratislava/ui-bratislava'
import Breadcrumbs, { BreadcrumbsProps } from '@bratislava/ui-bratislava/Breadcrumbs/Breadcrumbs'
import { isDefined } from '@utils/isDefined'
import Image from 'next/image'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import Button from '../../forms/simple-components/Button'

type PageHeaderButton = {
  title: string
  path: string | null
}

type PageHeaderProps = {
  title?: string | null
  subtitle?: string | null
  primaryButton?: PageHeaderButton | null
  secondaryButton?: PageHeaderButton | null
  tag?: string | null
  className?: string | null
  imageSrc?: string | null
} & BreadcrumbsProps

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=888%3A3162&t=7uti0MQv3SyaK3Tk-4
 */
const PageHeader = ({
  title,
  subtitle,
  breadcrumbs,
  primaryButton,
  secondaryButton,
  imageSrc,
  tag,
  className,
  children,
}: PropsWithChildren<PageHeaderProps>) => {
  return (
    <div className={twMerge('bg-category-200 relative', className)}>
      {imageSrc && (
        <div className="absolute top-0 right-0 w-[350px] lg:w-[750px] h-full hidden md:block">
          <Image
            src={imageSrc}
            alt=""
            style={{
              WebkitMaskImage:
                '-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), color-stop(50%, rgba(0,0,0,1)), to(rgba(0,0,0,1)))',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 50%, rgba(0,0,0,1))',
            }}
            sizes="100vw"
            fill
            className="object-cover w-full h-full pointer-events-none"
          />
        </div>
      )}
      <div className="px-8">
        <div className="flex flex-col max-w-screen-lg mx-auto relative">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <div className="gap-y-4 lg:gap-y-6 flex flex-col mt-3 lg:mt-6 mb-6 lg:mb-10">
            {tag && (
              <span className="text-p2-medium inline-block rounded bg-category-700 px-3 py-1 text-white self-start">
                {tag}
              </span>
            )}
            {(title || subtitle) && (
              <div className="gap-y-1 lg:gap-y-4 flex flex-col max-w-[800px]">
                {title && <h1 className="text-h1">{title}</h1>}
                {subtitle && <p>{subtitle}</p>}
              </div>
            )}
            {(primaryButton || secondaryButton) && (
              <div className="gap-2 lg:gap-3 flex sm:flex-row flex-col max-w-[800px]">
                {[primaryButton, secondaryButton].filter(isDefined).map((button, index) => (
                  <Button
                    key={index}
                    href={button.path ?? '#'}
                    label={button.title}
                    variant={button === primaryButton ? 'category' : 'category-outline'}
                    size="sm"
                    className="sm:w-fit w-full"
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

import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

import Breadcrumbs, { BreadcrumbsProps } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/src/components/common/Button/Button'
import Waves from '@/src/components/common/Waves/Waves'
import { CommonLinkFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

export type PageHeaderProps = {
  title?: string | null
  subtext?: string | null
  headerLinks?: CommonLinkFragment[] | null
  // TODO remove the string[] type in Articles redesign cleanup
  tag?: string[] | string | null
  className?: string | null
  imageSrc?: string | null
  hasWaves?: boolean
} & BreadcrumbsProps

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=888%3A3162&t=7uti0MQv3SyaK3Tk-4
 */
const PageHeader = ({
  title,
  subtext,
  breadcrumbs,
  headerLinks,
  imageSrc,
  tag,
  className,
  hasWaves = true,
  children,
}: PropsWithChildren<PageHeaderProps>) => {
  return (
    <div className={cn('relative overflow-x-clip bg-category-200', className)}>
      {imageSrc && (
        <div className="absolute top-0 right-0 hidden h-full w-[350px] md:block lg:w-[500px] xl:w-[750px]">
          <Image
            src={imageSrc}
            alt=""
            style={{
              WebkitMaskImage:
                '-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0)), color-stop(50%, rgba(0,0,0,1)), to(rgba(0,0,0,1)))',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 50%, rgba(0,0,0,1))',
            }}
            sizes={generateImageSizes({ default: '350px', lg: '500px', xl: '750px' })}
            fill
            className="pointer-events-none size-full object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
        <div className="flex flex-col">
          <Breadcrumbs breadcrumbs={breadcrumbs} />

          <div className="flex flex-col gap-y-4 pt-3 pb-6 lg:gap-y-6 lg:pt-6 lg:pb-10">
            {/* TODO this tag is not in DS */}
            {tag ? (
              // TODO remove array handling after Articles redesign cleanup
              Array.isArray(tag) && tag.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tag.map((tagItem, index) => (
                    <div key={index}>
                      <span className="inline-block self-start rounded-sm bg-white px-3 py-1 text-size-p-default font-medium text-content-passive-primary">
                        {tagItem}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="inline-block self-start rounded-sm bg-category-700 px-3 py-1 text-size-p-default font-medium text-white">
                  {tag}
                </span>
              )
            ) : null}

            {(title || subtext) && (
              <div className="flex max-w-[640px] flex-col gap-y-1 lg:gap-y-4">
                {title && (
                  <Typography variant="h1" data-cy="page-heading">
                    {title}
                  </Typography>
                )}
                {subtext && <Typography variant="p-large">{subtext}</Typography>}
              </div>
            )}

            {headerLinks?.length ? (
              // wrapping to flex-row earlier (md) to prevent too wide buttons on tablet
              <div className="flex max-w-[640px] flex-col gap-2 md:flex-row lg:gap-3">
                {headerLinks.map((button, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? 'solid' : 'outline'}
                    fullWidthMobile
                    {...getLinkProps(button)}
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
            className="pointer-events-none size-full object-cover"
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
      {hasWaves ? (
        <Waves
          wavePosition="top"
          waveColor="white"
          className={cn('relative -mb-px', {
            'max-md:absolute max-md:bottom-0 max-md:w-full': !!imageSrc,
          })}
        />
      ) : null}
    </div>
  )
}

export default PageHeader

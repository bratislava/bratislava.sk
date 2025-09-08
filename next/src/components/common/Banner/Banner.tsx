import { Typography } from '@bratislava/component-library'
import Image from 'next/image'

import Button from '@/src/components/common/Button/Button'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import {
  CommonLinkFragment,
  Enum_Componentblocksstarzlandingpagebanner_Variant,
  Enum_Componentsectionsbanner_Variant,
} from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

type BannerProps = {
  title: string
  content?: string | null
  contentPosition?: 'left' | 'right'
  variant: Enum_Componentsectionsbanner_Variant | Enum_Componentblocksstarzlandingpagebanner_Variant
  imagePath?: string
  primaryLink?: CommonLinkFragment | null
  secondaryLink?: CommonLinkFragment | null
  tertiaryLink?: CommonLinkFragment | null
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17306-19086&m=dev
 */

const Banner = ({
  title,
  content,
  contentPosition = 'left',
  variant,
  imagePath = '',
  primaryLink,
  secondaryLink,
  tertiaryLink,
  className,
}: BannerProps) => {
  return (
    <div
      className={cn(
        // overflow-hidden ensures image not to overlap with rounded corners
        'flex h-full w-full flex-col-reverse overflow-hidden rounded-lg lg:flex-row-reverse @page-wide:rounded-xl',
        {
          'bg-category-200 text-grey-700': variant === 'color',
          'bg-grey-800 text-white': variant === 'dark',
          'border bg-white text-grey-700': variant === 'white_condensed',
          'flex-col lg:flex-row': contentPosition === 'left',
        },
        className,
      )}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col gap-4 p-4 lg:w-1/2 lg:gap-6 @min-page-wide:p-12',
        )}
      >
        <div className="flex flex-col items-start gap-3">
          <Typography as="h2" variant={variant === 'white_condensed' ? 'h4' : 'h2'}>
            {title}
          </Typography>

          {content && <Markdown content={content} />}
        </div>
        <div className="flex flex-col flex-wrap gap-2 empty:hidden lg:flex-row lg:items-center lg:gap-4">
          {/* TODO styling of white buttons */}
          {primaryLink && <Button variant="solid" fullWidthMobile {...getLinkProps(primaryLink)} />}
          {secondaryLink && (
            <Button
              className={cn({
                'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
              })}
              variant="outline"
              fullWidthMobile
              {...getLinkProps(secondaryLink)}
            />
          )}
          {tertiaryLink && (
            <Button
              className={cn('font-semibold no-underline', {
                'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
              })}
              variant="link"
              {...getLinkProps(tertiaryLink)}
            />
          )}
        </div>
      </div>
      <div
        className={`relative flex w-full lg:h-auto lg:w-1/2 ${
          variant === 'white_condensed' ? 'h-[180px]' : 'h-[234px]'
        }`}
      >
        <Image
          src={imagePath}
          className="object-cover object-left"
          alt=""
          fill
          sizes={generateImageSizes({ default: '100vw', lg: '50vw' })}
        />
      </div>
    </div>
  )
}

export default Banner

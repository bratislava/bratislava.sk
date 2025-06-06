import { Typography } from '@bratislava/component-library'
import Image from 'next/image'

import Button from '@/src/components/common/Button/Button'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { CommonLinkFragment, Enum_Componentsectionsbanner_Variant } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

type BannerProps = {
  title: string
  content?: string | null
  contentPosition?: 'left' | 'right'
  variant: Enum_Componentsectionsbanner_Variant
  imagePath?: string
  primaryLink?: CommonLinkFragment | null
  secondaryLink?: CommonLinkFragment | null
  tertiaryLink?: CommonLinkFragment | null
}

const Banner = ({
  title,
  content,
  contentPosition = 'left',
  variant,
  imagePath = '',
  primaryLink,
  secondaryLink,
  tertiaryLink,
}: BannerProps) => {
  return (
    <div
      // overflow-hidden ensures image not to overlap with rounded corners
      className={cn('flex h-full w-full overflow-hidden', {
        'rounded-xl bg-category-200 text-grey-700': variant === 'color',
        'rounded-xl bg-grey-800 text-white': variant === 'dark',
        'rounded-lg border-2 bg-white text-grey-700': variant === 'white_condensed',
        'flex-col lg:flex-row': contentPosition === 'left',
        'flex-col-reverse lg:flex-row-reverse': contentPosition === 'right',
      })}
    >
      <div
        className={cn('flex h-full w-full flex-col gap-4 px-4 py-6 lg:w-1/2 lg:gap-6', {
          'lg:p-12': variant === 'white_condensed',
          'lg:p-18': variant !== 'white_condensed',
        })}
      >
        <div className="flex flex-col items-start gap-3">
          <Typography as="h2" variant={variant === 'white_condensed' ? 'h4' : 'h2'}>
            {title}
          </Typography>

          {content && <Markdown content={content} />}
        </div>
        <div className="flex flex-col items-center gap-2 empty:hidden lg:flex-row lg:gap-4">
          {/* TODO styling of white buttons */}
          {/* TODO use only one responsive Button  */}
          {primaryLink && <Button variant="solid" fullWidthMobile {...getLinkProps(primaryLink)} />}
          {secondaryLink && (
            <Button
              className={cn('hidden lg:flex', {
                'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
              })}
              variant="outline"
              fullWidthMobile
              {...getLinkProps(secondaryLink)}
            />
          )}
          {tertiaryLink && (
            <Button
              className={cn('hidden font-semibold no-underline not-first:ml-2 lg:flex', {
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

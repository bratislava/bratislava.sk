import {
  CommonLinkFragment,
  Enum_Componentsectionsbanner_Variant,
} from '@bratislava/strapi-sdk-homepage'
import Markdown from '@components/atoms/Markdown'
import Button from '@components/forms/simple-components/Button'
import { generateImageSizes } from '@utils/generateImageSizes'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import cx from 'classnames'
import Image from 'next/image'

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
      className={cx('flex h-full w-full overflow-hidden', {
        'rounded-xl bg-category-200 text-gray-700': variant === 'color',
        'rounded-xl bg-gray-800 text-white': variant === 'dark',
        'rounded-lg border-2 bg-white text-gray-700': variant === 'white_condensed',
        'flex-col lg:flex-row': contentPosition === 'left',
        'flex-col-reverse lg:flex-row-reverse': contentPosition === 'right',
      })}
    >
      <div
        className={cx('flex h-full w-full flex-col gap-4 py-6 px-4 lg:w-1/2 lg:gap-6', {
          'lg:p-12': variant === 'white_condensed',
          'lg:p-18': variant !== 'white_condensed',
        })}
      >
        <div className="flex flex-col items-start gap-3">
          <h2 className={`${variant === 'white_condensed' ? 'text-h4' : 'text-h2'}`}>{title}</h2>
          {content && <Markdown content={content} />}
        </div>
        <div className="flex flex-col items-center gap-2 empty:hidden lg:flex-row lg:gap-4">
          {/* TODO styling of white buttons */}
          {/* TODO use only one responsive Button  */}
          {primaryLink && (
            <>
              <Button
                className="hidden lg:flex"
                variant="category"
                {...getCommonLinkProps(primaryLink)}
              />
              <Button
                className="flex lg:hidden"
                size="sm"
                fullWidth
                variant="category"
                {...getCommonLinkProps(primaryLink)}
              />
            </>
          )}
          {secondaryLink && (
            <>
              <Button
                className={cx('hidden lg:flex', {
                  'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
                })}
                variant="category-outline"
                {...getCommonLinkProps(secondaryLink)}
              />
              <Button
                className={cx('flex lg:hidden', {
                  'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
                })}
                size="sm"
                fullWidth
                variant="category-outline"
                {...getCommonLinkProps(secondaryLink)}
              />
            </>
          )}
          {tertiaryLink && (
            <>
              <Button
                className={cx('hidden font-semibold no-underline not-first:ml-2 lg:flex', {
                  'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
                })}
                variant="link-category"
                {...getCommonLinkProps(tertiaryLink)}
              />
              <Button
                className={cx('mt-2 font-semibold no-underline lg:hidden', {
                  'text-white hover:text-white/80 focus:text-white/80': variant === 'dark',
                })}
                size="sm"
                variant="link-category"
                {...getCommonLinkProps(tertiaryLink)}
              />
            </>
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

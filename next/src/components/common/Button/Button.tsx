/* eslint-disable sonarjs/no-duplicate-string */
import NextLink from 'next/link'
import { ComponentProps, forwardRef, PropsWithChildren, ReactNode, RefObject } from 'react'
import { AriaButtonProps } from 'react-aria'
import { Button as RACButton, ButtonProps as RACButtonProps } from 'react-aria-components'

import { ArrowRightIcon, ExportIcon } from '@/src/assets/ui-icons'
import MLink, { LinkPlausibleProps } from '@/src/components/common/MLink/MLink'
import Spinner from '@/src/components/common/Spinner/Spinner'
import cn from '@/src/utils/cn'

type ButtonOrIconButton =
  | {
      icon: ReactNode
      'aria-label': string
      startIcon?: never
      endIcon?: never
      children?: never
    }
  | ({
      icon?: never
      startIcon?: ReactNode
      endIcon?: ReactNode
    } & PropsWithChildren)

type ButtonBase = {
  variant?:
    | 'unstyled'
    | 'icon-wrapped'
    | 'icon-wrapped-negative-margin'
    | 'category-solid'
    | 'category-outline'
    | 'category-plain'
    | 'black-solid'
    | 'black-outline'
    | 'black-plain'
    | 'negative-solid'
    | 'negative-plain'
    | 'black-link'
    | 'category-link'
  size?: 'responsive' | 'large' | 'small'
  className?: string
  fullWidth?: boolean
  fullWidthMobile?: boolean
  isLoading?: boolean
  loadingText?: string
} & ButtonOrIconButton

export type ButtonProps = Omit<RACButtonProps, 'className' | 'style'> &
  ButtonBase & {
    href?: never
    target?: never
    hasLinkIcon?: never
    plausibleProps?: never
  }

export type AnchorProps = Omit<AriaButtonProps<'a'>, 'children'> &
  ButtonBase &
  Pick<ComponentProps<typeof NextLink>, 'target' | 'replace' | 'prefetch'> & {
    stretched?: boolean
    hasLinkIcon?: boolean
    plausibleProps?: LinkPlausibleProps
  }

export type PolymorphicProps = ButtonProps | AnchorProps

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      children,
      className,
      isDisabled,
      variant = 'unstyled',
      size = 'responsive',
      icon,
      startIcon,
      endIcon,
      hasLinkIcon = true,
      fullWidth,
      fullWidthMobile,
      isLoading,
      loadingText,
      ...rest
    },
    ref,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ) => {
    const isLoadingOrDisabled = isLoading || isDisabled

    const isSolidVariant = variant.endsWith('-solid')
    const isOutlineVariant = variant.endsWith('-outline')
    const isSolidOrOutlineVariant = isSolidVariant || isOutlineVariant
    const isPlainVariant = variant.endsWith('-plain')
    const isLinkVariant = variant.endsWith('-link')
    const isIconWrappedVariant =
      variant === 'icon-wrapped' || variant === 'icon-wrapped-negative-margin'
    const isIconButton = Boolean(icon)

    /* TODO
     *   - examine why `text-button` interferes with `text-[color]` and therefore is sometimes ignored
     *   - border should render inside button, not outside
     *   - focus text color for 'culture' and 'social' category should be -800
     */
    const styles =
      variant === 'unstyled'
        ? className ?? ''
        : cn(
            // TODO text-button interferes with text-[color], as quickfix we set size and color here by arbitrary values
            'inline-flex h-auto items-center justify-center gap-2 text-[1rem] font-semibold leading-[1.5rem] transition',
            'outline-none ring-offset-2 focus-visible:ring',

            // we change rounded corners for link focus ring
            { 'rounded-sm max-lg:gap-1': isLinkVariant, 'rounded-lg': !isLinkVariant },

            {
              // NOTE: there are some style overrides for link variants below in "cn"

              'font-medium underline underline-offset-2': isLinkVariant,

              // disabled or loading
              'opacity-50': isLoadingOrDisabled,

              // https://github.com/tailwindlabs/tailwindcss/issues/1041#issuecomment-957425345
              'after:absolute after:inset-0': 'stretched' in rest && rest.stretched,

              // width or fullwidth
              'w-full': fullWidth,
              'w-full md:w-fit': fullWidthMobile,
              'w-fit': !fullWidth && !fullWidthMobile,

              // border width
              'border-2': isSolidOrOutlineVariant,

              // padding - link variants
              'p-0': isLinkVariant,

              // padding - icon-wrapped variant
              'p-2 outline-offset-0': isIconButton && isIconWrappedVariant,
              '-m-2': isIconButton && variant === 'icon-wrapped-negative-margin',

              // padding - filled and outlined variants
              'px-4 py-2 lg:py-3':
                size === 'responsive' && !isIconButton && isSolidOrOutlineVariant,
              'px-4 py-2': size === 'small' && !isIconButton && isSolidOrOutlineVariant,
              'px-4 py-3': size === 'large' && !isIconButton && isSolidOrOutlineVariant,

              // padding - filled and outlined variants with "icon"
              'p-2.5 lg:p-3': size === 'responsive' && isIconButton && isSolidOrOutlineVariant,
              'p-2.5': size === 'small' && isIconButton && isSolidOrOutlineVariant,
              'p-3': size === 'large' && isIconButton && isSolidOrOutlineVariant,

              // padding - plain variants
              'px-2 py-1 lg:px-3 lg:py-2': size === 'responsive' && !isIconButton && isPlainVariant,
              'px-2 py-1': size === 'small' && !isIconButton && isPlainVariant,
              'px-3 py-2': size === 'large' && !isIconButton && isPlainVariant,

              // padding - plain variants with "icon"
              'p-1.5 lg:p-2': size === 'responsive' && isIconButton && isPlainVariant,
              'p-1.5': size === 'small' && isIconButton && isPlainVariant,
              'p-2': size === 'large' && isIconButton && isPlainVariant,

              // colors - bg, border, text - idle & focus
              'border-category-700 bg-category-700 text-font-contrast pressed:border-category-800 pressed:bg-category-800':
                variant === 'category-solid',

              'border-category-700 bg-transparent text-grey-700 pressed:border-category-800 pressed:text-grey-800':
                variant === 'category-outline',
              'border-grey-700 bg-grey-700 text-white pressed:border-grey-800 pressed:bg-grey-800':
                variant === 'black-solid',
              'border-grey-200 bg-transparent text-grey-700 pressed:border-grey-300 pressed:text-grey-800':
                variant === 'black-outline',
              'border-negative-700 bg-negative-700 text-white pressed:border-negative-800 pressed:bg-negative-800':
                variant === 'negative-solid',

              'text-category-700 pressed:bg-category-200 pressed:text-category-800':
                variant === 'category-plain',
              'text-grey-700 pressed:bg-grey-200 pressed:text-grey-800': variant === 'black-plain',
              'text-negative-700 pressed:bg-negative-200 pressed:text-negative-800':
                variant === 'negative-plain',

              'text-category-700 pressed:text-category-800': variant === 'category-link',
              'text-grey-700 pressed:text-grey-800': variant === 'black-link',

              // colors:hover - bg, border, text
              'hover:border-category-600 hover:bg-category-600': variant === 'category-solid',
              'hover:text-grey-600 hover:border-category-600': variant === 'category-outline',
              'hover:bg-category-100 hover:text-category-600': variant === 'category-plain',

              'hover:border-grey-600 hover:bg-grey-600': variant === 'black-solid',
              'hover:border-grey-200 hover:text-grey-600': variant === 'black-outline',
              'hover:bg-grey-100 hover:text-grey-600': variant === 'black-plain',

              'hover:border-negative-600 hover:bg-negative-600': variant === 'negative-solid',
              'hover:bg-negative-100 hover:text-negative-600': variant === 'negative-plain',

              'hover:text-category-600': variant === 'category-link',
              'hover:text-grey-600': variant === 'black-link',

              // svg icons
              '[&>svg]:h-5 [&>svg]:w-5 [&>svg]:lg:h-6 [&>svg]:lg:w-6': size === 'responsive',
              '[&>svg]:h-5 [&>svg]:w-5': size === 'small',
              '[&>svg]:h-6 [&>svg]:w-6': size === 'large',
            },
            className,
          )

    if (rest.href) {
      const isExternal = rest.href.startsWith('http')
      const linkIcon = hasLinkIcon ? (
        isExternal ? (
          <ExportIcon className="shrink-0" />
        ) : (
          <ArrowRightIcon className="shrink-0" />
        )
      ) : null

      return (
        <MLink
          href={rest.href}
          ref={ref as RefObject<HTMLAnchorElement>}
          className={styles}
          plausibleProps={rest.plausibleProps}
          {...rest}
        >
          {startIcon}
          {icon ?? children}
          {linkIcon ?? endIcon}
        </MLink>
      )
    }

    return (
      <RACButton
        ref={ref as RefObject<HTMLButtonElement>}
        isDisabled={isLoadingOrDisabled}
        className={styles}
        {...rest}
      >
        {!isLoading && startIcon}
        {isLoading ? (
          <>
            {loadingText}
            <Spinner size="sm" />
          </>
        ) : (
          icon ?? children
        )}
        {!isLoading && endIcon}
      </RACButton>
    )
  },
)

export default Button

import NextLink from 'next/link'
import { ComponentProps, forwardRef, PropsWithChildren, ReactNode, RefObject } from 'react'
import { AriaButtonProps } from 'react-aria'
import { Button as RACButton, ButtonProps as RACButtonProps } from 'react-aria-components'
import { ArrowDownIcon, ArrowRightIcon, ExportIcon } from 'src/assets/icons'

import MLink, { LinkAnalyticsProps } from '@/src/components/common/MLink/MLink'
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
  // When adding a new variant, include it also in is...Variant booleans below
  variant?:
    | 'unstyled'
    | 'icon-wrapped'
    | 'icon-wrapped-negative-margin'
    | 'solid'
    | 'solid-inverted'
    | 'outline'
    | 'plain'
    | 'negative-solid'
    | 'negative-plain'
    | 'link'
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
    analyticsProps?: never
  }

export type AnchorProps = Omit<AriaButtonProps<'a'>, 'children'> &
  ButtonBase &
  Pick<ComponentProps<typeof NextLink>, 'target' | 'replace' | 'prefetch'> & {
    stretched?: boolean
    hasLinkIcon?: boolean
    analyticsProps?: LinkAnalyticsProps
  }

export type PolymorphicProps = ButtonProps | AnchorProps

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-52741&m=dev
 */

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

    const isSolidVariant =
      variant === 'solid' || variant === 'negative-solid' || variant === 'solid-inverted'
    const isOutlineVariant = variant === 'outline'
    const isSolidOrOutlineVariant = isSolidVariant || isOutlineVariant
    const isPlainVariant = variant === 'plain' || variant === 'negative-plain'
    const isIconWrappedVariant =
      variant === 'icon-wrapped' || variant === 'icon-wrapped-negative-margin'
    const isIconButton = Boolean(icon)

    /* TODO
     *   - border should render inside button, not outside
     *   - focus text color for 'culture' and 'social' category should be -800
     */
    const styles =
      variant === 'unstyled'
        ? (className ?? '')
        : cn(
            'inline-flex h-auto items-center justify-center gap-2 text-size-button-large leading-6 font-semibold transition',
            'ring-offset-2 outline-hidden focus-visible:ring-3',

            // we change rounded corners for link focus ring
            { 'rounded-xs max-lg:gap-1': variant === 'link', 'rounded-lg': variant !== 'link' },

            {
              'font-medium underline underline-offset-2': variant === 'link',

              // disabled or loading
              'opacity-50': isLoadingOrDisabled,

              // https://github.com/tailwindlabs/tailwindcss/issues/1041#issuecomment-957425345
              'after:absolute after:inset-0': 'stretched' in rest && rest.stretched,

              // width or fullwidth
              'w-full': fullWidth,
              'w-full md:w-fit': fullWidthMobile,
              'w-fit': !fullWidth && !fullWidthMobile,

              // border width
              border: isSolidOrOutlineVariant,

              // padding - link variants
              'p-0': variant === 'link',

              // padding - icon-wrapped variant
              'p-2 outline-offset-0': isIconButton && isIconWrappedVariant,
              '-m-2': isIconButton && variant === 'icon-wrapped-negative-margin',

              // padding - solid and outlined variants
              'px-4 py-2 lg:py-3':
                size === 'responsive' && !isIconButton && isSolidOrOutlineVariant,
              'px-4 py-2': size === 'small' && !isIconButton && isSolidOrOutlineVariant,
              'px-4 py-3': size === 'large' && !isIconButton && isSolidOrOutlineVariant,

              // padding - solid and outlined variants with "icon"
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

              // colors - bg, border, content - variant solid (figma: boxed primary)
              'border-action-border-default bg-action-background-default text-white':
                variant === 'solid',
              'active:border-action-border-pressed active:bg-action-background-pressed':
                variant === 'solid',
              'hover:border-action-border-hover hover:bg-action-background-hover':
                variant === 'solid',

              // colors - bg, border, content - variant solid (figma: boxed primary inverted)
              'border-background-active-primary-inverted-default bg-background-active-primary-inverted-default text-content-active-primary-default':
                variant === 'solid-inverted',
              'active:border-background-active-primary-inverted-pressed active:bg-background-active-primary-inverted-pressed':
                variant === 'solid-inverted',
              'hover:border-background-active-primary-inverted-hover hover:bg-background-active-primary-inverted-hover':
                variant === 'solid-inverted',

              // colors - bg, border, content - variant outline (figma: boxed secondary)
              'border-action-border-default bg-transparent text-action-content-default':
                variant === 'outline',
              'active:border-action-border-pressed active:text-action-content-pressed':
                variant === 'outline',
              'hover:border-action-border-hover hover:text-action-content-hover':
                variant === 'outline',

              // colors - bg, border, content - variant plain (figma: plain default)
              'text-action-content-default': variant === 'plain',
              'active:bg-action-soft-background-pressed active:text-action-content-pressed':
                variant === 'plain',
              'hover:bg-action-soft-background-hover hover:text-action-content-hover':
                variant === 'plain',

              // colors - bg, border, content - variant negative-solid
              'hover:border-negative-600 hover:bg-negative-600': variant === 'negative-solid',
              'border-negative-700 bg-negative-700 text-white active:border-negative-800 active:bg-negative-800':
                variant === 'negative-solid',

              // colors - bg, border, content - variant negative-plain
              'hover:bg-negative-100 hover:text-negative-600': variant === 'negative-plain',
              'text-negative-700 active:bg-negative-200 active:text-negative-800':
                variant === 'negative-plain',

              // colors - bg, border, content - variant link
              'hover:text-action-content-hover': variant === 'link',
              'text-action-content-default active:text-action-content-pressed': variant === 'link',

              // svg icons
              '[&>svg]:h-5 [&>svg]:w-5 [&>svg]:lg:h-6 [&>svg]:lg:w-6': size === 'responsive',
              '[&>svg]:h-5 [&>svg]:w-5': size === 'small',
              '[&>svg]:h-6 [&>svg]:w-6': size === 'large',
            },
            className,
          )

    if (rest.href) {
      const isExternal = rest.href.startsWith('http')
      const isAnchor = rest.href.startsWith('#')
      const linkIcon = hasLinkIcon ? (
        isExternal ? (
          <ExportIcon className="shrink-0" />
        ) : isAnchor ? (
          <ArrowDownIcon className="shrink-0" />
        ) : (
          <ArrowRightIcon className="shrink-0" />
        )
      ) : null

      return (
        <MLink
          href={rest.href}
          target={isExternal ? '_blank' : '_self'}
          ref={ref as RefObject<HTMLAnchorElement>}
          className={styles}
          analyticsProps={rest.analyticsProps}
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
          (icon ?? children)
        )}
        {!isLoading && endIcon}
      </RACButton>
    )
  },
)

export default Button

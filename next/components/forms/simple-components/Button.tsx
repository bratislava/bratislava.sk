/* eslint-disable sonarjs/no-duplicate-string */
import { ArrowRightIcon, ExportIcon } from '@assets/ui-icons'
import { LinkButtonProps } from '@react-types/button'
import cx from 'classnames'
import Spinner from 'components/forms/simple-components/Spinner'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, PropsWithChildren, ReactNode, RefObject } from 'react'
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from 'react-aria'
import { twMerge } from 'tailwind-merge'

import MLink, { LinkPlausibleProps } from './MLink'

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
  isLoadingText?: string
} & ButtonOrIconButton

export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps | 'children'> &
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
      hasLinkIcon,
      fullWidth,
      fullWidthMobile,
      isLoading,
      isLoadingText,
      ...rest
    },
    ref,
  ) => {
    const isLoadingOrDisabled = isLoading || isDisabled

    const { buttonProps, isPressed } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: isLoadingOrDisabled,
      },
      rest.href ? (ref as RefObject<HTMLAnchorElement>) : (ref as RefObject<HTMLButtonElement>),
    )
    const { focusProps, isFocused, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({ isDisabled: isLoadingOrDisabled })

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
        ? className
        : twMerge(
            // TODO text-button interferes with text-[color], as quickfix we set size and color here by arbitrary values
            'inline-flex h-auto items-center justify-center gap-2 text-[1rem] font-semibold leading-[1.5rem] transition',
            cx(
              // we use isFocusVisible to show focus ring only on keyboard navigation
              isFocused ? 'outline-2 outline-offset-4' : 'outline-none',
              // we change rounded corners for link focus ring
              isLinkVariant ? 'rounded-sm max-lg:gap-1' : 'rounded-lg',

              {
                // NOTE: there are some style overrides for link variants below in "twMerge"

                'font-medium underline': isLinkVariant,

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
                'px-2 py-1 lg:px-3 lg:py-2':
                  size === 'responsive' && !isIconButton && isPlainVariant,
                'px-2 py-1': size === 'small' && !isIconButton && isPlainVariant,
                'px-3 py-2': size === 'large' && !isIconButton && isPlainVariant,

                // padding - plain variants with "icon"
                'p-1.5 lg:p-2': size === 'responsive' && isIconButton && isPlainVariant,
                'p-1.5': size === 'small' && isIconButton && isPlainVariant,
                'p-2': size === 'large' && isIconButton && isPlainVariant,

                // colors - bg, border, text - idle & focus
                'border-category-700 bg-category-700 text-font-contrast':
                  variant === 'category-solid',
                'border-category-800 bg-category-800': variant === 'category-solid' && isPressed,

                'border-category-700 bg-transparent text-gray-700 data-pressed:border-category-800 data-pressed:text-gray-800':
                  variant === 'category-outline',
                'border-gray-700 bg-gray-700 text-white data-pressed:border-gray-800 data-pressed:bg-gray-800':
                  variant === 'black-solid',
                'border-gray-200 bg-transparent text-gray-700 data-pressed:border-gray-300 data-pressed:text-gray-800':
                  variant === 'black-outline',
                'border-negative-700 bg-negative-700 text-white data-pressed:border-negative-800 data-pressed:bg-negative-800':
                  variant === 'negative-solid',

                'text-category-700 data-pressed:bg-category-200 data-pressed:text-category-800':
                  variant === 'category-plain',
                'text-gray-700 data-pressed:bg-gray-200 data-pressed:text-gray-800':
                  variant === 'black-plain',
                'text-negative-700 data-pressed:bg-negative-200 data-pressed:text-negative-800':
                  variant === 'negative-plain',

                'text-category-700 data-pressed:text-category-800': variant === 'category-link',
                'text-gray-700 data-pressed:text-gray-800': variant === 'black-link',

                // colors:hover - bg, border, text
                // using custom `data-hovered:` because `hover:` is not working with `disabled` state
                'data-hovered:border-category-600 data-hovered:bg-category-600':
                  variant === 'category-solid',
                'text-gray-600 data-hovered:border-category-600': variant === 'category-outline',
                'data-hovered:bg-category-100 data-hovered:text-category-600':
                  variant === 'category-plain',

                'data-hovered:border-gray-600 data-hovered:bg-gray-600': variant === 'black-solid',
                'data-hovered:border-gray-200 data-hovered:text-gray-600':
                  variant === 'black-outline',
                'data-hovered:bg-gray-100 data-hovered:text-gray-600': variant === 'black-plain',

                'data-hovered:border-negative-600 data-hovered:bg-negative-600':
                  variant === 'negative-solid',
                'data-hovered:bg-negative-100 data-hovered:text-negative-600':
                  variant === 'negative-plain',

                'data-hovered:text-category-600': variant === 'category-link',
                'data-hovered:text-gray-600': variant === 'black-link',

                // svg icons
                '[&>svg]:h-5 [&>svg]:w-5 [&>svg]:lg:h-6 [&>svg]:lg:w-6': size === 'responsive',
                '[&>svg]:h-5 [&>svg]:w-5': size === 'small',
                '[&>svg]:h-6 [&>svg]:w-6': size === 'large',
              },
            ),
            className,
          )

    if (rest.href) {
      const isExternal = rest.href.startsWith('http')
      const linkIcon = hasLinkIcon ? isExternal ? <ExportIcon /> : <ArrowRightIcon /> : null

      return (
        <MLink
          href={rest.href}
          ref={ref as RefObject<HTMLAnchorElement>}
          // following conventions from react-aria-components, slightly changed for easier styling of hovered state
          data-pressed={isPressed || undefined}
          data-hovered={(isHovered && !isPressed) || (isFocusVisible && !isPressed) || undefined}
          data-focused={isFocused || undefined}
          data-focus-visible={isFocusVisible || undefined}
          className={styles}
          plausibleProps={rest.plausibleProps}
          {...mergeProps(
            { ...buttonProps, role: undefined, target: isExternal ? '_blank' : undefined },
            focusProps,
            hoverProps,
          )}
          {...rest}
        >
          {startIcon}
          {icon ?? children}
          {linkIcon ?? endIcon}
        </MLink>
      )
    }

    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        // following conventions from react-aria-components, slightly changed for easier styling of hovered state
        data-pressed={isPressed || undefined}
        data-hovered={(isHovered && !isPressed) || (isFocusVisible && !isPressed) || undefined}
        data-focused={isFocused || undefined}
        data-focus-visible={isFocusVisible || undefined}
        className={styles}
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        {...rest}
      >
        {!isLoading && startIcon}
        {isLoading ? (
          <>
            {isLoadingText}
            <Spinner size="sm" />
          </>
        ) : (
          icon ?? children
        )}
        {!isLoading && endIcon}
      </button>
    )
  },
)

export default Button

/* eslint-disable sonarjs/no-duplicate-string */
import { ArrowRightIcon, ExportIcon } from '@assets/ui-icons'
import cx from 'classnames'
import Spinner from 'components/forms/simple-components/Spinner'
import NextLink from 'next/link'
import { ComponentProps, forwardRef, PropsWithChildren, ReactNode, useEffect, useRef } from 'react'
import { AriaButtonProps } from 'react-aria'
import { Button as RACButton, ButtonProps as RACButtonProps } from 'react-aria-components'
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
        : twMerge(
            // TODO text-button interferes with text-[color], as quickfix we set size and color here by arbitrary values
            'inline-flex h-auto items-center justify-center gap-2 text-[1rem] font-semibold leading-[1.5rem] transition',
            cx(
              // we use isFocusVisible to show focus ring only on keyboard navigation
              // it's recommended to remove default outline and use custom styling as ring: https://tailwindcss.com/docs/outline-style#removing-outlines
              'outline-none ring-offset-2 focus-visible:ring',
              // we change rounded corners for link focus ring
              isLinkVariant ? 'rounded-sm max-lg:gap-1' : 'rounded-lg',

              {
                // NOTE: there are some style overrides for link variants below in "twMerge"

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
                'px-2 py-1 lg:px-3 lg:py-2':
                  size === 'responsive' && !isIconButton && isPlainVariant,
                'px-2 py-1': size === 'small' && !isIconButton && isPlainVariant,
                'px-3 py-2': size === 'large' && !isIconButton && isPlainVariant,

                // padding - plain variants with "icon"
                'p-1.5 lg:p-2': size === 'responsive' && isIconButton && isPlainVariant,
                'p-1.5': size === 'small' && isIconButton && isPlainVariant,
                'p-2': size === 'large' && isIconButton && isPlainVariant,

                // colors - bg, border, text - idle & focus
                'border-category-700 bg-category-700 text-font-contrast pressed:border-category-800 pressed:bg-category-800':
                  variant === 'category-solid',

                'border-category-700 bg-transparent text-gray-700 pressed:border-category-800 pressed:text-gray-800':
                  variant === 'category-outline',
                'border-gray-700 bg-gray-700 text-white pressed:border-gray-800 pressed:bg-gray-800':
                  variant === 'black-solid',
                'border-gray-200 bg-transparent text-gray-700 pressed:border-gray-300 pressed:text-gray-800':
                  variant === 'black-outline',
                'border-negative-700 bg-negative-700 text-white pressed:border-negative-800 pressed:bg-negative-800':
                  variant === 'negative-solid',

                'text-category-700 pressed:bg-category-200 pressed:text-category-800':
                  variant === 'category-plain',
                'text-gray-700 pressed:bg-gray-200 pressed:text-gray-800':
                  variant === 'black-plain',
                'text-negative-700 pressed:bg-negative-200 pressed:text-negative-800':
                  variant === 'negative-plain',

                'text-category-700 pressed:text-category-800': variant === 'category-link',
                'text-gray-700 pressed:text-gray-800': variant === 'black-link',

                // colors:hover - bg, border, text
                'hover:border-category-600 hover:bg-category-600': variant === 'category-solid',
                'hover:text-gray-600 hover:border-category-600': variant === 'category-outline',
                'hover:bg-category-100 hover:text-category-600': variant === 'category-plain',

                'hover:border-gray-600 hover:bg-gray-600': variant === 'black-solid',
                'hover:border-gray-200 hover:text-gray-600': variant === 'black-outline',
                'hover:bg-gray-100 hover:text-gray-600': variant === 'black-plain',

                'hover:border-negative-600 hover:bg-negative-600': variant === 'negative-solid',
                'hover:bg-negative-100 hover:text-negative-600': variant === 'negative-plain',

                'hover:text-category-600': variant === 'category-link',
                'hover:text-gray-600': variant === 'black-link',

                // svg icons
                '[&>svg]:h-5 [&>svg]:w-5 [&>svg]:lg:h-6 [&>svg]:lg:w-6': size === 'responsive',
                '[&>svg]:h-5 [&>svg]:w-5': size === 'small',
                '[&>svg]:h-6 [&>svg]:w-6': size === 'large',
              },
            ),
            className,
          )
    // To pass ref and also add event listener you need forwardRef https://stackoverflow.com/a/62238917,
    // this is the only way got it to work
    const myRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
    // eslint-disable-next-line consistent-return
    useEffect(() => {
      const node = myRef.current

      if (node) {
        // to forbid event propagation on mobile devices when using onPress this is suggested workaround
        // https://github.com/adobe/react-spectrum/issues/1513#issuecomment-1172267250
        node.addEventListener('touchend', (e) => {
          e.preventDefault()
        })
        return () => {
          node.addEventListener('touchend', (e) => e.preventDefault())
        }
      }
    }, [ref])

    if (rest.href) {
      const isExternal = rest.href.startsWith('http')
      const linkIcon = hasLinkIcon ? isExternal ? <ExportIcon /> : <ArrowRightIcon /> : null

      return (
        <MLink
          href={rest.href}
          ref={(node) => {
            myRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
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
        ref={(node) => {
          myRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
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

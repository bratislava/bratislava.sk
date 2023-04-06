/* eslint-disable sonarjs/no-duplicate-string */
import { ArrowRightIcon } from '@assets/images'
import { LinkButtonProps } from '@react-types/button'
import cx from 'classnames'
import { forwardRef, ReactNode, RefObject } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import { twMerge } from 'tailwind-merge'

import MLink, { LinkPlausibleProps } from './MLink'

type ButtonBase = {
  variant?:
    | 'unstyled'
    | 'category'
    | 'category-outline'
    | 'category-plain'
    | 'black'
    | 'black-outline'
    | 'black-plain'
    | 'negative'
    | 'negative-plain'
    | 'black-link'
    | 'category-link'
  size?: 'responsive' | 'lg' | 'sm'
  className?: string
  icon?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  fullWidth?: boolean
  fullWidthMobile?: boolean
}

export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps | 'isDisabled'> &
  ButtonBase & {
    href?: undefined
    target?: undefined
    disabled?: boolean
    plausibleProps?: undefined
  }
export type AnchorProps = Omit<AriaButtonProps<'a'>, 'isDisabled'> &
  ButtonBase & {
    href: string
    target?: '_blank' | '_self' | '_parent' | '_top'
    disabled?: undefined
    plausibleProps?: LinkPlausibleProps
  }

export type PolymorphicProps = ButtonProps | AnchorProps

type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      children,
      className,
      disabled,
      variant = 'unstyled',
      size = 'responsive',
      icon,
      startIcon,
      endIcon,
      fullWidth,
      fullWidthMobile,
      ...rest
    },
    ref,
  ) => {
    const { buttonProps } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: disabled,
      },
      ref as RefObject<HTMLAnchorElement | HTMLButtonElement>,
    )

    const isPlainVariant = variant.endsWith('-plain')
    const isLinkVariant = variant.endsWith('-link')
    const isIconButton = Boolean(icon)

    /* TODO
     *   - border should render inside button, not outside
     *   - focus text color for 'culture' and 'social' category should be -800
     */
    const styles = twMerge(
      'inline-flex items-center font-semibold text-btn rounded-lg outline-offset-4 h-auto',
      cx({
        // NOTE: there are some style overrides for link variants below in "twMerge"

        'w-full': fullWidth,
        'w-full md:w-fit': fullWidthMobile,
        'w-fit': !fullWidth && !fullWidthMobile,

        // padding - filled and outlined variants
        'px-4 py-2 lg:py-3': size === 'responsive' && !isIconButton && !isPlainVariant,
        'px-4 py-2': size === 'sm' && !isIconButton && !isPlainVariant,
        'px-4 py-3': size === 'lg' && !isIconButton && !isPlainVariant,

        // padding - filled and outlined variants with "icon"
        'p-2.5 lg:p-3': size === 'responsive' && isIconButton && !isPlainVariant,
        'p-2.5': size === 'sm' && isIconButton && !isPlainVariant,
        'p-3': size === 'lg' && isIconButton && !isPlainVariant,

        // padding - plain variants
        'px-2 py-1 lg:px-3 lg:py-2': size === 'responsive' && !isIconButton && isPlainVariant,
        'px-2 py-1': size === 'sm' && !isIconButton && isPlainVariant,
        'px-3 py-2': size === 'lg' && !isIconButton && isPlainVariant,

        // padding - plain variants with "icon"
        'p-1.5 lg:p-2': size === 'responsive' && isIconButton && isPlainVariant,
        'p-1.5': size === 'sm' && isIconButton && isPlainVariant,
        'p-2': size === 'lg' && isIconButton && isPlainVariant,

        // padding for link variants are set in the "twMerge" below

        'border-2':
          variant === 'black' ||
          variant === 'black-outline' ||
          variant === 'negative' ||
          variant === 'category' ||
          variant === 'category-outline',

        // bg, border, text - idle & focus
        'border-category-700 bg-category-700 text-font-contrast focus:bg-category-800 focus:border-category-800':
          variant === 'category',
        'border-category-700 bg-transparent text-gray-700 focus:border-category-800 focus:text-gray-800':
          variant === 'category-outline',
        'border-gray-700 bg-gray-700 focus:bg-gray-800 text-white focus:border-gray-800':
          variant === 'black',
        'border-gray-200 bg-transparent text-gray-700 focus:border-gray-300 focus:text-gray-800':
          variant === 'black-outline',
        'border-negative-700 bg-negative-700 text-white focus:bg-negative-800 focus:border-negative-800':
          variant === 'negative',

        'text-category-700 focus:bg-category-200 focus:text-category-800':
          variant === 'category-plain',
        'text-gray-700 focus:bg-gray-200 focus:text-gray-800': variant === 'black-plain',
        'text-negative-700 focus:bg-negative-200 focus:text-negative-800':
          variant === 'negative-plain',

        'text-category-700 focus:text-category-800': variant === 'category-link',
        'text-gray-700 focus:text-gray-800': variant === 'black-link',

        // bg, border, text - hover
        'hover:bg-category-600 hover:border-category-600': variant === 'category' && !disabled,
        'hover:border-category-600 hover:text-gray-600':
          variant === 'category-outline' && !disabled,
        'hover:bg-category-100 hover:text-category-600': variant === 'category-plain' && !disabled,

        'hover:bg-gray-600 hover:border-gray-600': variant === 'black' && !disabled,
        'hover:border-gray-200 hover:text-gray-600': variant === 'black-outline' && !disabled,
        'hover:bg-gray-100 hover:text-gray-600': variant === 'black-plain' && !disabled,

        'hover:bg-negative-600 hover:border-negative-600': variant === 'negative' && !disabled,
        'hover:bg-negative-100 hover:text-negative-600': variant === 'negative-plain' && !disabled,

        'hover:text-category-600': variant === 'category-link' && !disabled,
        'hover:text-gray-600': variant === 'black-link' && !disabled,

        underline: isLinkVariant,

        // disabled
        'opacity-50': disabled,
      }),
      // OVERRIDES for link variant, rounded-sm applies for outline
      isLinkVariant ? 'p-0 lg:p-0 rounded-sm' : '',
      className,
    )

    const startIconStyles = cx('flex items-center justify-center', {
      'h-5 w-5 lg:h-6 lg:w-6': size === 'responsive',
      'h-5 w-5': size === 'sm',
      'h-6 w-6': size === 'lg',
      'mr-2.5 lg:mr-3': !isLinkVariant && size === 'responsive',
      'mr-2.5': !isLinkVariant && size === 'sm',
      'mr-3': !isLinkVariant && size === 'lg',
      'mr-1 lg:mr-2': isLinkVariant && size === 'responsive',
      'mr-1': isLinkVariant && size === 'sm',
      'mr-2': isLinkVariant && size === 'lg',
    })

    const endIconStyles = cx('flex items-center justify-center', {
      'h-5 w-5 lg:h-6 lg:w-6': size === 'responsive',
      'h-5 w-5': size === 'sm',
      'h-6 w-6': size === 'lg',
      'ml-2.5 lg:ml-3': !isLinkVariant && size === 'responsive',
      'ml-2.5': !isLinkVariant && size === 'sm',
      'ml-3': !isLinkVariant && size === 'lg',
      'ml-1 lg:ml-2': isLinkVariant && size === 'responsive',
      'ml-1': isLinkVariant && size === 'sm',
      'ml-2': isLinkVariant && size === 'lg',
    })

    const iconStyles = cx('flex items-center justify-center', {
      'h-5 w-5 lg:h-6 lg:w-6': size === 'responsive',
      'h-5 w-5': size === 'sm',
      'h-6 w-6': size === 'lg',
    })

    const ButtonChildren = () => {
      return (
        <>
          {startIcon ? <span className={startIconStyles}>{startIcon}</span> : null}
          {icon ? <span className={iconStyles}>{icon}</span> : children}
          {endIcon || isLinkVariant ? (
            <span className={endIconStyles}>{endIcon ?? <ArrowRightIcon />}</span>
          ) : null}
        </>
      )
    }

    if (rest.href) {
      const buttonPropsFixed = { ...buttonProps, role: undefined }

      return (
        <MLink
          href={rest.href}
          ref={ref as RefObject<HTMLAnchorElement>}
          className={styles}
          plausibleProps={rest.plausibleProps}
          {...buttonPropsFixed}
        >
          <ButtonChildren />
        </MLink>
      )
    }

    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        className={twMerge(styles, 'flex items-center justify-center')}
        {...buttonProps}
      >
        <ButtonChildren />
      </button>
    )
  },
) as PolymorphicButton

export default Button

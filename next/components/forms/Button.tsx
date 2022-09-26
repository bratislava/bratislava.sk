import { AriaButtonProps, useButton } from 'react-aria'
import { LinkButtonProps } from '@react-types/button'
import React, { forwardRef, ReactNode, RefObject } from 'react'
import cx from 'classnames'

import SearchIcon from '../../assets/images/arrow-right.svg'
import MLink from './MLink'

type ButtonBase = {
  variant?:
    | 'brand'
    | 'black'
    | 'negative'
    | 'brand-outline'
    | 'black-outline'
    | 'plain-brand'
    | 'plain-black'
    | 'plain-negative'
    | 'link-brand'
    | 'link-black'
  size?: 'lg' | 'sm'
  className?: string
  disabled?: boolean
  icon?: ReactNode
  text?: string
}

const LINK_ICON_LG = '16'
const LINK_ICON_SM = '13.3'

export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps> &
  ButtonBase & {
    href?: undefined
    label?: string
  }
export type AnchorProps = AriaButtonProps<'a'> &
  ButtonBase & {
    href: string
    label: string
  }

export type PolymorphicProps = ButtonProps | AnchorProps

type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  ({ className, disabled = false, variant = 'brand', size = 'lg', icon, text, ...rest }, ref) => {
    const { buttonProps } = useButton(
      {
        ...rest,
        elementType: rest.href ? 'a' : 'button',
        isDisabled: disabled,
      },
      ref as RefObject<HTMLAnchorElement | HTMLButtonElement>
    )

    const style = cx(
      rest.href
        ? 'font-medium underline underline-offset-4 inline-flex items-center focus-visible: outline-none'
        : 'space-x-2 text-white font-semibold inline-flex items-center justify-center text-center align-middle focus:outline-none rounded-lg',
      className,
      {
        'px-6 py-4 text-default':
          size === 'lg' &&
          !icon &&
          text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline'),
        'px-5 py-3 text-sm':
          size === 'sm' &&
          !icon &&
          text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline'),
        'px-5 py-5':
          size === 'lg' &&
          icon &&
          !text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline' ||
            variant === 'plain-brand' ||
            variant === 'plain-black'),
        'px-4 py-4':
          size === 'sm' &&
          icon &&
          !text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline' ||
            variant === 'plain-brand' ||
            variant === 'plain-black'),

        'text-default': size === 'lg' && (variant === 'link-brand' || variant === 'link-black'),
        'text-sm': size === 'sm' && (variant === 'link-brand' || variant === 'link-black'),

        'px-3 py-2 text-default':
          size === 'lg' && (variant === 'plain-brand' || variant === 'plain-black' || variant === 'plain-negative'),
        'px-2 py-1 text-sm':
          size === 'sm' && (variant === 'plain-brand' || variant === 'plain-black' || variant === 'plain-negative'),
        // bg and border color
        'bg-form-brand-default focus:bg-form-brand-pressed': variant === 'brand',
        'border-2 border-form-brand-default bg-transparent text-form-brand-default focus:border-form-brand-pressed focus:text-form-brand-pressed':
          variant === 'brand-outline',
        'bg-form-black-default focus:bg-form-black-pressed': variant === 'black',
        'border-2 border-form-black-default bg-transparent text-form-black-default focus:border-form-black-pressed focus:text-form-black-pressed':
          variant === 'black-outline',
        'bg-form-negative-default focus:bg-form-negative-pressed': variant === 'negative',

        'text-form-brand-default focus:bg-form-plain-brand-pressed focus:text-form-brand-pressed':
          variant === 'plain-brand',
        'text-form-black-default focus:bg-form-plain-black-pressed focus:text-form-black-pressed':
          variant === 'plain-black',
        'text-form-negative-default focus:bg-form-plain-negative-pressed focus:text-form-negative-pressed':
          variant === 'plain-negative',

        'text-form-brand-default focus:text-form-brand-pressed': variant === 'link-brand',
        'text-form-black-default focus:text-form-black-pressed': variant === 'link-black',

        // hover
        'hover:bg-form-brand-hover': variant === 'brand' && !disabled,
        'hover:border-form-brand-hover hover:text-form-brand-hover': variant === 'brand-outline' && !disabled,
        'hover:bg-form-black-hover': variant === 'black' && !disabled,
        'hover:border-form-black-hover hover:text-form-black-hover': variant === 'black-outline' && !disabled,
        'hover:bg-form-negative-hover': variant === 'negative' && !disabled,

        'hover:bg-form-plain-brand-hover hover:text-form-brand-hover': variant === 'plain-brand' && !disabled,
        'hover:bg-form-plain-black-hover hover:text-form-black-hover': variant === 'plain-black' && !disabled,
        'hover:bg-form-plain-negative-hover hover:text-form-negative-hover': variant === 'plain-negative' && !disabled,

        'hover:text-form-brand-hover': variant === 'link-brand' && !disabled,
        'hover:text-form-black-hover': variant === 'link-black' && !disabled,

        // disabled
        'opacity-50': disabled,
      }
    )

    if (rest.href) {
      const buttonPropsFixed = { ...buttonProps, role: undefined }
      return (
        <MLink
          href={rest.href}
          label={rest.label}
          ref={ref as RefObject<HTMLAnchorElement>}
          className={style}
          {...buttonPropsFixed}
        >
          <i className={size === 'sm' ? 'ml-2' : 'ml-3'}>
            <SearchIcon
              width={size === 'sm' ? LINK_ICON_SM : LINK_ICON_LG}
              height={size === 'sm' ? LINK_ICON_SM : LINK_ICON_LG}
            />
          </i>
        </MLink>
      )
    }

    return (
      <button type="button" ref={ref as RefObject<HTMLButtonElement>} className={style} {...buttonProps}>
        {text && !icon && text}
        {!text && icon && <i className={`${size === 'lg' && 'w-5 h-5'} ${size === 'sm' && 'w-4 h-4'}`}>{icon}</i>}
      </button>
    )
  }
) as PolymorphicButton

export default Button

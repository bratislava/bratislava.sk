import { LinkButtonProps } from '@react-types/button'
import cx from 'classnames'
import React, { forwardRef, ReactNode, RefObject } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

import ArrowRightIcon from '../../assets/images/forms/arrow-right.svg'
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
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export type ButtonProps = Omit<AriaButtonProps<'button'>, keyof LinkButtonProps> &
  ButtonBase & {
    href?: undefined
    label?: string
  }
export type AnchorProps = AriaButtonProps<'a'> &
  ButtonBase & {
    href: string
    label: string
    disabled?: false
  }

export type PolymorphicProps = ButtonProps | AnchorProps

type PolymorphicButton = {
  (props: AnchorProps): JSX.Element
  (props: ButtonProps): JSX.Element
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
  (
    {
      className,
      disabled = false,
      variant = 'brand',
      size = 'lg',
      icon,
      text,
      startIcon,
      endIcon,
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

    const style = cx(
      'inline-flex items-center',
      rest.href
        ? 'font-medium underline underline-offset-4 focus-visible:outline-none'
        : 'w-fit h-fit space-x-2 text-white font-semibold justify-center text-center align-middle focus:outline-none rounded-lg',
      className,
      {
        // text for lg button
        'px-6 py-3.5 text-button-1 leading-6':
          size === 'lg' &&
          !icon &&
          text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline'),
        // text for sm button
        'px-5 py-3 text-button-base leading-5':
          size === 'sm' &&
          !icon &&
          text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline'),
        // icon for lg button
        'px-3.5 py-3.5':
          size === 'lg' &&
          icon &&
          !text &&
          (variant === 'brand' ||
            variant === 'black' ||
            variant === 'negative' ||
            variant === 'brand-outline' ||
            variant === 'black-outline'),
        // icon for sm button
        'px-2 py-2':
          (size === 'sm' &&
            icon &&
            !text &&
            (variant === 'brand' ||
              variant === 'black' ||
              variant === 'negative' ||
              variant === 'brand-outline' ||
              variant === 'black-outline')) ||
          (size === 'lg' &&
            icon &&
            !text &&
            (variant === 'plain-brand' || variant === 'plain-black')),
        // icon for sm button
        'px-1.5 py-1.5':
          size === 'sm' &&
          icon &&
          !text &&
          (variant === 'plain-brand' || variant === 'plain-black'),

        // text for lg button
        'px-3 py-2 text-button-1 leading-6':
          size === 'lg' &&
          !icon &&
          text &&
          (variant === 'plain-brand' || variant === 'plain-black' || variant === 'plain-negative'),
        // text for sm button
        'px-2 py-1 text-button-base leading-6':
          size === 'sm' &&
          !icon &&
          text &&
          (variant === 'plain-brand' || variant === 'plain-black' || variant === 'plain-negative'),

        // text for lg link button
        'text-button-1 leading-8':
          size === 'lg' && (variant === 'link-brand' || variant === 'link-black'),
        // text for sm link button
        'text-button-base leading-6':
          size === 'sm' && (variant === 'link-brand' || variant === 'link-black'),

        'border-2':
          variant === 'brand' ||
          variant === 'black' ||
          variant === 'negative' ||
          variant === 'brand-outline' ||
          variant === 'black-outline',
        // bg and border color
        'border-main-700 bg-main-700 focus:bg-main-800 focus:border-main-800': variant === 'brand',
        'border-main-700 bg-transparent text-main-700 focus:border-main-800 focus:text-main-800':
          variant === 'brand-outline',
        'border-gray-700 bg-gray-700 focus:bg-gray-800 focus:border-gray-800': variant === 'black',
        'border-gray-200 bg-transparent text-gray-700 focus:border-gray-300 focus:text-gray-800':
          variant === 'black-outline',
        'border-negative-700 bg-negative-700 focus:bg-negative-800 focus:border-negative-800':
          variant === 'negative',

        'text-main-700 focus:bg-main-200 focus:text-main-800': variant === 'plain-brand',
        'text-gray-700 focus:bg-gray-200 focus:text-gray-800': variant === 'plain-black',
        'text-negative-700 focus:bg-negative-200 focus:text-negative-800':
          variant === 'plain-negative',

        'text-main-700 focus:text-main-800': variant === 'link-brand',
        'text-gray-700 focus:text-gray-800': variant === 'link-black',

        // hover
        'hover:bg-main-600 hover:border-main-600': variant === 'brand' && !disabled,
        'hover:border-main-600 hover:text-main-600': variant === 'brand-outline' && !disabled,
        'hover:bg-gray-600 hover:border-gray-600': variant === 'black' && !disabled,
        'hover:border-gray-200 hover:text-gray-600': variant === 'black-outline' && !disabled,
        'hover:bg-negative-600 hover:border-negative-600': variant === 'negative' && !disabled,

        'hover:bg-main-100 hover:text-main-600': variant === 'plain-brand' && !disabled,
        'hover:bg-gray-100 hover:text-gray-600': variant === 'plain-black' && !disabled,
        'hover:bg-negative-100 hover:text-negative-600': variant === 'plain-negative' && !disabled,

        'hover:text-main-600': variant === 'link-brand' && !disabled,
        'hover:text-gray-600': variant === 'link-black' && !disabled,

        // disabled
        'opacity-50': disabled,
      },
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
          <i
            className={`flex justify-center items-center ${size === 'lg' ? 'ml-3 h-6 w-6' : ''} ${
              size === 'sm' ? 'w-5 h-5 ml-2.5' : ''
            }`}
          >
            <ArrowRightIcon />
          </i>
        </MLink>
      )
    }

    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        className={style}
        {...buttonProps}
      >
        <div className="flex items-center">
          {startIcon && (
            <i
              className={`${size === 'lg' ? 'mr-3 h-6 w-6' : ''} ${
                size === 'sm' ? 'mr-2.5 h-5 w-5' : ''
              }`}
            >
              {startIcon}
            </i>
          )}
          {text && !icon && text}
          {!text && icon && (
            <i className={`${size === 'lg' ? 'h-6 w-6' : ''} ${size === 'sm' ? 'h-5 w-5' : ''}`}>
              {icon}
            </i>
          )}
          {endIcon && (
            <i
              className={`flex justify-center items-center ${size === 'lg' ? 'ml-3 h-6 w-6' : ''} ${
                size === 'sm' ? 'w-5 h-5 ml-2.5' : ''
              }`}
            >
              {endIcon}
            </i>
          )}
        </div>
      </button>
    )
  },
) as PolymorphicButton

export default Button

/* eslint-disable sonarjs/no-duplicate-string */
import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import { LinkButtonProps } from '@react-types/button'
import cx from 'classnames'
import { forwardRef, ReactNode, RefObject } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import { twMerge } from 'tailwind-merge'

import MLink from './MLink'

type ButtonBase = {
  variant?:
    | 'black'
    | 'negative'
    | 'black-outline'
    | 'plain-black'
    | 'plain-negative'
    | 'link-black'
    | 'category'
    | 'category-outline'
    | 'plain-category'
    | 'link-category'
  size?: 'lg' | 'sm'
  className?: string
  disabled?: boolean
  icon?: ReactNode
  text?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  hrefIconHidden?: boolean
  fullWidth?: boolean
  form?: string
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
      disabled,
      variant = 'black',
      size = 'lg',
      icon,
      text,
      startIcon,
      endIcon,
      hrefIconHidden,
      fullWidth,
      form,
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

    const isLinkVariant = variant === 'link-black' || variant === 'link-category'
    const hasText = Boolean(text || rest.label)

    const style = twMerge(
      'inline-flex items-center',
      isLinkVariant
        ? 'underline underline-offset-2'
        : 'h-fit space-x-2 justify-center text-center align-middle rounded-lg',
      cx({
        'w-full': fullWidth,
        'w-fit': !fullWidth,
        // text for lg button
        'text-16 font-semibold px-4 py-2.5':
          size === 'lg' &&
          !icon &&
          hasText &&
          (variant === 'black' ||
            variant === 'negative' ||
            variant === 'black-outline' ||
            variant === 'category' ||
            variant === 'category-outline'),
        // text for sm button
        'text-16 font-semibold px-4 py-1.5':
          size === 'sm' &&
          !icon &&
          hasText &&
          (variant === 'black' ||
            variant === 'negative' ||
            variant === 'black-outline' ||
            variant === 'category' ||
            variant === 'category-outline'),
        // icon for lg button
        'px-2.5 py-2.5':
          size === 'lg' &&
          icon &&
          !hasText &&
          (variant === 'black' ||
            variant === 'negative' ||
            variant === 'black-outline' ||
            variant === 'category' ||
            variant === 'category-outline'),
        // icon for sm button
        'px-2 py-2':
          (size === 'sm' &&
            icon &&
            !hasText &&
            (variant === 'black' ||
              variant === 'negative' ||
              variant === 'black-outline' ||
              variant === 'category' ||
              variant === 'category-outline')) ||
          (size === 'lg' &&
            icon &&
            !hasText &&
            (variant === 'plain-category' ||
              variant === 'plain-black' ||
              variant === 'plain-negative')),

        // icon for sm button plain variant
        'px-1.5 py-1.5':
          size === 'sm' &&
          icon &&
          !hasText &&
          (variant === 'plain-category' ||
            variant === 'plain-black' ||
            variant === 'plain-negative'),

        // text for lg button plain variant
        'text-16-semibold px-3 py-2':
          size === 'lg' &&
          !icon &&
          hasText &&
          (variant === 'plain-category' ||
            variant === 'plain-black' ||
            variant === 'plain-negative'),

        // text for sm button plain variant
        'text-16-semibold px-2 py-1':
          size === 'sm' &&
          !icon &&
          hasText &&
          (variant === 'plain-category' ||
            variant === 'plain-black' ||
            variant === 'plain-negative'),

        // text for lg link button
        'text-20-medium':
          size === 'lg' && (variant === 'link-category' || variant === 'link-black'),
        // text for sm link button
        'text-16-medium':
          size === 'sm' && (variant === 'link-category' || variant === 'link-black'),

        'border-2':
          variant === 'black' ||
          variant === 'negative' ||
          variant === 'black-outline' ||
          variant === 'category' ||
          variant === 'category-outline',

        // bg and border color
        'border-gray-700 bg-gray-700 focus:bg-gray-800 focus:border-gray-800': variant === 'black',
        'border-gray-200 bg-transparent text-gray-700 focus:border-gray-300 focus:text-gray-800':
          variant === 'black-outline',
        'border-negative-700 bg-negative-700 focus:bg-negative-800 focus:border-negative-800':
          variant === 'negative',
        'border-category-700 bg-category-700 focus:bg-category-800 focus:border-category-800':
          variant === 'category',
        'border-category-700 bg-transparent text-gray-700 focus:border-category-800 focus:text-gray-800':
          variant === 'category-outline',

        'text-category-700 focus:bg-category-200 focus:text-category-800':
          variant === 'plain-category',
        'text-gray-700 focus:bg-gray-200 focus:text-gray-800': variant === 'plain-black',
        'text-negative-700 focus:bg-negative-200 focus:text-negative-800':
          variant === 'plain-negative',

        'text-category-700 focus:text-category-800': variant === 'link-category',
        'text-gray-700 focus:text-gray-800': variant === 'link-black',

        // hover
        'hover:bg-gray-600 hover:border-gray-600': variant === 'black' && !disabled,
        'hover:border-gray-200 hover:text-gray-600': variant === 'black-outline' && !disabled,
        'hover:bg-negative-600 hover:border-negative-600': variant === 'negative' && !disabled,

        'hover:bg-category-600 hover:border-category-600': variant === 'category' && !disabled,
        'hover:border-category-600 hover:text-category-600':
          variant === 'category-outline' && !disabled,
        'hover:bg-category-100 hover:text-category-600': variant === 'plain-category' && !disabled,
        'hover:bg-gray-100 hover:text-gray-600': variant === 'plain-black' && !disabled,
        'hover:bg-negative-100 hover:text-negative-600': variant === 'plain-negative' && !disabled,

        'hover:text-category-600': variant === 'link-category' && !disabled,
        'hover:text-gray-600': variant === 'link-black' && !disabled,

        // text color
        'text-white': variant === 'negative' || variant === 'black' || variant === 'category',

        // disabled
        'opacity-50': disabled,
      }),
      className,
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
          {!hrefIconHidden && isLinkVariant && (
            <span
              className={cx('flex items-center justify-center', {
                'ml-2 h-6 w-6': size === 'lg',
                'ml-1 h-5 w-5': size === 'sm',
              })}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </span>
          )}
        </MLink>
      )
    }

    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        className={style}
        form={form}
        {...buttonProps}
      >
        <div className="flex items-center justify-center">
          {startIcon && (
            <span
              className={cx({ 'mr-3 h-6 w-6': size === 'lg', 'mr-2.5 h-5 w-5': size === 'sm' })}
            >
              {startIcon}
            </span>
          )}
          {text && !icon && text}
          {!text && icon && (
            <span className={cx({ 'h-6 w-6': size === 'lg', 'h-5 w-5': size === 'sm' })}>
              {icon}
            </span>
          )}
          {endIcon && (
            <span
              className={cx('flex items-center justify-center', {
                'ml-3 h-6 w-6': size === 'lg',
                'ml-2.5 h-5 w-5': size === 'sm',
              })}
            >
              {endIcon}
            </span>
          )}
        </div>
      </button>
    )
  },
) as PolymorphicButton

export default Button

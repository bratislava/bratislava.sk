import cx from 'classnames'
import * as React from 'react'

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children?: React.ReactNode
  className?: string
  hoverIcon?: React.ReactNode
  icon?: React.ReactNode
  iconClassName?: string
  iconPosition?: 'right' | 'left' | 'center'
  shape?: 'default' | 'circle' | 'none'
  spacing?: 'small' | 'default'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'secondary-dark-text'
    | 'tertiary-dark-text'
    | 'transparent'
    | 'full-transparent'
    | 'transparent-black'
    | 'transparent-gray'
    | 'primary-border'
    | 'muted'
}

export const Button = ({
  children,
  className,
  hoverIcon,
  icon,
  iconClassName,
  iconPosition = 'right',
  shape = 'default',
  spacing = 'default',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const iconContent = icon ? (
    <>
      <span className="group-hover:hidden">{icon}</span>

      <span className="ml-5 hidden group-hover:block">{hoverIcon || icon}</span>
    </>
  ) : null
  return (
    <button
      type="button"
      className={cx('group flex items-center', className, {
        // common styles
        // 'base-button': shape !== 'none',
        'base-link': shape === 'none',
        'space-x-6': !!icon && spacing === 'default',
        'space-x-2': !!icon && spacing === 'small',
        // styles for buttons
        'bg-category-600 text-white': shape !== 'none' && variant === 'primary',
        'border-category-600 bg-category-600 text-white':
          shape !== 'none' && variant === 'primary-border',
        'bg-category-200 text-category-600': shape !== 'none' && variant === 'secondary',
        'bg-category-800 text-white': shape !== 'none' && variant === 'tertiary',
        'bg-category-200 text-font': shape !== 'none' && variant === 'secondary-dark-text',
        'border-gray-500 bg-transparent text-gray-500':
          shape !== 'none' && variant === 'transparent-gray',
        'bg-category-800 text-font': shape !== 'none' && variant === 'tertiary-dark-text',
        'text-20 border-2 border-category-600 bg-transparent text-font hover:text-category-600':
          shape !== 'none' && variant === 'transparent',

        // transparent should be replaced with transparent-black
        'border-2 border-category-600 bg-transparent text-font':
          shape !== 'none' && variant === 'transparent-black',
        'bg-category-600 text-white hover:bg-category-600': shape !== 'none' && variant === 'muted',
        'bg-transparent text-font underline underline-offset-2':
          shape !== 'none' && variant === 'full-transparent',
        'justify-center rounded-lg': shape === 'default',
        'items-center justify-center rounded-full': shape === 'circle',
        // styles for links
        'text-category-600':
          shape === 'none' && (variant === 'primary' || variant === 'transparent'),
        'text-category-200': shape === 'none' && variant === 'secondary',
      })}
      {...props}
    >
      {iconPosition === 'left' && iconContent}
      <span className={cx(iconClassName)}>
        {iconPosition === 'center' && iconContent}
        {children}
      </span>
      {iconPosition === 'right' && iconContent}
    </button>
  )
}

export default Button

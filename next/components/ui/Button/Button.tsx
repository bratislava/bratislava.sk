import cx from 'classnames'
import * as React from 'react'

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
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
      className={cx('group flex items-center', className, {
        // common styles
        'base-button': shape !== 'none',
        'base-link': shape === 'none',
        'space-x-6': !!icon && spacing === 'default',
        'space-x-2': !!icon && spacing === 'small',
        // styles for buttons
        'bg-primary text-white': shape !== 'none' && variant === 'primary',
        'bg-primary text-white border-primary': shape !== 'none' && variant === 'primary-border',
        'bg-secondary text-primary': shape !== 'none' && variant === 'secondary',
        'bg-tertiary text-white': shape !== 'none' && variant === 'tertiary',
        'bg-secondary text-font': shape !== 'none' && variant === 'secondary-dark-text',
        'bg-transparent text-gray-universal-200 border-gray-universal-200': shape !== 'none' && variant === 'transparent-gray',
        'bg-tertiary text-font': shape !== 'none' && variant === 'tertiary-dark-text',
        'bg-transparent text-default text-font hover:text-primary border-primary border-2':
          shape !== 'none' && variant === 'transparent',

        // transparent should be replaced with transparent-black
        'bg-transparent text-font border-primary border-2': shape !== 'none' && variant === 'transparent-black',
        'bg-primary-muted text-white hover:bg-primary': shape !== 'none' && variant === 'muted',
        'bg-transparent text-font underline underline-offset-2': shape !== 'none' && variant === 'full-transparent',
        'rounded-lg': shape === 'default',
        'rounded-full': shape === 'circle',
        // styles for links
        'text-primary': shape === 'none' && (variant === 'primary' || variant === 'transparent'),
        'text-secondary': shape === 'none' && variant === 'secondary',
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

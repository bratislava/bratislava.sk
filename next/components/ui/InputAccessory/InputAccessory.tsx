import cx from 'classnames'

export interface InputAccessoryProps {
  className?: string
  children?: React.ReactNode
  icon: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const InputAccessory = ({
  className,
  children,
  icon,
  iconPosition = 'right',
}: InputAccessoryProps) => {
  const hasIcon = !!icon
  const hasIconLeft = hasIcon && iconPosition === 'left'
  const hasIconRight = hasIcon && iconPosition === 'right'

  return (
    <div className={cx('group relative', className)}>
      {hasIconLeft && (
        <span className="pointer-events-none absolute left-4 top-3 opacity-50 group-focus-within:text-category-600 group-focus-within:opacity-100">
          {icon}
        </span>
      )}
      {children}
      {hasIconRight && (
        <span className="pointer-events-none absolute right-4 top-3 opacity-50 group-focus-within:text-category-600 group-focus-within:opacity-100">
          {icon}
        </span>
      )}
    </div>
  )
}

export default InputAccessory

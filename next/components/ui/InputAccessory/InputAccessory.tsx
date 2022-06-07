import cx from 'classnames'

export interface InputAccessoryProps {
  className?: string
  children?: React.ReactNode
  icon: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const InputAccessory = ({ className, children, icon, iconPosition = 'right' }: InputAccessoryProps) => {
  const hasIcon = !!icon
  const hasIconLeft = hasIcon && iconPosition === 'left'
  const hasIconRight = hasIcon && iconPosition === 'right'

  return (
    <div className={cx('relative group', className)}>
      {hasIconLeft && (
        <span className="absolute pointer-events-none left-4 top-3 opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary">
          {icon}
        </span>
      )}
      {children}
      {hasIconRight && (
        <span className="absolute pointer-events-none right-4 top-3 opacity-50 group-focus-within:opacity-100 group-focus-within:text-primary">
          {icon}
        </span>
      )}
    </div>
  )
}

export default InputAccessory

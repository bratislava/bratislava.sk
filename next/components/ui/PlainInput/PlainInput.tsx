import cx from 'classnames'
import React from 'react'

interface IProps {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const PlainInput = ({
  className,
  icon,
  iconPosition = 'right',
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & IProps) => {
  const hasIcon = !!icon
  const hasIconLeft = hasIcon && iconPosition === 'left'
  const hasIconRight = hasIcon && iconPosition === 'right'

  return (
    <div className={cx('flex w-full border-b-4 border-primary items-center', className)}>
      {hasIconLeft && <div>{icon}</div>}
      <input className="w-full bg-transparent py-2 focus:outline-none" {...props} />
      {hasIconRight && <div>{icon}</div>}
    </div>
  )
}

export default PlainInput

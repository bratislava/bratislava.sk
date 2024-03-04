import React from 'react'
import { twMerge } from 'tailwind-merge'

type PlainInputProps = {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const PlainInput = ({
  className,
  icon,
  iconPosition = 'right',
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  PlainInputProps) => {
  const hasIcon = !!icon
  const hasIconLeft = hasIcon && iconPosition === 'left'
  const hasIconRight = hasIcon && iconPosition === 'right'

  return (
    <div className={twMerge('flex w-full items-center border-b-4 border-category-600', className)}>
      {hasIconLeft && <div>{icon}</div>}
      <input className="w-full bg-transparent py-2 focus:outline-none" {...props} />
      {hasIconRight && <div>{icon}</div>}
    </div>
  )
}

export default PlainInput

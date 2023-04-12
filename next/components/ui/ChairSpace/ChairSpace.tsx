import Chair from '@assets/images/chair.svg'
import React from 'react'

interface IProps {
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
}

export const ChairSpace = ({ className, children, icon }: IProps) => {
  return (
    <div className={className}>
      {children}
      <div className="flex">
        <Chair />
        <span className="mt-2">{!!icon && icon}</span>
        <Chair />
      </div>
    </div>
  )
}

export default ChairSpace

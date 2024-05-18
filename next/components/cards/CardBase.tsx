import cx from 'classnames'
import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardBaseProps = {
  variant?: 'border' | 'shadow'
} & HTMLAttributes<HTMLDivElement>

const CardBase = ({ variant = 'border', children, className, ...rest }: CardBaseProps) => {
  return (
    <div
      // overflow-hidden ensures image not to overlap with rounded corners
      className={twMerge(
        cx('group relative flex flex-col overflow-hidden rounded-2xl bg-white', {
          'border-2 border-gray-200 hover:border-gray-400': variant === 'border',
          'shadow hover:shadow-md': variant === 'shadow',
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default CardBase

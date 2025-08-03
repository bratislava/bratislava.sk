import React, { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

export type CardBaseProps = {
  variant?: 'border' | 'no-border'
} & HTMLAttributes<HTMLDivElement>

const CardBase = ({ variant = 'border', children, className, ...rest }: CardBaseProps) => {
  return (
    <div
      // overflow-hidden ensures image not to overlap with rounded corners
      className={cn(
        'group relative flex flex-col overflow-hidden bg-white',
        {
          // only change border color on hover if link is present among children
          'rounded-2xl border border-grey-200 has-[[href]]:hover:border-grey-400':
            variant === 'border',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default CardBase

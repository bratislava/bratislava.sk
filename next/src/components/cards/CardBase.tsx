import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

export type CardBaseProps = {
  variant?: 'border' | 'no-border'
} & HTMLAttributes<HTMLDivElement>

const CardBase = ({ variant = 'border', children, className, ...rest }: CardBaseProps) => {
  return (
    <div
      // overflow-hidden ensures image not to overlap with rounded corners
      className={cn(
        // TODO consider removing bg-background-passive-base
        'group relative flex flex-col overflow-hidden bg-background-passive-base',
        'wrapper-focus-ring',
        {
          'rounded-2xl border border-border-passive-primary hover:border-border-active-hover':
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

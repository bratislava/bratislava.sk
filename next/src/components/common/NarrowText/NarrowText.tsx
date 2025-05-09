import { PropsWithChildren } from 'react'

import cn from '@/src/utils/cn'

export type NarrowTextProps = {
  className?: string
  width?: 'narrow' | 'default' | 'wide' | 'full' | null
  align?: 'left' | 'center' | 'right' | null
}

const NarrowText = ({
  className,
  width = 'default',
  align = 'center',
  children,
}: PropsWithChildren<NarrowTextProps>) => {
  return (
    <div
      className={cn(
        'flex',
        {
          'justify-start': align === 'left',
          'text-title-center justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        className,
      )}
    >
      <div
        className={cn('w-full', {
          'md:w-1/2': width === 'narrow',
          'md:w-8/12': width === 'default',
          'md:w-10/12': width === 'wide',
          'md:w-full': width === 'full',
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default NarrowText

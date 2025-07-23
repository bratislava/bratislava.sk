import { PropsWithChildren } from 'react'

import cn from '@/src/utils/cn'

type CardContentProps = {
  variant?: 'no-padding' | 'with-padding'
  className?: string
}

const CardContent = ({
  variant = 'with-padding',
  className,
  children,
}: PropsWithChildren<CardContentProps>) => {
  return (
    <div className={cn('flex flex-col', { 'p-4 lg:p-5': variant === 'with-padding' }, className)}>
      {children}
    </div>
  )
}

export default CardContent

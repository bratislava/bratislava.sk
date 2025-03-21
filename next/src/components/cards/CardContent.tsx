import { PropsWithChildren } from 'react'

import cn from '@/src/utils/cn'

type CardContentProps = {
  className?: string
}

const CardContent = ({ className, children }: PropsWithChildren<CardContentProps>) => {
  return <div className={cn('flex flex-col p-4 lg:p-5', className)}>{children}</div>
}

export default CardContent

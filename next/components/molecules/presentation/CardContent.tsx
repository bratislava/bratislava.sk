import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type CardContentProps = {
  className?: string
}

const CardContent = ({ className, children }: PropsWithChildren<CardContentProps>) => {
  return <div className={twMerge('flex flex-col p-4', className)}>{children}</div>
}

export default CardContent

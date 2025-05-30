import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

type SectionContainerProps = HTMLAttributes<HTMLDivElement>

const SectionContainer = ({ className, children, ...rest }: SectionContainerProps) => (
  <div className={cn('relative', className)} {...rest}>
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">{children}</div>
  </div>
)

export default SectionContainer

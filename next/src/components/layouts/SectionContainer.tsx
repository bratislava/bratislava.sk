import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

type SectionContainerProps = HTMLAttributes<HTMLDivElement>

const SectionContainer = ({ className, children, ...rest }: SectionContainerProps) => (
  // data-section-container-... attributes serve to target these divs by tailwind from above
  <div data-section-container-outer className={cn('relative', className)} {...rest}>
    <div data-section-container-inner className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
      {children}
    </div>
  </div>
)

export default SectionContainer

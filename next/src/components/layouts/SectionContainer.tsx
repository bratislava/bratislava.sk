import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

type SectionContainerProps = HTMLAttributes<HTMLDivElement>

const SectionContainer = ({ className, children, ...rest }: SectionContainerProps) => (
  // data-sectionContainer... attributes serve to target these divs by tailwind from above
  <div data-sectionContainerOuter className={cn('relative', className)} {...rest}>
    <div data-sectionContainerInner className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">
      {children}
    </div>
  </div>
)

export default SectionContainer

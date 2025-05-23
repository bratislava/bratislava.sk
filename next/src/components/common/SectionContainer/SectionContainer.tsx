import { HTMLAttributes } from 'react'

import cn from '@/src/utils/cn'

type SectionContainerProps = {
  hasBackground?: boolean
} & HTMLAttributes<HTMLDivElement>

const SectionContainer = ({
  hasBackground = false,
  className,
  children,
  ...rest
}: SectionContainerProps) => (
  <div
    className={cn(
      'relative',
      {
        'bg-category-200': hasBackground === true,
      },
      className,
    )}
    {...rest}
  >
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8">{children}</div>
  </div>
)

export default SectionContainer

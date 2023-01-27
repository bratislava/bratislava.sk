import { FC, ReactNode } from 'react'

import { useIntersectionObserver } from './useIntersectionObserver'

interface Props {
  children: ReactNode

  onHandleVisibility(): void
}

export const VisibilityIntersectionWrapper: FC<Props> = ({ children, onHandleVisibility }) => {
  const { elementRef } = useIntersectionObserver({ threshold: 0.9 }, onHandleVisibility)

  return (
    <div>
      <div ref={elementRef} />
      {children}
    </div>
  )
}

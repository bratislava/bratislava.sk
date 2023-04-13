import cx from 'classnames'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SectionContainerProps {
  hasBackground?: boolean
}

export const SectionContainer = ({
  className,
  children,
  hasBackground = false,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & SectionContainerProps) => (
  <div
    className={twMerge(
      cx('px-8', {
        'bg-category-200': hasBackground === true,
      }),
      className,
    )}
    {...rest}
  >
    <div className="mx-auto w-full max-w-screen-lg">{children}</div>
  </div>
)

export default SectionContainer

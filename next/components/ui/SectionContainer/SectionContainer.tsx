import cx from 'classnames'
import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type SectionContainerProps = {
  hasBackground?: boolean
} & HTMLAttributes<HTMLDivElement>

export const SectionContainer = ({
  hasBackground = false,
  className,
  children,
  ...rest
}: SectionContainerProps) => (
  <div
    className={twMerge(
      cx('relative', {
        'bg-category-200': hasBackground === true,
      }),
      className,
    )}
    {...rest}
  >
    <div className="mx-auto max-w-screen-xl px-4 lg:px-8">{children}</div>
  </div>
)

export default SectionContainer

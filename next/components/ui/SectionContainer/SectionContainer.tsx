import cx from 'classnames'
import React from 'react'

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
    className={cx(className, 'px-7.5 overflow-hidden', {
      'bg-secondary': hasBackground === true,
    })}
    {...rest}
  >
    <div className="mx-auto w-full max-w-screen-1.5lg">{children}</div>
  </div>
)

export default SectionContainer

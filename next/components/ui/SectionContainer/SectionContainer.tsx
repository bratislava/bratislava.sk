import cx from 'classnames'
import React from 'react'

enum BACKGROUND_COLOR {
  LIGHT_RED = 'bg-secondary',
  LIGHT_GRAY = 'bg-gray-100',
  WHITE = 'bg-white',
}

interface SectionContainerProps {
  hasBackground?: boolean
  color?: BACKGROUND_COLOR
}

export const SectionContainer = ({
  className,
  children,
  color = BACKGROUND_COLOR.WHITE,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & SectionContainerProps) => (
  <div className={cx(className, 'px-7.5', color)} {...rest}>
    <div className="mx-auto w-full max-w-screen-1.5lg">{children}</div>
  </div>
)

SectionContainer.COLOR = BACKGROUND_COLOR

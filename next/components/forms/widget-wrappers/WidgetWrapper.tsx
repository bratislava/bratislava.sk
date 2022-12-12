import cx from 'classnames'
import { FormSpacingType } from 'components/forms/types/WidgetOptions'
import React, { ReactNode } from 'react'

type WidgetWrapperBase = {
  children: ReactNode
  className?: string
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}

const WidgetWrapper = ({
  children,
  className,
  spaceBottom = 'default',
  spaceTop = 'default',
}: WidgetWrapperBase) => {
  return (
    <div
      className={cx(className, {
        'mb-[0px]': spaceBottom === 'none',
        'mb-[40px]': spaceBottom === 'large',
        'mb-[32px]': spaceBottom === 'default',
        'mb-[24px]': spaceBottom === 'small',

        'mt-[0px]': spaceTop === 'none',
        'mt-[40px]': spaceTop === 'large',
        'mt-[32px]': spaceTop === 'default',
        'mt-[24px]': spaceTop === 'small',
      })}
    >
      {children}
    </div>
  )
}

export default WidgetWrapper

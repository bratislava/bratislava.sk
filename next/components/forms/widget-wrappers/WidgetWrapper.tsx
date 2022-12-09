import { formSpacingHandler } from '@utils/formsHelper'
import { FormSpacingType } from 'components/forms/types/WidgetOptions'
import React, { ReactNode } from 'react'

type WidgetWrapperBase = {
  children: ReactNode
  className?: string
  spaceBottom: FormSpacingType
  spaceTop: FormSpacingType
}

const WidgetWrapper = ({ children, className, spaceBottom, spaceTop }: WidgetWrapperBase) => {
  return (
    <div
      className={className}
      style={{
        paddingBottom: formSpacingHandler(spaceBottom),
        paddingTop: formSpacingHandler(spaceTop),
      }}
    >
      {children}
    </div>
  )
}

export default WidgetWrapper

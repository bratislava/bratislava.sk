import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Checkbox from '../widget-components/Checkbox/Checkbox'
import CheckboxGroup from '../widget-components/Checkbox/CheckboxGroup'

type CheckboxesRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  description?: string
  className?: string
  variant?: 'basic' | 'boxed'
  error?: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
}

interface CheckboxesWidgetRJSFProps extends WidgetProps {
  options: CheckboxesRJSFOptions
  value: string[]
  schema: StrictRJSFSchema
  onChange: (value: string[]) => void
}

const RadioButtonsWidgetRJSF = (props: CheckboxesWidgetRJSFProps) => {
  const { options, value, onChange } = props
  const { enumOptions, className } = options
  if (!enumOptions) return <div />
  return (
    <CheckboxGroup value={value} onChange={onChange} className={className}>
      {enumOptions.map((option: any) => {
        return (
          <Checkbox
            key={option.value}
            value={option.value}
            variant={options.variant}
            error={option.schema.error}
            tooltip={option.schema.tooltip ? option.schema.tooltip : null}
            isDisabled={option.schema.isDisabled}
            isIndeterminate={option.schema.isIndeterminate}
          >
            {option.schema.label}
          </Checkbox>
        )
      })}
    </CheckboxGroup>
  )
}

export default RadioButtonsWidgetRJSF

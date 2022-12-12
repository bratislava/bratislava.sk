import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Checkbox from '../widget-components/Checkbox/Checkbox'
import CheckboxGroup from '../widget-components/Checkbox/CheckboxGroup'

type CheckboxesRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  variant?: 'basic' | 'boxed'
  error?: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
} & WidgetOptions

interface CheckboxesWidgetRJSFProps extends WidgetProps {
  options: CheckboxesRJSFOptions
  value: string[]
  schema: StrictRJSFSchema
  onChange: (value: string[]) => void
}

const RadioButtonsWidgetRJSF = (props: CheckboxesWidgetRJSFProps) => {
  const { options, value, onChange } = props
  const { enumOptions, className, spaceBottom = 'default', spaceTop = 'none' } = options
  if (!enumOptions) return <div />
  return (
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
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
    </WidgetWrapper>
  )
}

export default RadioButtonsWidgetRJSF

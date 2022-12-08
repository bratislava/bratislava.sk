import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { formSpacingHandler, FormSpacingType } from '@utils/formsHelper'
import React from 'react'

import Checkbox from '../Checkbox'
import CheckboxGroup from '../CheckboxGroup'

type CheckboxesRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  description?: string
  className?: string
  variant?: 'basic' | 'boxed'
  error?: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}

interface CheckboxesWidgetRJSFProps extends WidgetProps {
  options: CheckboxesRJSFOptions
  value: string[]
  schema: StrictRJSFSchema
  onChange: (value: string[]) => void
}

const RadioButtonsWidgetRJSF = (props: CheckboxesWidgetRJSFProps) => {
  const { options, value, onChange } = props
  const { enumOptions, className, spaceBottom = 'none', spaceTop = 'default' } = options
  if (!enumOptions) return <div />
  return (
    <div
      style={{
        paddingBottom: formSpacingHandler(spaceBottom),
        paddingTop: formSpacingHandler(spaceTop),
      }}
    >
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
    </div>
  )
}

export default RadioButtonsWidgetRJSF

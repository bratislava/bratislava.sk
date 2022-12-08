import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { formSpacingHandler, FormSpacingType } from '@utils/formsHelper'
import React from 'react'

import Radio from '../RadioButton/Radio'
import RadioGroup from '../RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
  description?: string
  className?: string
  variant?: 'basic' | 'boxed' | 'card'
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
}

interface RadioButtonFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: RadioButtonRJSFOptions
  value: any | any[]
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value: any | any[]) => void
}

const RadioButtonsWidgetRJSF = (props: RadioButtonFieldWidgetRJSFProps) => {
  const { options, value, onChange } = props
  const { enumOptions, className, spaceBottom = 'none', spaceTop = 'default' } = options

  if (!enumOptions || Array.isArray(value)) return null
  return (
    <div
      style={{
        paddingBottom: formSpacingHandler(spaceBottom),
        paddingTop: formSpacingHandler(spaceTop),
      }}
    >
      <RadioGroup value={value} onChange={onChange} className={className}>
        {enumOptions.map((radioElement: any) => {
          return (
            <Radio
              key={radioElement.value}
              isDisabled={radioElement.schema.disabled}
              variant={options.variant}
              value={radioElement.value}
              error={radioElement.schema.error}
              tooltip={radioElement.schema.tooltip}
            >
              {radioElement.label}
            </Radio>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default RadioButtonsWidgetRJSF

import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Radio from '../widget-components/RadioButton/Radio'
import RadioGroup from '../widget-components/RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
  description?: string
  className?: string
  variant?: 'basic' | 'boxed' | 'card'
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
  const { options, value, onChange, label } = props
  const { enumOptions, className } = options

  if (!enumOptions || Array.isArray(value)) return null
  return (
    <RadioGroup value={value} onChange={onChange} className={className} label={label}>
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
  )
}

export default RadioButtonsWidgetRJSF

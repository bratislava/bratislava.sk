import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Radio from '../widget-components/RadioButton/Radio'
import RadioGroup from '../widget-components/RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  className?: string
  variant?: 'basic' | 'boxed' | 'card'
}

interface RadioButtonFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: RadioButtonRJSFOptions
  value: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  schema: StrictRJSFSchema
  onChange: (value: string) => void
}

const RadioButtonsWidgetRJSF = (props: RadioButtonFieldWidgetRJSFProps) => {
  const { options, value, onChange, label } = props
  const { enumOptions, className, variant } = options
  if (!enumOptions || Array.isArray(value)) return null
  return (
    <RadioGroup value={value} onChange={onChange} className={className} label={label}>
      {enumOptions.map((radioElement: EnumOptionsType) => {
        return (
          <Radio
            key={radioElement.value}
            variant={variant}
            value={radioElement.value}
            tooltip={radioElement?.schema?.tooltip}
          >
            {radioElement.label}
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

export default RadioButtonsWidgetRJSF

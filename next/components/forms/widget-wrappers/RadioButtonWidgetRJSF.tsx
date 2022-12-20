import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Radio from '../widget-components/RadioButton/Radio'
import RadioGroup from '../widget-components/RadioButton/RadioGroup'

type RadioUiOptions = {
  value: string
  tooltip: string
}

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  className?: string
  radioOptions?: RadioUiOptions[]
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
  const { enumOptions, className, variant, radioOptions = [] } = options
  if (!enumOptions || Array.isArray(value)) return null
  const getTooltip = (radioValue: string) => {
    return radioOptions.find((option) => option.value === radioValue)?.tooltip
  }
  return (
    <RadioGroup value={value} onChange={onChange} className={className} label={label}>
      {enumOptions.map((radioElement: EnumOptionsType) => {
        return (
          <Radio
            key={radioElement.value}
            variant={variant}
            value={radioElement.value}
            tooltip={getTooltip(radioElement.value as string)}
          >
            {radioElement.label}
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

export default RadioButtonsWidgetRJSF

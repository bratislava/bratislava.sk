import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Radio from '../widget-components/RadioButton/Radio'
import RadioGroup from '../widget-components/RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  radioOptions?: { value: string; tooltip?: string; isDisabled?: boolean }[]
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
  const { enumOptions, className, radioOptions = [], variant } = options
  if (!enumOptions || Array.isArray(value)) return null
  const getTooltip = (radioValue: string) => {
    return radioOptions.find((option) => option.value === radioValue)?.tooltip
  }
  const isDisabled = (radioValue: string) => {
    return radioOptions.find((option) => option.value === radioValue)?.isDisabled
  }
  return (
    <RadioGroup value={value} onChange={onChange} className={className} label={label}>
      {enumOptions.map((radioElement: { value: string; label: string }) => {
        return (
          <Radio
            key={radioElement.value}
            isDisabled={isDisabled(radioElement.value)}
            variant={variant}
            value={radioElement.value}
            tooltip={getTooltip(radioElement.value)}
          >
            {radioElement.label}
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

export default RadioButtonsWidgetRJSF

import { EnumOptionsType, WidgetProps } from '@rjsf/utils'
import React from 'react'

import Radio from '../RadioButton/Radio'
import RadioGroup from '../RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  className?: string
  variant?: 'basic' | 'boxed' | 'card'
}

interface RadioButtonFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: RadioButtonRJSFOptions
  value: string
  onChange: (value: string) => void
}

const RadioButtonsWidgetRJSF = (props: RadioButtonFieldWidgetRJSFProps) => {
  const { options, value, onChange } = props
  const { enumOptions, className, variant } = options

  if (!enumOptions || Array.isArray(value)) return null

  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      {enumOptions.map((radioElement: any) => {
        return (
          <Radio
            key={radioElement.value}
            isDisabled={radioElement.schema.disabled}
            variant={variant || 'basic'}
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

import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Radio from '../widget-components/RadioButton/Radio'
import RadioGroup from '../widget-components/RadioButton/RadioGroup'

type RadioButtonRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
  variant?: 'basic' | 'boxed' | 'card'
} & WidgetOptions

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
  const { enumOptions, className, spaceBottom = 'default', spaceTop = 'none' } = options

  if (!enumOptions || Array.isArray(value)) return null
  return (
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
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
    </WidgetWrapper>
  )
}

export default RadioButtonsWidgetRJSF

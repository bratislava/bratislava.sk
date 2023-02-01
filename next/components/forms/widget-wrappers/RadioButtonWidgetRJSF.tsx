import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
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
  orientations?: 'column' | 'row'
} & WidgetOptions

interface RadioButtonFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: RadioButtonRJSFOptions
  value: string | null
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  schema: StrictRJSFSchema
  onChange: (value?: string | undefined) => void
  rawErrors?: string[]
}

const RadioButtonsWidgetRJSF = (props: RadioButtonFieldWidgetRJSFProps) => {
  const { options, value, onChange, label, rawErrors, required } = props
  const {
    enumOptions,
    className,
    variant,
    accordion,
    radioOptions = [],
    orientations,
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  if (!enumOptions || Array.isArray(value)) return null
  const getTooltip = (radioValue: string) => {
    return radioOptions.find((option) => option.value === radioValue)?.tooltip
  }
  return (
    <WidgetWrapper accordion={accordion} spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <RadioGroup
        errorMessage={rawErrors}
        value={value ?? undefined}
        onChange={onChange}
        className={className}
        label={label}
        orientations={orientations}
        required={required}
      >
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
    </WidgetWrapper>
  )
}

export default RadioButtonsWidgetRJSF

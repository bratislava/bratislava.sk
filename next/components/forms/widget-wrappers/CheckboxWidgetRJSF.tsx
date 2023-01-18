import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Checkbox from '../widget-components/Checkbox/Checkbox'
import CheckboxGroup from '../widget-components/Checkbox/CheckboxGroup'

type CheckboxUiOptions = {
  value: string
  tooltip: string
}

type CheckboxesRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  variant?: 'basic' | 'boxed'
  checkboxOptions?: CheckboxUiOptions[]
} & WidgetOptions

interface CheckboxesWidgetRJSFProps extends WidgetProps {
  options: CheckboxesRJSFOptions
  value: string[]
  label: string
  schema: StrictRJSFSchema
  onChange: (value: string[]) => void
  rawErrors?: string[]
}

const CheckboxWidgetRJSF = (props: CheckboxesWidgetRJSFProps) => {
  const {
    options,
    value,
    onChange,
    label,
    schema: { maxItems },
    rawErrors,
  } = props
  const {
    enumOptions,
    className,
    accordion,
    spaceBottom = 'default',
    spaceTop = 'none',
    checkboxOptions = [],
    variant = 'basic',
  } = options
  if (!enumOptions) return <div />
  const getTooltip = (radioValue: string) => {
    return checkboxOptions.find((option) => option.value === radioValue)?.tooltip
  }
  const isDisabled = (valueName: string) => {
    return value.length === maxItems && !value.includes(valueName)
  }
  return (
    <WidgetWrapper accordion={accordion} spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <CheckboxGroup
        rawErrors={rawErrors}
        value={value}
        onChange={onChange}
        className={className}
        label={label}
      >
        {enumOptions.map((option: EnumOptionsType) => {
          return (
            <Checkbox
              key={option.value}
              value={option.value}
              variant={variant}
              isDisabled={isDisabled(option.value as string)}
              tooltip={getTooltip(option.value as string)}
            >
              {option.label}
            </Checkbox>
          )
        })}
      </CheckboxGroup>
    </WidgetWrapper>
  )
}

export default CheckboxWidgetRJSF

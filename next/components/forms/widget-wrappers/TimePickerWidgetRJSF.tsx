import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import TimePicker from 'components/forms/widget-components/DateTimePicker/TimePicker'
import React from 'react'

type TimePickerRJSFOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: boolean
}

interface TimePickerWidgetRJSFProps extends WidgetProps {
  label: string
  options: TimePickerRJSFOptions
  value: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  schema: StrictRJSFSchema
  onChange: (value?: string) => void
  rawErrors?: string[]
}

const TimePickerWidgetRJSF = ({
  label,
  options,
  rawErrors = [],
  required,
  disabled,
  value,
  onChange,
}: TimePickerWidgetRJSFProps) => {
  const { description, tooltip, explicitOptional } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  return (
    <TimePicker
      label={label}
      errorMessage={rawErrors?.join(', ')}
      required={required}
      disabled={disabled}
      description={description}
      tooltip={tooltip}
      explicitOptional={explicitOptional}
      value={value}
      onChange={handleOnChange}
    />
  )
}
export default TimePickerWidgetRJSF

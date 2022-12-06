import { DateValue } from '@internationalized/date'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import DatePicker from 'components/forms/DateTimePicker/DatePicker'
import React from 'react'

type InputFieldRJSFOptions = {
  tooltip?: string
  description?: string
  className?: string
  explicitOptional?: boolean
}

interface DatePickerWidgetRJSFProps extends WidgetProps {
  label: string
  options: InputFieldRJSFOptions
  value: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  schema: StrictRJSFSchema
  onChange: (value?: string) => void
}

const DatePickerWidgetRJSF = ({
  label,
  options,
  errorMessage,
  required,
  disabled,
  value,
  onChange,
}: DatePickerWidgetRJSFProps) => {
  const { description, tooltip, explicitOptional } = options

  const handleOnChange = (newValue?: DateValue) =>
    newValue ? onChange(newValue.toString()) : onChange()

  return (
    <DatePicker
      label={label}
      errorMessage={errorMessage}
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
export default DatePickerWidgetRJSF

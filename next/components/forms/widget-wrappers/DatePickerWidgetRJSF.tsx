import { DateValue } from '@internationalized/date'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import DatePicker from 'components/forms/widget-components/DateTimePicker/DatePicker'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

type DatePickerRJSFOptions = WidgetOptions

interface DatePickerWidgetRJSFProps extends WidgetProps {
  label: string
  options: DatePickerRJSFOptions
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
  const {
    description,
    tooltip,
    explicitOptional,
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const handleOnChange = (newValue?: DateValue) =>
    newValue ? onChange(newValue.toString()) : onChange()

  return (
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
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
    </WidgetWrapper>
  )
}
export default DatePickerWidgetRJSF

import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import TimePicker from 'components/forms/widget-components/DateTimePicker/TimePicker'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

type TimePickerRJSFOptions = WidgetOptions

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
  const {
    description,
    tooltip,
    explicitOptional,
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  return (
    <WidgetWrapper spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <TimePicker
        label={label}
        errorMessage={rawErrors}
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
export default TimePickerWidgetRJSF

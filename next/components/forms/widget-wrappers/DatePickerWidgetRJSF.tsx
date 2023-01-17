import { DateValue } from '@internationalized/date'
import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import DatePicker from 'components/forms/widget-components/DateTimePicker/DatePicker'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

import Accordion, { AccordionSizeType } from '../simple-components/Accordion'

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
  rawErrors?: string[]
}

const DatePickerWidgetRJSF = ({
  label,
  options,
  rawErrors,
  required,
  disabled,
  value,
  onChange,
}: DatePickerWidgetRJSFProps) => {
  const {
    description,
    tooltip,
    explicitOptional,
    markdown,
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const handleOnChange = (newValue?: DateValue) =>
    newValue ? onChange(newValue.toString()) : onChange()

  return (
    <WidgetWrapper className="flex flex-col gap-4" spaceBottom={spaceBottom} spaceTop={spaceTop}>
      <DatePicker
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
      {markdown && markdown.title && markdown.content && markdown?.size && (
        <Accordion
          size={markdown.size as AccordionSizeType}
          title={markdown.title}
          shadow
          markdownContent={markdown.content}
        />
      )}
    </WidgetWrapper>
  )
}
export default DatePickerWidgetRJSF

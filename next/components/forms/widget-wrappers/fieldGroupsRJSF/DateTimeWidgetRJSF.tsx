import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateTimePicker } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

const DateTimeWidgetRJSF = ({
  formData = {},
  onChange,
  schema,
  uiSchema,
  errorSchema,
}: FieldProps) => {
  const keys = Object.keys({ ...schema.properties })
  const schemaProperties = {
    ...(schema.properties as Record<string, { type: string; title: string }>),
  }
  const localUiSchema = uiSchema?.['ui:options']

  const handleOnChange = (valueName: string, newValue?: string | undefined) => {
    onChange({
      ...formData,
      [valueName]: newValue || undefined,
    })
  }

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

  // TODO: fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => errorSchema?.[propKey]?.__errors || []

  return (
    <div className={localUiSchema?.className as string}>
      <DateTimePicker
        DateTooltip={localUiSchema?.DateTooltip as string}
        TimeTooltip={localUiSchema?.TimeTooltip as string}
        DateDescription={localUiSchema?.DateDescription as string}
        TimeDescription={localUiSchema?.TimeDescription as string}
        DateExplicitOptional={localUiSchema?.DateExplicitOptional as ExplicitOptionalType}
        TimeExplicitOptional={localUiSchema?.TimeExplicitOptional as ExplicitOptionalType}
        DateRequired={schema.required?.includes(keys[0])}
        TimeRequired={schema.required?.includes(keys[1])}
        DateErrorMessage={getErrorMessage(keys[0])}
        TimeErrorMessage={getErrorMessage(keys[1])}
        DateOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        TimeOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        DateValue={formData[keys[0]]}
        TimeValue={formData[keys[1]]}
        DateLabel={getLabel(0)}
        TimeLabel={getLabel(1)}
        DateDisabled={localUiSchema?.DateDisabled as unknown as boolean}
        TimeDisabled={localUiSchema?.TimeDisabled as unknown as boolean}
      />
    </div>
  )
}

export default DateTimeWidgetRJSF

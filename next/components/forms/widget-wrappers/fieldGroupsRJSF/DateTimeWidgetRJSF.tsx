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
        DateRequired={schema.required?.includes('dateValue')}
        TimeRequired={schema.required?.includes('timeValue')}
        DateErrorMessage={getErrorMessage('dateValue')}
        TimeErrorMessage={getErrorMessage('timeValue')}
        DateOnChange={(e) => handleOnChange('dateValue', e?.toString())}
        TimeOnChange={(e) => handleOnChange('timeValue', e?.toString())}
        DateValue={formData.dateValue}
        TimeValue={formData.timeValue}
        DateLabel={schemaProperties?.dateValue?.title}
        TimeLabel={schemaProperties?.timeValue?.title}
        DateDisabled={localUiSchema?.DateDisabled as unknown as boolean}
        TimeDisabled={localUiSchema?.TimeDisabled as unknown as boolean}
      />
    </div>
  )
}

export default DateTimeWidgetRJSF

import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateTimePicker } from '../../groups'

const DateTimeWidgetRJSF = ({
  formData = {},
  onChange,
  schema,
  uiSchema,
  rawErrors = [],
}: FieldProps) => {
  const keys = Object.keys({ ...schema.properties })
  const schemaProperties = {
    ...(schema.properties as Record<string, { type: string; title: string }>),
  }
  const handleOnChange = (valueName: string, newValue?: string | undefined) => {
    onChange({
      ...formData,
      [valueName]: newValue,
    })
  }

  const getUIProp = (uiPropName: string) => {
    return uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'][uiPropName]
  }

  const requiredField = (propKey: string) => {
    return schema.required?.includes(propKey)
  }

  const getLabel = (index: 0 | 1) => {
    return schemaProperties[keys[index]].title
  }

  // TODO fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => {
    const errors: string[] = []
    if (Array.isArray(rawErrors)) {
      rawErrors.forEach((rawError: string) => {
        if (rawError.includes(propKey)) {
          errors.push(rawError)
        }
      })
    }
    return errors
  }

  return (
    <div className={getUIProp('className') as string}>
      <DateTimePicker
        DateTooltip={getUIProp('DateTooltip') as string}
        TimeTooltip={getUIProp('TimeTooltip') as string}
        DateDescription={getUIProp('DateDescription') as string}
        TimeDescription={getUIProp('TimeDescription') as string}
        DateRequired={requiredField(keys[0])}
        TimeRequired={requiredField(keys[1])}
        DateErrorMessage={getErrorMessage(keys[0])}
        TimeErrorMessage={getErrorMessage(keys[1])}
        DateOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        TimeOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        DateValue={formData[keys[0]]}
        TimeValue={formData[keys[1]]}
        DateLabel={getLabel(0)}
        TimeLabel={getLabel(1)}
      />
    </div>
  )
}

export default DateTimeWidgetRJSF

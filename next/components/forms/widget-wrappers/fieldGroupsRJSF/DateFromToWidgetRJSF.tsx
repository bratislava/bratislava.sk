import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateFromTo } from '../../groups'

const DateFromToWidgetRJSF = ({
  formData,
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
      <DateFromTo
        DateToTooltip={getUIProp('DateToTooltip') as string}
        DateFromTooltip={getUIProp('DateFromTooltip') as string}
        DateFromRequired={requiredField(keys[0])}
        DateToRequired={requiredField(keys[1]) as unknown as boolean}
        DateFromErrorMessage={getErrorMessage(keys[0])}
        DateToErrorMessage={getErrorMessage(keys[1])}
        DateFromDescription={getUIProp('DateFromDescription') as string}
        DateToDescription={getUIProp('DateToDescription') as string}
        DateFromOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        DateToOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        DateFromValue={formData[keys[0]]}
        DateToValue={formData[keys[1]]}
        DateFromLabel={getLabel(0)}
        DateToLabel={getLabel(1)}
      />
    </div>
  )
}

export default DateFromToWidgetRJSF

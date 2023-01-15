import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { TimeFromTo } from '../../groups'

const TimeFromToWidgetRJSF = ({
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

  const getLabel = (index: 0 | 1) => {
    return schemaProperties[keys[index]].title
  }

  return (
    <div className={getUIProp('className') as string}>
      <TimeFromTo
        TimeToTooltip={getUIProp('TimeToTooltip') as string}
        TimeFromTooltip={getUIProp('TimeFromTooltip') as string}
        TimeFromDescription={getUIProp('TimeFromDescription') as string}
        TimeToDescription={getUIProp('TimeToDescription') as string}
        TimeFromRequired={requiredField(keys[0])}
        TimeToRequired={requiredField(keys[1])}
        TimeFromErrorMessage={getErrorMessage(keys[0])}
        TimeToErrorMessage={getErrorMessage(keys[1])}
        TimeFromExplicitOptional={getUIProp('TimeFromExplicitOptional') as unknown as boolean}
        TimeToExplicitOptional={getUIProp('TimeToExplicitOptional') as unknown as boolean}
        TimeFromOnChange={(e) => handleOnChange(keys[0], e?.toString())}
        TimeToOnChange={(e) => handleOnChange(keys[1], e?.toString())}
        TimeFromValue={formData[keys[0]]}
        TimeToValue={formData[keys[1]]}
        TimeFromLabel={getLabel(0)}
        TimeToLabel={getLabel(1)}
      />
    </div>
  )
}

export default TimeFromToWidgetRJSF

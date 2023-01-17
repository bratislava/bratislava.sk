import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { TimeFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

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
  const localUiSchema = uiSchema?.['ui:options']

  const handleOnChange = (valueName: string, newValue?: string | undefined) => {
    onChange({
      ...formData,
      [valueName]: newValue,
    })
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

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

  return (
    <div className={localUiSchema?.className as string}>
      <TimeFromTo
        TimeToTooltip={localUiSchema?.TimeToTooltip as string}
        TimeFromTooltip={localUiSchema?.TimeFromTooltip as string}
        TimeFromDescription={localUiSchema?.TimeFromDescription as string}
        TimeToDescription={localUiSchema?.TimeToDescription as string}
        TimeFromRequired={schema.required?.includes(keys[0])}
        TimeToRequired={schema.required?.includes(keys[1])}
        TimeFromErrorMessage={getErrorMessage(keys[0])}
        TimeToErrorMessage={getErrorMessage(keys[1])}
        TimeFromExplicitOptional={localUiSchema?.TimeFromExplicitOptional as ExplicitOptionalType}
        TimeToExplicitOptional={localUiSchema?.TimeToExplicitOptional as ExplicitOptionalType}
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

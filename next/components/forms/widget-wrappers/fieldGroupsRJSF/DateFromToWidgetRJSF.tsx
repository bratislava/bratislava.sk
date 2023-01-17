import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

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
  const localUiSchema = uiSchema?.['ui:options']

  const handleOnChange = (valueName: string, newValue?: string | undefined) => {
    onChange({
      ...formData,
      [valueName]: newValue,
    })
  }

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

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
    <div className={localUiSchema?.className as string}>
      <DateFromTo
        DateToTooltip={localUiSchema?.DateToTooltip as string}
        DateFromTooltip={localUiSchema?.DateFromTooltip as string}
        DateFromRequired={schema.required?.includes(keys[0])}
        DateToRequired={schema.required?.includes(keys[1]) as unknown as boolean}
        DateFromErrorMessage={getErrorMessage(keys[0])}
        DateToErrorMessage={getErrorMessage(keys[1])}
        DateFromDescription={localUiSchema?.DateFromDescription as string}
        DateToDescription={localUiSchema?.DateToDescription as string}
        DateFromExplicitOptional={localUiSchema?.DateFromExplicitOptional as ExplicitOptionalType}
        DateToExplicitOptional={localUiSchema?.DateToExplicitOptional as ExplicitOptionalType}
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

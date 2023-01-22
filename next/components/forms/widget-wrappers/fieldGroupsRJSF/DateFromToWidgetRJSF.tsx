import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

const DateFromToWidgetRJSF = ({
  formData,
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
      [valueName]: newValue,
    })
  }

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

  // TODO fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => errorSchema?.[propKey]?.__errors || []

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
        DateFromDisabled={localUiSchema?.DateFromDisabled as unknown as boolean}
        DateToDisabled={localUiSchema?.DateToDisabled as unknown as boolean}
      />
    </div>
  )
}

export default DateFromToWidgetRJSF

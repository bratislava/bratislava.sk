import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { TimeFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

const TimeFromToWidgetRJSF = ({
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
      [valueName]: newValue || undefined,
    })
  }

  // TODO: fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => errorSchema?.[propKey]?.__errors || []

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
        TimeFromDisabled={localUiSchema?.TimeFromDisabled as unknown as boolean}
        TimeToDisabled={localUiSchema?.TimeToDisabled as unknown as boolean}
      />
    </div>
  )
}

export default TimeFromToWidgetRJSF

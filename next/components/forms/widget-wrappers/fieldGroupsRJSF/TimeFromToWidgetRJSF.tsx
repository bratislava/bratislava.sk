import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { TimeFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import { FormSpacingType } from '../../types/WidgetOptions'
import WidgetWrapper, { isFormSpacingType } from '../WidgetWrapper'

const TimeFromToWidgetRJSF = ({
  formData,
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

  const getFormSpacingType = (
    formSpacingType: 'spaceTop' | 'spaceBottom',
  ): FormSpacingType | undefined => {
    const formSpacingTypeVariant = localUiSchema?.[formSpacingType]
    return typeof formSpacingTypeVariant === 'string' && isFormSpacingType(formSpacingTypeVariant)
      ? formSpacingTypeVariant
      : undefined
  }

  // TODO: fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => errorSchema?.[propKey]?.__errors || []

  return (
    <WidgetWrapper
      accordion={uiSchema?.['ui:accordion']}
      spaceTop={getFormSpacingType('spaceTop')}
      spaceBottom={getFormSpacingType('spaceBottom')}
    >
      <div className={localUiSchema?.className as string}>
        <TimeFromTo
          TimeToTooltip={localUiSchema?.TimeToTooltip as string}
          TimeFromTooltip={localUiSchema?.TimeFromTooltip as string}
          TimeFromDescription={localUiSchema?.TimeFromDescription as string}
          TimeToDescription={localUiSchema?.TimeToDescription as string}
          TimeFromRequired={schema.required?.includes('startTime')}
          TimeToRequired={schema.required?.includes('endTime')}
          TimeFromErrorMessage={getErrorMessage('startTime')}
          TimeToErrorMessage={getErrorMessage('endTime')}
          TimeFromExplicitOptional={localUiSchema?.TimeFromExplicitOptional as ExplicitOptionalType}
          TimeToExplicitOptional={localUiSchema?.TimeToExplicitOptional as ExplicitOptionalType}
          TimeFromOnChange={(e) => handleOnChange('startTime', e?.toString())}
          TimeToOnChange={(e) => handleOnChange('endTime', e?.toString())}
          TimeFromValue={formData.startTime}
          TimeToValue={formData.endTime}
          TimeFromLabel={schemaProperties?.startTime?.title}
          TimeToLabel={schemaProperties?.endTime?.title}
          TimeFromDisabled={localUiSchema?.TimeFromDisabled as unknown as boolean}
          TimeToDisabled={localUiSchema?.TimeToDisabled as unknown as boolean}
        />
      </div>
    </WidgetWrapper>
  )
}

export default TimeFromToWidgetRJSF

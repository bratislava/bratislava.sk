import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateFromTo } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import { FormSpacingType } from '../../types/WidgetOptions'
import WidgetWrapper, { isFormSpacingType } from '../WidgetWrapper'

const DateFromToWidgetRJSF = ({
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
      [valueName]: newValue,
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

  // TODO fix this code block. Re check what kind of error message it returns and fix in a new way according new task
  const getErrorMessage = (propKey: string): string[] => errorSchema?.[propKey]?.__errors || []

  return (
    <WidgetWrapper
      accordion={uiSchema?.['ui:accordion']}
      spaceTop={getFormSpacingType('spaceTop')}
      spaceBottom={getFormSpacingType('spaceBottom')}
    >
      <div className={localUiSchema?.className as string}>
        <DateFromTo
          DateToTooltip={localUiSchema?.DateToTooltip as string}
          DateFromTooltip={localUiSchema?.DateFromTooltip as string}
          DateFromRequired={schema.required?.includes('startDate')}
          DateToRequired={schema.required?.includes('endDate')}
          DateFromErrorMessage={getErrorMessage('startDate')}
          DateToErrorMessage={getErrorMessage('endDate')}
          DateFromDescription={localUiSchema?.DateFromDescription as string}
          DateToDescription={localUiSchema?.DateToDescription as string}
          DateFromExplicitOptional={localUiSchema?.DateFromExplicitOptional as ExplicitOptionalType}
          DateToExplicitOptional={localUiSchema?.DateToExplicitOptional as ExplicitOptionalType}
          DateFromOnChange={(e) => handleOnChange('startDate', e?.toString())}
          DateToOnChange={(e) => handleOnChange('endDate', e?.toString())}
          DateFromValue={formData.startDate}
          DateToValue={formData.endDate}
          DateFromLabel={schemaProperties?.startDate?.title}
          DateToLabel={schemaProperties?.endDate?.title}
          DateFromDisabled={localUiSchema?.DateFromDisabled as unknown as boolean}
          DateToDisabled={localUiSchema?.DateToDisabled as unknown as boolean}
        />
      </div>
    </WidgetWrapper>
  )
}

export default DateFromToWidgetRJSF

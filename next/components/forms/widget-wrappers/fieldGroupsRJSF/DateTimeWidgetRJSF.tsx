import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DateTimePicker } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import { FormSpacingType } from '../../types/WidgetOptions'
import WidgetWrapper, { isFormSpacingType } from '../WidgetWrapper'

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
    </WidgetWrapper>
  )
}

export default DateTimeWidgetRJSF

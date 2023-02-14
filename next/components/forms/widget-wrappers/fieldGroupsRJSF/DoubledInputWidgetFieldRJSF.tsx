import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DoubledInputField } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import { FormSpacingType } from '../../types/WidgetOptions'
import {
  isInputSize,
  isLeftIconVariant,
  LeftIconVariants,
} from '../../widget-components/InputField/InputField'
import WidgetWrapper, { isFormSpacingType } from '../WidgetWrapper'

const DoubledInputWidgetFieldRJSF = ({
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

  const handleOnChange = (name: string, event?: string) => {
    onChange({
      ...formData,
      [name]: event,
    })
  }

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

  const inputType = (inputTypeName: 'FirstInputType' | 'SecondInputType') =>
    localUiSchema?.[inputTypeName] === 'password' ? 'password' : 'text'

  const getLeftIcon = (
    iconInputPropValue: 'FirstInputLeftIcon' | 'SecondInputLeftIcon',
  ): LeftIconVariants | undefined => {
    const iconVariant = localUiSchema?.[iconInputPropValue]
    return typeof iconVariant === 'string' && isLeftIconVariant(iconVariant)
      ? iconVariant
      : undefined
  }

  const getInputSize = (sizeInputPropValue: 'FirstInputSize' | 'SecondInputSize') => {
    const sizeVariant = localUiSchema?.[sizeInputPropValue]
    return typeof sizeVariant === 'string' && isInputSize(sizeVariant) ? sizeVariant : undefined
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
        <DoubledInputField
          FirstInputLabel={getLabel(0)}
          SecondInputLabel={getLabel(1)}
          FirstInputValue={formData?.[keys[0]]}
          SecondInputValue={formData?.[keys[1]]}
          FirstInputHandler={(e) => handleOnChange(keys[0], e)}
          SecondInputHandler={(e) => handleOnChange(keys[1], e)}
          FirstInputPlaceholder={localUiSchema?.FirstInputPlaceholder as string}
          SecondInputPlaceholder={localUiSchema?.SecondInputPlaceholder as string}
          FirstInputTooltip={localUiSchema?.FirstInputTooltip as string}
          SecondInputTooltip={localUiSchema?.SecondInputTooltip as string}
          FirstInputDescription={localUiSchema?.FirstInputDescription as string}
          SecondInputDescription={localUiSchema?.SecondInputDescription as string}
          FirstInputType={inputType('FirstInputType')}
          SecondInputType={inputType('SecondInputType')}
          FirstInputRequired={schema.required?.includes(keys[0])}
          SecondInputRequired={schema.required?.includes(keys[1])}
          FirstInputLeftIcon={getLeftIcon('FirstInputLeftIcon')}
          SecondInputLeftIcon={getLeftIcon('SecondInputLeftIcon')}
          FirstInputExplicitOptional={
            localUiSchema?.FirstInputExplicitOptional as ExplicitOptionalType
          }
          SecondInputExplicitOptional={
            localUiSchema?.SecondInputExplicitOptional as ExplicitOptionalType
          }
          FirstInputResetIcon={localUiSchema?.FirstInputResetIcon as unknown as boolean}
          SecondInputResetIcon={localUiSchema?.SecondInputResetIcon as unknown as boolean}
          FirstInputClassNames={localUiSchema?.FirstInputClassNames as string}
          SecondInputClassNames={localUiSchema?.SecondInputClassNames as string}
          FirstInputErrorMessage={getErrorMessage(keys[0])}
          SecondInputErrorMessage={getErrorMessage(keys[1])}
          FirstInputDisabled={localUiSchema?.FirstInputDisabled as unknown as boolean}
          SecondInputDisabled={localUiSchema?.SecondInputDisabled as unknown as boolean}
          FirstInputSize={getInputSize('FirstInputSize')}
          SecondInputSize={getInputSize('SecondInputSize')}
        />
      </div>
    </WidgetWrapper>
  )
}
export default DoubledInputWidgetFieldRJSF

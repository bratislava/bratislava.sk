import { FieldProps } from '@rjsf/utils'
import React from 'react'

import { DoubledInputField } from '../../groups'
import { isLeftIconVariant, LeftIconVariants } from '../../widget-components/InputField/InputField'

const DoubledInputWidgetFieldRJSF = ({
  formData,
  onChange,
  schema,
  uiSchema,
  rawErrors = [],
}: FieldProps) => {
  const keys = Object.keys({ ...schema.properties })
  const uiSchemaObject = {
    ...(uiSchema && (uiSchema['ui:options'] as Record<string, string | number | boolean>)),
  }
  const schemaProperties = {
    ...(schema.properties as Record<string, { type: string; title: string }>),
  }
  const handleOnChange = (name: string, event?: string) => {
    onChange({
      ...formData,
      [name]: event,
    })
  }

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]].title

  const inputType = (inputTypeName: 'FirstInputType' | 'SecondInputType') => {
    const type = uiSchemaObject[inputTypeName]
    if (type !== 'text' && type !== 'password') {
      return 'text'
    }
    return type
  }

  const getLeftIcon = (
    iconInputPropValue: 'FirstInputLeftIcon' | 'SecondInputLeftIcon',
  ): LeftIconVariants | undefined => {
    const iconVariant = uiSchemaObject[iconInputPropValue]
    return typeof iconVariant === 'string' && isLeftIconVariant(iconVariant)
      ? iconVariant
      : undefined
  }

  const getUIProp = (uiPropName: string): string | number | boolean => {
    return uiSchemaObject[uiPropName]
  }

  const requiredField = (propKey: string) => schema.required?.includes(propKey)

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
      <DoubledInputField
        FirstInputLabel={getLabel(0)}
        SecondInputLabel={getLabel(1)}
        FirstInputValue={formData[keys[0]]}
        SecondInputValue={formData[keys[1]]}
        FirstInputHandler={(e) => handleOnChange(keys[0], e)}
        SecondInputHandler={(e) => handleOnChange(keys[1], e)}
        FirstInputPlaceholder={getUIProp('FirstInputPlaceholder') as string}
        SecondInputPlaceholder={getUIProp('SecondInputPlaceholder') as string}
        FirstInputTooltip={getUIProp('FirstInputTooltip') as string}
        SecondInputTooltip={getUIProp('SecondInputTooltip') as string}
        FirstInputDescription={getUIProp('FirstInputDescription') as string}
        SecondInputDescription={getUIProp('SecondInputDescription') as string}
        FirstInputType={inputType('FirstInputType')}
        SecondInputType={inputType('SecondInputType')}
        FirstInputRequired={requiredField(keys[0])}
        SecondInputRequired={requiredField(keys[1])}
        FirstInputLeftIcon={getLeftIcon('FirstInputLeftIcon')}
        SecondInputLeftIcon={getLeftIcon('SecondInputLeftIcon')}
        FirstInputExplicitOptional={getUIProp('FirstInputExplicitOptional') as unknown as boolean}
        SecondInputExplicitOptional={getUIProp('SecondInputExplicitOptional') as unknown as boolean}
        FirstInputResetIcon={getUIProp('FirstInputResetIcon') as unknown as boolean}
        SecondInputResetIcon={getUIProp('SecondInputResetIcon') as unknown as boolean}
        FirstInputClassNames={getUIProp('FirstInputClassNames') as string}
        SecondInputClassNames={getUIProp('SecondInputClassNames') as string}
        FirstInputErrorMessage={getErrorMessage(keys[0])}
        SecondInputErrorMessage={getErrorMessage(keys[1])}
      />
    </div>
  )
}
export default DoubledInputWidgetFieldRJSF

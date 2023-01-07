import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React, { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputSelectGroup } from '../../groups'
import { LeftIconVariants } from '../../widget-components/InputField/InputField'

const uiOptions = 'ui:options'
const InputSelectGroupWidgetFieldRJSF = (props: FieldProps) => {
  const { formData, onChange, schema, uiSchema } = props
  const [keys] = useState(
    Object.keys(
      {
        ...(schema.items as Record<string, string>),
      }?.properties,
    ),
  )

  const [fieldGroups, setFieldGroups] = useState<mainObjectType[]>([])

  const type =
    {
      ...({
        ...({
          ...(schema.items as Record<string, string>),
        }?.properties as unknown as Record<string, string>),
      }[keys[1]] as unknown as Record<string, string>),
    }.type === 'array'
      ? 'multiple'
      : 'one'

  const enumOptions = {
    ...({
      ...({
        ...(schema.items as Record<string, string>),
      }?.properties as unknown as Record<string, string>),
    }[keys[1]] as unknown as Record<string, Array<EnumOptionsType>>),
  }.oneOf

  type mainObjectType = {
    id: string
    [key: string]: string | string[] | EnumOptionsType[] | EnumOptionsType[][]
  }

  type TransformDataType = {
    mainObj: mainObjectType
    enumValues: EnumOptionsType[]
  }

  type SingleDataTransform = {
    mainObj: mainObjectType
    enumValues: EnumOptionsType
  }

  const handleTransformOne = (): SingleDataTransform[] => {
    // have a problem while doing this with spread operator, so another easy way was to use stringify -> parse. Problem: [...formData]
    const valueData: mainObjectType[] = JSON.parse(JSON.stringify(formData))
    return valueData.map((value: mainObjectType) => {
      const enumValues: EnumOptionsType[] = []
      enumOptions.forEach((enums: EnumOptionsType) => {
        if (enums.value === value[keys[1]]) {
          enumValues.push(enums)
        }
      })
      return { mainObj: value, enumValues: enumValues[0] }
    })
  }

  const handleTransformMultiple = (): TransformDataType[] => {
    if (Array.isArray(formData)) {
      // have a problem while doing this with spread operator, so another easy way was to use stringify -> parse. Problem: [...formData]
      const valueData: mainObjectType[] = JSON.parse(JSON.stringify(formData))
      return valueData.map((value: mainObjectType) => {
        const enumValues: EnumOptionsType[] = []
        enumOptions.forEach((enums: EnumOptionsType) => {
          if (value[keys[1]].includes(enums.value)) {
            enumValues.push(enums)
          }
        })
        return { mainObj: value, enumValues }
      })
    }
    return []
  }

  const getTransformMultipleData = (): mainObjectType[] => {
    // have a problem while doing this with spread operator, so another easy way was to use stringify -> parse. Problem: [...formData]
    const valueData: TransformDataType[] = JSON.parse(JSON.stringify(handleTransformMultiple()))
    return valueData.map((value: TransformDataType) => {
      // just to avoid ESLINT rule: no-param-reassign
      const newValue: TransformDataType = value
      newValue.mainObj[keys[1]] = value.enumValues
      return { ...newValue.mainObj }
    })
  }

  const getTransformSingleData = (): mainObjectType[] => {
    // have a problem while doing this with spread operator, so another easy way was to use stringify -> parse. Problem: [...formData]
    const valueData: TransformDataType[] = JSON.parse(JSON.stringify(handleTransformOne()))
    return valueData.map((value: TransformDataType) => {
      // just to avoid ESLINT rule: no-param-reassign
      const newValue: TransformDataType = value
      newValue.mainObj[keys[1]] = value.enumValues ? [value.enumValues] : ''
      return { ...newValue.mainObj }
    })
  }

  const transformValue = (): mainObjectType[] => {
    return type === 'multiple' ? getTransformMultipleData() : getTransformSingleData()
  }

  useEffectOnce(() => {
    if (!formData) {
      setFieldGroups(
        fieldGroups.concat({
          [keys[0]]: '',
          [keys[1]]: type === 'multiple' ? [] : '',
          id: uuidv4(),
        }),
      )
      setFieldGroups((prev: mainObjectType[]) => {
        // to avoid render warning
        setTimeout(() => {
          onChange(prev)
        }, 0)
        return prev
      })
    } else {
      setFieldGroups(transformValue())
    }
  })

  const getUIProp = (uiPropName: string) => {
    return {
      ...(uiSchema && (uiSchema[uiOptions] as Record<string, string>)),
    }[uiPropName]
  }

  const isLeftIconVariant = (val: string): val is LeftIconVariants => {
    const list: LeftIconVariants[] = ['person', 'mail', 'call', 'lock']
    return list.includes(val as LeftIconVariants)
  }

  const getLeftIcon = (iconInput: 'InputLeftIcon'): LeftIconVariants | undefined => {
    const iconVariant = {
      ...(uiSchema && (uiSchema[uiOptions] as Record<string, string>)),
    }[iconInput]
    return isLeftIconVariant(iconVariant) ? iconVariant : undefined
  }

  const requiredField = (propKey: string) => {
    return schema.required?.includes(propKey)
  }

  return (
    <div>
      {fieldGroups.length > 0 && Array.isArray(formData) && formData.length > 0 && (
        <InputSelectGroup
          SelectLabel={getUIProp('SelectLabel')}
          InputLabel={getUIProp('InputLabel')}
          InputTooltip={getUIProp('InputTooltip')}
          SelectTooltip={getUIProp('SelectTooltip')}
          InputPlaceholder={getUIProp('InputPlaceholder')}
          SelectPlaceholder={getUIProp('SelectPlaceholder')}
          InputDescription={getUIProp('InputDescription')}
          SelectDescription={getUIProp('SelectDescription')}
          InputLeftIcon={getLeftIcon('InputLeftIcon')}
          InputResetIcon={getUIProp('InputResetIcon') as unknown as boolean}
          InputRequired={requiredField(keys[0])}
          SelectRequired={requiredField(keys[1])}
          SelectDropdownDivider={getUIProp('SelectDropdownDivider') as unknown as boolean}
          SelectSelectAllOption={getUIProp('SelectSelectAllOption') as unknown as boolean}
          SelectExplicitOptional={getUIProp('SelectExplicitOptional') as unknown as boolean}
          InputClassName="sm:w-[150px]"
          SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
          SelectClassName="sm:w-[400px]"
          SelectType={type}
          addNew={getUIProp('addNew') ?? 'Add next'}
          groupValues={fieldGroups}
          formDataArray={formData ?? []}
          saveFormData={onChange}
          propKeys={keys}
        />
      )}
    </div>
  )
}

export default InputSelectGroupWidgetFieldRJSF

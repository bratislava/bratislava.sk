import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React, { useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputSelectGroup } from '../../groups'

const InputSelectGroupWidgetFieldRJSF = (props: FieldProps) => {
  const { formData, onChange, schema } = props
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

  return (
    <div>
      {fieldGroups.length > 0 && Array.isArray(formData) && formData.length > 0 && (
        <InputSelectGroup
          SelectLabel="Interval odvozu"
          InputLabel="Počet"
          InputTooltip="Some Tooltip"
          InputClassName="sm:w-[150px]"
          SelectPlaceholder="Vybrať"
          SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
          SelectClassName="sm:w-[400px]"
          SelectType={type}
          addNew="Pridať ďalší riadok"
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

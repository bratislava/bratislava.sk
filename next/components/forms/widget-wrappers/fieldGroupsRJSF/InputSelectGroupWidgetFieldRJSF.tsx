import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputSelectGroup } from '../../groups'
import { isLeftIconVariant, LeftIconVariants } from '../../widget-components/InputField/InputField'

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

const InputSelectGroupWidgetFieldRJSF = ({
  formData = [],
  onChange,
  schema,
  uiSchema,
}: FieldProps) => {
  const keys = Object.keys(
    {
      ...(schema.items as Record<string, string>),
    }?.properties,
  )

  const uiSchemaObject = {
    ...(uiSchema && (uiSchema['ui:options'] as Record<string, string | number | boolean>)),
  }

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

  // default value for rendering component
  const firstDataRow = [
    {
      [keys[0]]: '',
      [keys[1]]: type === 'multiple' ? [] : '',
      id: uuidv4(),
    },
  ]

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

    // checking if array object is empty, if yes -> return first row of data, as a default value
    if (valueData.length === 0) {
      return firstDataRow
    }
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

    // checking if array object is empty, if yes -> return first row of data, as a default value
    if (valueData.length === 0) {
      return firstDataRow
    }
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
    // checking if array object is empty, if yes -> add first row of data, as a default value
    if ((formData as mainObjectType[]).length === 0) {
      onChange(firstDataRow)
    }
  })

  const getUIProp = (uiPropName: string) => uiSchemaObject[uiPropName]

  const getLeftIcon = (iconInput: 'InputLeftIcon'): LeftIconVariants | undefined => {
    const iconVariant = uiSchemaObject[iconInput]
    return typeof iconVariant === 'string' && isLeftIconVariant(iconVariant)
      ? iconVariant
      : undefined
  }

  const requiredField = (propKey: string) => schema.required?.includes(propKey)

  const handleOnChangeMultiple = (newValue: EnumOptionsType[]) =>
    newValue.map((option: EnumOptionsType) => option.value)

  const handleOnChangeOne = (newValue: EnumOptionsType[]) =>
    newValue[0] ? newValue[0]?.value : null

  const updateState = (
    index: number,
    propIndex: 0 | 1,
    e: string | undefined | EnumOptionsType[],
  ) => {
    let newValue = e
    if (Array.isArray(e)) {
      newValue = type === 'multiple' ? handleOnChangeMultiple(e) : handleOnChangeOne(e)
    }
    const a = (formData as mainObjectType[]).map((item: mainObjectType, i: number) => {
      return index === i ? { ...item, [keys[propIndex]]: newValue } : item
    })
    onChange(a)
  }

  const addField = () => {
    const newFieldData = (formData as mainObjectType[]).concat({
      [keys[0]]: '',
      [keys[1]]: type === 'multiple' ? [] : '',
      id: uuidv4(),
    })
    onChange(newFieldData)
  }

  const removeField = (id: string) => {
    const newFieldData = (formData as mainObjectType[]).filter((element) => element.id !== id)
    onChange(newFieldData)
  }

  return (
    <div>
      <InputSelectGroup
        SelectLabel={getUIProp('SelectLabel') as string}
        InputLabel={getUIProp('InputLabel') as string}
        InputTooltip={getUIProp('InputTooltip') as string}
        SelectTooltip={getUIProp('SelectTooltip') as string}
        InputPlaceholder={getUIProp('InputPlaceholder') as string}
        SelectPlaceholder={getUIProp('SelectPlaceholder') as string}
        InputDescription={getUIProp('InputDescription') as string}
        SelectDescription={getUIProp('SelectDescription') as string}
        InputLeftIcon={getLeftIcon('InputLeftIcon')}
        InputResetIcon={getUIProp('InputResetIcon') as unknown as boolean}
        InputRequired={requiredField(keys[0])}
        SelectRequired={requiredField(keys[1])}
        SelectDropdownDivider={getUIProp('SelectDropdownDivider') as unknown as boolean}
        SelectSelectAllOption={getUIProp('SelectSelectAllOption') as unknown as boolean}
        SelectExplicitOptional={getUIProp('SelectExplicitOptional') as unknown as boolean}
        InputOnChange={updateState}
        SelectOnChange={updateState}
        InputClassName="sm:w-[150px]"
        SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
        SelectClassName="sm:w-[400px]"
        SelectType={type}
        addNew={(getUIProp('addNew') as string) ?? 'Add next'}
        groupValues={transformValue()}
        addField={addField}
        removeField={removeField}
        propKeys={keys}
      />
    </div>
  )
}

export default InputSelectGroupWidgetFieldRJSF

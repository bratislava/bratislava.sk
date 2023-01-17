import { EnumOptionsType, FieldProps } from '@rjsf/utils'
import React from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

import { InputSelectGroup } from '../../groups'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
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
  const schemaProperties = {
    ...({
      ...(schema.items as Record<string, string>),
    }?.properties as unknown as Record<string, { title: string; type: string }>),
  }
  const keys = Object.keys(schemaProperties)
  const localUiSchema = uiSchema?.['ui:options']

  const type = schemaProperties[keys[1]].type === 'array' ? 'multiple' : 'one'

  const enumOptions = {
    ...(schemaProperties[keys[1]] as unknown as Record<string, Array<EnumOptionsType>>),
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
    // DO NOT CHANGE THIS JSON PARSE STRINGIFY LOGIC, IT WORKS VERY STRANGE, ANY OTHER LIBRARIES/WAYS TO COPY OBJECT DON'T WORK
    // FOR SOME REASON IF WE WANT USE DIRECTLY handleTransformMultiple FUNCTION RESULT, WE WILL GET SELECT OBJECT DATA ARRAY ONLY WITH VALUE PROPERTIES,
    // I DON'T KNOW HOW, BUT IF WE ARE DOING (JSON PARSE STRINGIFY) LOGIC IT RETURNS AN OBJECT WITH {title: string, selectField: PROP<type>}
    // I FOUND THE SAME LOGIC IN upload-file.ts, SO IT'S OK TO USE THIS METHOD
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
    // DO NOT CHANGE THIS JSON PARSE STRINGIFY LOGIC, IT WORKS VERY STRANGE, ANY OTHER LIBRARIES/WAYS TO COPY OBJECT DON'T WORK
    // FOR SOME REASON IF WE WANT USE DIRECTLY handleTransformMultiple FUNCTION RESULT, WE WILL GET SELECT OBJECT DATA ARRAY ONLY WITH VALUE PROPERTIES,
    // I DON'T KNOW HOW, BUT IF WE ARE DOING (JSON PARSE STRINGIFY) LOGIC IT RETURNS AN OBJECT WITH {title: string, selectField: PROP<type>}
    // I FOUND THE SAME LOGIC IN upload-file.ts, SO IT'S OK TO USE THIS METHOD
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

  const getLeftIcon = (iconInput: 'InputLeftIcon'): LeftIconVariants | undefined => {
    const iconVariant = localUiSchema?.[iconInput]
    return typeof iconVariant === 'string' && isLeftIconVariant(iconVariant)
      ? iconVariant
      : undefined
  }

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
    const updatedState = (formData as mainObjectType[]).map((item: mainObjectType, i: number) => {
      return index === i ? { ...item, [keys[propIndex]]: newValue } : item
    })
    onChange(updatedState)
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

  const getLabel = (index: 0 | 1) => schemaProperties[keys[index]]?.title

  return (
    <div>
      <InputSelectGroup
        SelectLabel={getLabel(1)}
        InputLabel={getLabel(0)}
        InputTooltip={localUiSchema?.InputTooltip as string}
        SelectTooltip={localUiSchema?.SelectTooltip as string}
        InputPlaceholder={localUiSchema?.InputPlaceholder as string}
        SelectPlaceholder={localUiSchema?.SelectPlaceholder as string}
        InputDescription={localUiSchema?.InputDescription as string}
        SelectDescription={localUiSchema?.SelectDescription as string}
        InputLeftIcon={getLeftIcon('InputLeftIcon')}
        InputResetIcon={localUiSchema?.InputResetIcon as unknown as boolean}
        InputRequired={schema.required?.includes(keys[0])}
        SelectRequired={schema.required?.includes(keys[1])}
        SelectDropdownDivider={localUiSchema?.SelectDropdownDivider as unknown as boolean}
        SelectSelectAllOption={localUiSchema?.SelectSelectAllOption as unknown as boolean}
        SelectExplicitOptional={localUiSchema?.SelectExplicitOptional as ExplicitOptionalType}
        InputExplicitOptional={localUiSchema?.InputExplicitOptional as ExplicitOptionalType}
        InputOnChange={updateState}
        SelectOnChange={updateState}
        InputClassName={localUiSchema?.InputClassName as string}
        SelectEnumOptions={enumOptions as unknown as EnumOptionsType[]}
        SelectClassName={localUiSchema?.SelectClassName as string}
        SelectType={type}
        addNew={(localUiSchema?.addNew as string) ?? 'Add next'}
        groupValues={transformValue()}
        addField={addField}
        removeField={removeField}
        propKeys={keys}
      />
    </div>
  )
}

export default InputSelectGroupWidgetFieldRJSF

import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { useState } from 'react'

import SelectField from '../SelectField/SelectField'

type SelectRJSFOptions = {
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  // selectType?: 'one' | 'multiple' | 'arrow' | 'radio'
  description?: string
  className?: string
}

interface SelectFieldWidgetRJSFProps extends WidgetProps{
  label: string
  options: SelectRJSFOptions
  value: any|any[]
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value: any|any[]) => void;
}

const SelectFieldWidgetRJSF = (props: SelectFieldWidgetRJSFProps) => {
  const {
    label,
    options,
    value,
    errorMessage,
    required,
    disabled,
    placeholder,
    schema,
    onChange
  } = props
  const {
    enumOptions,
    selectAllOption,
    description,
    tooltip,
    dropdownDivider,
    className
  } = options

  const type = schema.type === "array" ? "multiple" : "one"

  const handleOnChangeMultiple = (newValue: EnumOptionsType[]) => {
    const optionValues: any[] = newValue.map(option => option.value)
    onChange(optionValues)
  }

  const handleOnChangeOne = (newValue: EnumOptionsType[]) => {
    if (newValue[0]) {
      onChange(newValue[0].value)
    } else {
      onChange(null)
    }
  }

  const handleOnChange = (newValue: EnumOptionsType[]) => {
    if (type === "multiple") {
      handleOnChangeMultiple(newValue)
    } else {
      handleOnChangeOne(newValue)
    }
  }

  const handleTransformOne = (): EnumOptionsType[] => {
    const transformedValue: EnumOptionsType[] = []
    if (!enumOptions || Array.isArray(value)) return transformedValue

    for (const option of enumOptions) {
      if (option.value === value) {
        transformedValue.push(option)
        break
      }
    }
    return transformedValue
  }

  const handleTransformMultiple = (): EnumOptionsType[] => {
    const transformedValue: EnumOptionsType[] = []
    if (!enumOptions || !Array.isArray(value)) return transformedValue

    value.forEach(optionValue => {
      enumOptions.forEach(option => {
        if (option.value === optionValue) {
          transformedValue.push(option)
        }
      })
    })

    return transformedValue
  }

  const transformValue = (): EnumOptionsType[] => {
    return type === "multiple" ? handleTransformMultiple() : handleTransformOne()
  }

  return <SelectField type={type} label={label} enumOptions={enumOptions} value={transformValue()}
                      selectAllOption={selectAllOption} placeholder={placeholder} description={description}
                      tooltip={tooltip} dropdownDivider={dropdownDivider} errorMessage={errorMessage}
                      required={required} disabled={disabled} className={className} onChange={handleOnChange} />
}

export default SelectFieldWidgetRJSF

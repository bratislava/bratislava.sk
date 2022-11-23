import { EnumOptionsType, StrictRJSFSchema, WidgetProps } from '@rjsf/utils'

import SelectField from '../SelectField/SelectField'
import { useState } from 'react'

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
  value: string|string[]
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value: string|string[]) => void;
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
  const [innerValue, setInnerValue] = useState<EnumOptionsType[]>([])

  const handleOnChangeMultiple = (newValue: EnumOptionsType[]) => {
    const optionValues: string[] = newValue.map(option => option.value as string)
    onChange(optionValues)
  }

  const handleOnChangeOne = (newValue: EnumOptionsType[]) => {
    if (newValue[0]) {
      onChange(newValue[0].value as string)
    } else {
      onChange("")
    }
  }

  const handleOnChange = (newValue: EnumOptionsType[]) => {
    setInnerValue(newValue)
    if (type === "multiple") {
      handleOnChangeMultiple(newValue)
    } else {
      handleOnChangeOne(newValue)
    }
  }


  return <SelectField type={type} label={label} enumOptions={enumOptions} value={innerValue}
                      selectAllOption={selectAllOption} placeholder={placeholder} description={description}
                      tooltip={tooltip} dropdownDivider={dropdownDivider} errorMessage={errorMessage}
                      required={required} disabled={disabled} className={className} onChange={handleOnChange} />
}

export default SelectFieldWidgetRJSF

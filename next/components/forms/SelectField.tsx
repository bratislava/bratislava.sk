import cx from 'classnames'
import React, { FC } from 'react'
import Select, {
  ControlProps,
  CSSObjectWithLabel, DropdownIndicatorProps, MultiValue, MultiValueRemoveProps,
  OptionProps,
  StylesConfig,
} from 'react-select'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface SelectFieldProps {
  label: string
  name: string
  options: MultiValue<unknown>
  value?: MultiValue<unknown>
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
  optional?: boolean
  onChange?: (values: MultiValue<unknown>) => void;
}

const SelectField: FC<SelectFieldProps> = (
  {
    label,
    name,
    options,
    value,
    placeholder,
    errorMessage,
    description,
    required,
    disabled,
    tooltip,
    optional,
    onChange
  }
) => {
  // EVENT HANDLERS
  const handleOnChangeSelect = (selectedOptions: MultiValue<unknown>) => {
    if (onChange) {
      onChange(selectedOptions)
    }
  }

  // STYLES
  const tailwindSelectStyle = cx(
    'w-full text-default rounded-lg focus:outline-none bg-white border-2 ',
    {
      // disabled
      'opacity-50': disabled,
    }
  )

  const selectStyle: StylesConfig = {
    control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
      ...provided,
      borderRadius: 6,
      boxShadow: 'none',
      borderWidth: '2px',
      borderColor: errorMessage ? 'red' : state.isFocused ? 'black' : 'lightgray',
      '&:hover': {
        borderColor: errorMessage ? 'red' : 'black',
      },
      padding: '5px 0'
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : undefined,
      cursor: 'pointer'
    }),
    multiValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderRadius: 8
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: placeholder ? provided.color : "transparent"
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel, state:DropdownIndicatorProps) => ({
      ...provided,
      transition: 'all .2s linear',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
      cursor: 'pointer',
      color: '#333333'
    }),
    multiValueRemove: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      '&:hover': {
        backgroundColor: 'inherit',
        color: '#333333'
      },
    }),
    clearIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      cursor: 'pointer'
    })
  }

  // RENDER
  return (
    <section className="flex w-max flex-col">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} htmlFor={name}
                   description={description} optional={optional}
                   required={required} tooltip={tooltip} />

      {/* SELECT PART */}
      <div className="w-80">
        <Select className={tailwindSelectStyle} styles={selectStyle}
                options={options} noOptionsMessage={() => "No Options"}
                placeholder={placeholder} value={value}
                isDisabled={disabled} isMulti onChange={handleOnChangeSelect}/>
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}



export default SelectField;

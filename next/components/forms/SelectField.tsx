import cx from 'classnames'
import React, { forwardRef, RefObject } from 'react'
import { useTextField } from 'react-aria'
import Select, {
  ControlProps,
  CSSObjectWithLabel, DropdownIndicatorProps, MultiValue,
  OptionProps,
  StylesConfig,
} from 'react-select'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface SelectProps {
  label: string
  name: string
  options: MultiValue<unknown>
  value?: MultiValue<unknown>
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  tooltip?: boolean
  onChangeSelected?: (values: MultiValue<unknown>) => void;
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  // REACT-ARIA
  const { labelProps, descriptionProps, errorMessageProps } = useTextField(
    {
      name: props.name,
      placeholder: props.placeholder,
      isRequired: props.required,
      isReadOnly: props.disabled,
    },
    ref as RefObject<HTMLInputElement>
  )

  // EVENT HANDLERS
  const handleOnChangeSelect = (selectedOptions: MultiValue<unknown>) => {
    if (props.onChangeSelected) {
      props.onChangeSelected(selectedOptions)
    }
  }

  // STYLES
  const tailwindSelectStyle = cx(
    'w-full text-default rounded-lg focus:outline-none bg-white border-2 ',
    {
      // disabled
      'opacity-50': props.disabled,
    }
  )

  const selectStyle: StylesConfig = {
    control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
      ...provided,
      borderRadius: 6,
      boxShadow: 'none',
      borderWidth: '2px',
      borderColor: props.errorMessage ? 'red' : state.isFocused ? 'black' : 'lightgray',
      '&:hover': {
        borderColor: props.errorMessage ? 'red' : 'black',
      },
      padding: '5px 0'
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : undefined,
    }),
    multiValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      borderRadius: 8
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: props.placeholder ? provided.color : "transparent"
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
      borderTopRightRadius: 8
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
      <FieldHeader label={props.label} htmlFor={props.name}
                   description={props.description} required={props.required} tooltip={props.tooltip}
                   descriptionProps={descriptionProps} labelProps={labelProps}/>

      {/* SELECT PART */}
      <div className="w-80">
        <Select className={tailwindSelectStyle} styles={selectStyle}
                options={props.options} noOptionsMessage={() => "No Options"}
                placeholder={props.placeholder} value={props.value}
                isDisabled={props.disabled} isMulti onChange={handleOnChangeSelect}/>
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={props.errorMessage} errorMessageProps={errorMessageProps} />
    </section>
  )
})



export default SelectField;

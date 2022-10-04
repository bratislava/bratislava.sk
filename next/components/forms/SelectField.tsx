import cx from 'classnames'
import React, { CSSProperties, forwardRef, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'
import Select, { ControlProps, CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig } from 'react-select'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  label: string
  name: string
  options: Option[]
  value?: string
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  tooltip?: boolean
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  // STATE
  const [ valueState, setValueState ] = useState<string>(props.value || '')

  // EVENT HANDLERS
  const onInputChange = (value: string) => {
    setValueState(value)
  }

  // REACT-ARIA
  const { labelProps, descriptionProps, errorMessageProps } = useTextField(
    {
      name: props.name,
      placeholder: props.placeholder,
      value: valueState,
      isRequired: props.required,
      isReadOnly: props.disabled,
      onChange: onInputChange,
    },
    ref as RefObject<HTMLInputElement>
  )

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
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightgray' : undefined,
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
                options={props.options} placeholder={props.placeholder}
                menuPlacement="auto" menuPosition="fixed"
                isDisabled={props.disabled} isMulti />
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={props.errorMessage} errorMessageProps={errorMessageProps} />
    </section>
  )
})



export default SelectField;

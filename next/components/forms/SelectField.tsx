import cx from 'classnames'
import React, { forwardRef, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'
import Select from 'react-select'

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
    'w-full text-default rounded-lg focus:outline-none bg-white border-2 border-universal-gray-200 caret-universal-gray-800 focus:border-universal-gray-800',
    {
      // hover
      'hover:border-universal-gray-500': !props.disabled,
      // error
      'border-red-brick hover:border-red-brick focus:border-error': props.errorMessage,
      // disabled
      'opacity-50': props.disabled,
    }
  )

  // RENDER
  return (
    <section className="flex w-max flex-col">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={props.label} htmlFor={props.name}
                   description={props.description} required={props.required} tooltip={props.tooltip}
                   descriptionProps={descriptionProps} labelProps={labelProps}/>

      {/* SELECT PART */}
      <div className="w-80">
        <Select options={props.options} placeholder={props.placeholder}
                menuPlacement="auto" menuPosition="fixed" isMulti
                className={tailwindSelectStyle} isDisabled={props.disabled}/>
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={props.errorMessage} errorMessageProps={errorMessageProps} />
    </section>
  )
})



export default SelectField;

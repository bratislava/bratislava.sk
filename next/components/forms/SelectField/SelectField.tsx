import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useId } from 'react'
import { MultiValue, } from 'react-select'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'
import Select from 'react-select/base'
import SelectFieldBox from './SelectFieldBox'
import SelectOption from './SelectOption'

interface SelectFieldProps {
  label: string
  name: string
  options: SelectOption[]
  value?: SelectOption[]
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (values: SelectOption[]) => void;
}

const SelectFieldComponent: ForwardRefRenderFunction<Select, SelectFieldProps>
  = (props: SelectFieldProps, ref: ForwardedRef<Select>) => {
  // PROPS
  const {
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
    onChange
  } = props

  // EVENT HANDLERS
  const handleOnChangeSelect = (selectedOptions: SelectOption[]) => {
    if (onChange) {
      onChange(selectedOptions)
    }
  }


  // RENDER
  return (
    <section className="flex w-max flex-col">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} htmlFor={name}
                   description={description} tooltip={tooltip}
                   required={required}  />

      {/* SELECT PART */}
      <div className="flex flex-row w-80 h-14 bg-gray-100 rounded-lg">
        <SelectFieldBox/>
        <div>

        </div>
      </div>
      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}


const SelectField = forwardRef<Select, SelectFieldProps>(SelectFieldComponent)
export default SelectField;

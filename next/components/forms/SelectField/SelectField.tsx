import ArrowDown from '@assets/images/forms/chevron-down.svg'
import ArrowUp from '@assets/images/forms/chevron-up.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useId, useState } from 'react'
import Select from 'react-select/base'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'
import SelectFieldBox from './SelectFieldBox'
import SelectOption from './SelectOption'

interface SelectFieldProps {
  label: string
  options: SelectOption[]
  value?: SelectOption[]
  multiple?: boolean
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
    options,
    value,
    multiple,
    placeholder,
    errorMessage,
    description,
    required,
    disabled,
    tooltip,
    onChange
  } = props

  // STATE
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false)

  // EVENT HANDLERS
  const handleOnChangeSelect = (selectedOptions: SelectOption[]) => {
    if (onChange) {
      onChange(selectedOptions)
    }
  }

  const handleOnRemove = (optionId: number) => {
    const newValue =  value ? [...value] : []
    newValue.splice(optionId, 1)
    handleOnChangeSelect(newValue)
  }

  // RENDER
  return (
    <section className="flex w-max flex-col transition-all">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} description={description} tooltip={tooltip} required={required}  />

      {/* SELECT PART */}
      <div className="flex flex-row w-80 min-h-min bg-gray-100 rounded-lg">

        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox value={value} multiple={multiple} onRemove={handleOnRemove}/>

        {/* DROPDOWN ARROW */}
        <div className="flex flex-col min-h-[56px] rounded-lg justify-center cursor-pointer px-6 select-none">
          <div onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
            { isDropdownOpened ? <ArrowUp/> : <ArrowDown/> }
          </div>
        </div>

      </div>

      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}


const SelectField = forwardRef<Select, SelectFieldProps>(SelectFieldComponent)
export default SelectField;

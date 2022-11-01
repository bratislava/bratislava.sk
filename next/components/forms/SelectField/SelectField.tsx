import ArrowDownIcon from '@assets/images/forms/chevron-down.svg'
import ArrowUpIcon from '@assets/images/forms/chevron-up.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'
import Dropdown from './Dropdown'
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
  dropdownDivider?: boolean
  onChange?: (values: SelectOption[]) => void;
}

const SelectFieldComponent: ForwardRefRenderFunction<HTMLDivElement, SelectFieldProps>
  = (props: SelectFieldProps, ref: ForwardedRef<HTMLDivElement>) => {
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
    dropdownDivider,
    onChange
  } = props

  // STATE
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>("")

  // STYLES
  const selectClassName = cx (
    "flex flex-row w-80 min-h-min bg-gray-100 rounded-lg border-2 border-form-input-default focus:border-form-input-pressed active:border-form-input-pressed",
    {
      'hover:border-form-input-hover': !disabled,
      'border-error hover:border-error focus:border-error': errorMessage && !disabled,
      'opacity-50 border-form-input-disabled': disabled,
    }
  )

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

  const handleOnChooseOne = (option: SelectOption, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([option])
  }

  const handleOnUnChooseOne = (option: SelectOption, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([])
  }

  const handleOnChooseMulti = (option: SelectOption) => {
    const newValue = value ? [...value] : []
    if (newValue.length > 0) newValue.push(option)
    handleOnChangeSelect(newValue)
  }

  const handleOnUnChooseMulti = (option: SelectOption) => {
    const newValue = value
      ? [...value].filter(valueOption => {
        return valueOption.value !== option.value
          || valueOption.label !== option.label
          || valueOption.description !== option.description
      })
      : []
    handleOnChangeSelect(newValue)
  }


  // HELPER FUNCTIONS
  const getDropdownValues = () => {
    return !multiple && value && value.length > 0
      ? [value[0]]
      : value
  }

  // RENDER
  return (
    <section className="flex w-max flex-col transition-all">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} description={description} tooltip={tooltip} required={required}  />

      {/* SELECT PART */}
      <div className={selectClassName}>

        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox value={value} multiple={multiple} filter={filter} disabled={disabled}
                        onRemove={handleOnRemove} onFilterChange={setFilter}/>

        {/* DROPDOWN ARROW */}
        <div className="flex flex-col min-h-[56px] rounded-lg justify-center px-5 select-none">
          <div onClick={() => setIsDropdownOpened(!isDropdownOpened)} className="cursor-pointer [&>svg]:m-1">
            { isDropdownOpened ? <ArrowUpIcon/> : <ArrowDownIcon/> }
          </div>
        </div>

      </div>

      {/* DROPDOWN */}
      <div className="relative">
        {
          isDropdownOpened &&
          <Dropdown options={options} value={getDropdownValues()} multiple={multiple} divider={dropdownDivider}
                    onChooseOne={handleOnChooseOne} onUnChooseOne={handleOnUnChooseOne}
                    onChooseMulti={handleOnChooseMulti} onUnChooseMulti={handleOnUnChooseMulti}  absolute/>
        }
      </div>

      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}


const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(SelectFieldComponent)
export default SelectField;

import ArrowDownIcon from '@assets/images/forms/chevron-down.svg'
import ArrowUpIcon from '@assets/images/forms/chevron-up.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useEffect, useState } from 'react'

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
  selectAllOption?: boolean
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
    selectAllOption,
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
  const dropdownRef = React.createRef<HTMLDivElement>()
  const filterRef = React.createRef<HTMLInputElement>()


  // STYLES
  const selectClassName = cx (
    "flex flex-row w-80 min-h-min bg-white rounded-lg border-2 border-form-input-default",
    {
      'hover:border-form-input-hover focus:border-form-input-pressed active:border-form-input-pressed': !disabled,
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
    setFilter("")
  }

  const handleOnUnChooseOne = (option: SelectOption, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([])
  }

  const handleOnChooseMulti = (option: SelectOption) => {
    const newValue = value ? [...value] : []
    if (value) newValue.push(option)
    handleOnChangeSelect(newValue)
    setFilter("")
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

  const handleOnDropdownArrowClick = () => {
    if (!isDropdownOpened) {
      filterRef.current?.focus()
    } else {
      setIsDropdownOpened(false)
    }
  }

  const handleOnInputFocusChange = (isFocused: boolean) => {
    setTimeout(() => {
      setIsDropdownOpened(isFocused)
    }, 50)
  }

  const handleOnDeleteLastValue = () => {
    const newValue = value ? [...value] : []
    newValue.pop()
    handleOnChangeSelect(newValue)
  }

  const handleOnSelectAll = () => {
    const newValue = [...options]
    handleOnChangeSelect(newValue)
  }

  // HELPER FUNCTIONS
  const getDropdownValues = () => {
    return !multiple && value && value.length > 0
      ? [value[0]]
      : value
  }

  const getFilteredOptions = () => {
    return options.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()))
  }

  // RENDER
  return (
    <section className="relative flex w-max flex-col transition-all">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} description={description} tooltip={tooltip} required={required}  />

      {/* SELECT PART */}
      <div className={selectClassName} ref={ref}>

        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox ref={ref} value={value} multiple={multiple} filter={filter} filterRef={filterRef}
                        onRemove={handleOnRemove} onFilterChange={setFilter}
                        onFilterFocusChange={handleOnInputFocusChange} onDeleteLastValue={handleOnDeleteLastValue}/>

        {/* DROPDOWN ARROW */}
        <div className="min-h-[56px] cursor-pointer select-none rounded-lg pl-4 pr-5 [&>svg]:m-1" onClick={handleOnDropdownArrowClick}>
          <div className="flex h-full flex-col justify-center" >
            { isDropdownOpened ? <ArrowUpIcon/> : <ArrowDownIcon/> }
          </div>
        </div>

        { disabled && <div className="absolute inset-0 rounded-lg"/> }
      </div>

      {/* DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        {
          isDropdownOpened &&
          <Dropdown options={getFilteredOptions()} value={getDropdownValues()} multiple={multiple}
                    divider={dropdownDivider} selectAllOption={selectAllOption} absolute
                    onChooseOne={handleOnChooseOne} onUnChooseOne={handleOnUnChooseOne} onSelectAll={handleOnSelectAll}
                    onChooseMulti={handleOnChooseMulti} onUnChooseMulti={handleOnUnChooseMulti} />
        }
      </div>

      {/* ERROR MESSAGE */ }
      <FieldErrorMessage errorMessage={errorMessage}/>
    </section>
  )
}


const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(SelectFieldComponent)
export default SelectField;

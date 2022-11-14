import ArrowDownIcon from '@assets/images/forms/chevron-down.svg'
import ArrowUpIcon from '@assets/images/forms/chevron-up.svg'
import cx from 'classnames'
import React, { ForwardedRef, forwardRef, ForwardRefRenderFunction, useState } from 'react'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'
import Dropdown from './Dropdown'
import SelectFieldBox from './SelectFieldBox'
import { EnumOptionsType } from '@rjsf/utils'


interface SelectFieldProps {
  label: string
  type?: 'one' | 'multiple' | 'arrow' | 'radio'
  value?: EnumOptionsType[]
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  placeholder?: string
  description?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  onChange: (values: EnumOptionsType[]) => void;
}

const SelectFieldComponent: ForwardRefRenderFunction<HTMLDivElement, SelectFieldProps>
  = (props: SelectFieldProps, ref: ForwardedRef<HTMLDivElement>) => {
  // PROPS
  const {
    label,
    value,
    enumOptions,
    type = 'one',
    selectAllOption,
    placeholder,
    description,
    tooltip,
    dropdownDivider,
    errorMessage,
    required,
    disabled,
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
  const handleOnChangeSelect = (selectedOptions: EnumOptionsType[]) => {
    if (onChange) {
      onChange(selectedOptions)
    }
  }

  const handleOnRemove = (optionId: number) => {
    const newValue =  value ? [...value] : []
    newValue.splice(optionId, 1)
    handleOnChangeSelect(newValue)
  }

  const handleOnChooseOne = (option: EnumOptionsType, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([option])
    setFilter("")
  }

  const handleOnUnChooseOne = (option: EnumOptionsType, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([] )
  }

  const handleOnChooseMulti = (option: EnumOptionsType) => {
    const newValue = value ? [...value] : []
    newValue.push(option)
    handleOnChangeSelect(newValue)
    setFilter("")
  }

  const handleOnUnChooseMulti = (option: EnumOptionsType) => {
    const newValue = value
      ? [...value].filter(valueOption => {
        return valueOption.value !== option.value
          || valueOption.label !== option.label
      })
      : []
    handleOnChangeSelect(newValue)
  }

  const handleOnDropdownArrowClick2 = () => {
    if (!isDropdownOpened) {
      filterRef.current?.focus()
    } else {
      setIsDropdownOpened(false)
    }
  }

  const handleOnDropdownArrowClick = () => {
    if (isDropdownOpened) {
      setIsDropdownOpened(false)
    }
  }

  const handleOnSelectFieldClick = (event: React.MouseEvent) => {
    const targetClassList = (event.target as Element).classList
    if (!isDropdownOpened && !targetClassList.contains("tag")) {
      setIsDropdownOpened(true)
      filterRef.current?.focus()
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
    const newValue = enumOptions ? [...enumOptions] : []
    handleOnChangeSelect(newValue)
  }

  // HELPER FUNCTIONS
  const getDropdownValues = (): EnumOptionsType[] => {
    return value
      ? type !== 'multiple' && value && value.length > 0
        ? [value[0]]
        : value
      : []
  }

  const getFilteredOptions = (): EnumOptionsType[] => {
    return enumOptions
      ? enumOptions.filter((option: { value: string }) => option.value.toLowerCase().includes(filter.toLowerCase()))
      : []
  }

  // RENDER
  return (
    <section className="relative flex w-max flex-col transition-all">
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader label={label} description={description} tooltip={tooltip} required={required}  />

      {/* SELECT PART */}
      <div className={selectClassName} ref={ref} onClick={handleOnSelectFieldClick}>

        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox ref={ref} value={value} multiple={type==='multiple'} filter={filter} filterRef={filterRef}
                        placeholder={placeholder} onRemove={handleOnRemove} onFilterChange={setFilter}
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
          <Dropdown enumOptions={getFilteredOptions()} value={getDropdownValues()} type={type}
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

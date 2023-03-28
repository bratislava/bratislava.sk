import ArrowDownIcon from '@assets/images/forms/chevron-down.svg'
import ArrowUpIcon from '@assets/images/forms/chevron-up.svg'
import cx from 'classnames'
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useEffect,
  useId,
  useState,
} from 'react'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'
import FieldHeader from '../../info-components/FieldHeader'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import Dropdown from './Dropdown'
import SelectFieldBox from './SelectFieldBox'

export interface SelectOption {
  const: string | number
  title?: string
  description?: string
}

interface SelectFieldProps {
  label: string
  type?: 'one' | 'multiple' | 'arrow' | 'radio'
  value?: SelectOption[]
  enumOptions?: SelectOption[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  placeholder?: string
  errorMessage?: string[]
  helptext?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  disabled?: boolean
  className?: string
  onChange: (values: SelectOption[]) => void
}

const SelectFieldComponent: ForwardRefRenderFunction<HTMLDivElement, SelectFieldProps> = (
  props: SelectFieldProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  // PROPS
  const {
    label,
    value,
    enumOptions,
    type = 'one',
    selectAllOption,
    placeholder,
    helptext,
    tooltip,
    dropdownDivider,
    errorMessage = [],
    required,
    explicitOptional,
    disabled,
    className,
    onChange,
  } = props

  // STATE
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false)
  const [isOutsideClickProgressing, setIsOutsideClickProgressing] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const [filterRef] = useState<RefObject<HTMLInputElement>>(React.createRef<HTMLInputElement>())

  // STYLES
  const selectClassName = cx(
    'border-form-input-default flex flex-row bg-white rounded-lg border-2 items-center',
    {
      'hover:border-form-input-hover focus:border-form-input-pressed active:border-form-input-pressed':
        !disabled,
      'border-negative-700 hover:border-negative-700 focus:border-negative-700':
        errorMessage?.length > 0 && !disabled,
      'border-form-input-disabled opacity-50': disabled,
    },
  )

  useEffect(() => {
    if (!isDropdownOpened) {
      setIsOutsideClickProgressing(false)
    }
  }, [isDropdownOpened])

  const handleOnChangeSelect = (selectedOptions: SelectOption[], close?: boolean) => {
    if (!onChange) return
    onChange(selectedOptions)
    if (type === 'multiple' || !close) {
      setIsDropdownOpened(true)
    }
  }

  const handleOnRemove = (optionId: number) => {
    const newValue = value ? [...value] : []
    newValue.splice(optionId, 1)
    const close = type !== 'multiple'
    handleOnChangeSelect(newValue, close)
  }

  const handleOnChooseOne = (option: SelectOption, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([option], close)
    setFilter('')
  }

  const handleOnUnChooseOne = (option: SelectOption, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([], close)
  }

  const handleOnChooseMulti = (option: SelectOption) => {
    const newValue = value ? [...value] : []
    newValue.push(option)
    handleOnChangeSelect(newValue)
  }

  const handleOnUnChooseMulti = (option: SelectOption) => {
    const newValue = value
      ? [...value].filter((valueOption) => {
          return valueOption.const !== option.const
        })
      : []
    handleOnChangeSelect(newValue)
  }

  const handleOnSelectFieldClick = (event: React.MouseEvent) => {
    const targetClassList = (event.target as Element).classList
    if (!isDropdownOpened && !targetClassList.contains('tag') && !disabled) {
      filterRef.current?.focus()
      if (!isOutsideClickProgressing) {
        setIsDropdownOpened(true)
      }
    }
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

  const handleOnDeselectAll = () => {
    handleOnChangeSelect([])
  }

  const handleOnClickOutside = () => {
    setIsOutsideClickProgressing(true)
    setIsDropdownOpened(false)
  }

  // HELPER FUNCTIONS
  const getDropdownValues = (): SelectOption[] => {
    return value ? (type !== 'multiple' && value && value.length > 0 ? [value[0]] : value) : []
  }

  const getFilteredOptions = (): SelectOption[] => {
    return enumOptions
      ? enumOptions.filter((option: SelectOption) =>
          String(option.title).toLowerCase().includes(filter.toLowerCase()),
        )
      : []
  }

  const isRowBold = enumOptions?.some(
    (option: SelectOption) => option.description && option.description !== '',
  )

  // RENDER
  return (
    <section
      className={cx(
        'relative flex w-full max-w-[200px] flex-col transition-all xs:max-w-[320px]',
        className,
      )}
    >
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader
        label={label}
        helptext={helptext}
        tooltip={tooltip}
        required={required}
        explicitOptional={explicitOptional}
      />

      {/* SELECT PART */}
      <div className={selectClassName} ref={ref} onClick={handleOnSelectFieldClick}>
        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox
          ref={ref}
          value={value}
          multiple={type === 'multiple'}
          filter={filter}
          filterRef={filterRef}
          placeholder={placeholder}
          onRemove={handleOnRemove}
          onRemoveAll={handleOnDeselectAll}
          onFilterChange={setFilter}
          onDeleteLastValue={handleOnDeleteLastValue}
        />

        {/* DROPDOWN ARROW */}
        <div className="dropdownButton flex h-10 cursor-pointer select-none flex-col items-center rounded-lg px-3 sm:h-12 sm:px-4 [&>svg]:m-1">
          <div className="dropdownButton relative flex h-6 h-full w-6 flex-col items-center justify-center">
            {isDropdownOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <div className="dropdownButton absolute inset-0 z-10" />
          </div>
        </div>

        {disabled && <div className="absolute inset-0 z-20 rounded-lg" />}
      </div>

      {/* DROPDOWN */}
      <div className="dropdown relative">
        {isDropdownOpened && (
          <Dropdown
            enumOptions={getFilteredOptions()}
            value={getDropdownValues()}
            isRowBold={isRowBold}
            type={type}
            divider={dropdownDivider}
            selectAllOption={selectAllOption}
            absolute
            onChooseOne={handleOnChooseOne}
            onUnChooseOne={handleOnUnChooseOne}
            onSelectAll={handleOnSelectAll}
            onDeselectAll={handleOnDeselectAll}
            onChooseMulti={handleOnChooseMulti}
            onUnChooseMulti={handleOnUnChooseMulti}
            onClickOutside={handleOnClickOutside}
          />
        )}
      </div>

      {/* ERROR MESSAGE */}
      <FieldErrorMessage errorMessage={errorMessage} />
    </section>
  )
}

const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(SelectFieldComponent)
export default SelectField

import ArrowDownIcon from '@assets/images/forms/chevron-down.svg'
import ArrowUpIcon from '@assets/images/forms/chevron-up.svg'
import { EnumOptionsType } from '@rjsf/utils'
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
import Dropdown from './Dropdown'
import SelectFieldBox from './SelectFieldBox'

interface SelectFieldProps {
  label: string
  type?: 'one' | 'multiple' | 'arrow' | 'radio'
  value?: EnumOptionsType[]
  enumOptions?: EnumOptionsType[]
  tooltip?: string
  dropdownDivider?: boolean
  selectAllOption?: boolean
  placeholder?: string
  errorMessage?: string[]
  description?: string
  required?: boolean
  explicitOptional?: 'none' | 'right' | 'left'
  disabled?: boolean
  className?: string
  onChange: (values: EnumOptionsType[]) => void
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
    description,
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
  const [filter, setFilter] = useState<string>('')
  const hashCode = useId()
  const [filterRef] = useState<RefObject<HTMLInputElement>>(React.createRef<HTMLInputElement>())
  const [dropdownRef] = useState<RefObject<HTMLDivElement>>(React.createRef<HTMLDivElement>())

  // STYLES
  const selectClassName = cx(
    'border-form-input-default flex flex-row bg-white rounded-lg border-2',
    {
      'hover:border-form-input-hover focus:border-form-input-pressed active:border-form-input-pressed':
        !disabled,
      'border-error hover:border-error focus:border-error': errorMessage?.length > 0 && !disabled,
      'border-form-input-disabled opacity-50': disabled,
    },
    hashCode,
  )

  // EVENT HANDLERS
  useEffect(() => {
    const isForcedToOpenDropdown = (targetClassList: DOMTokenList) => {
      // open me (actual select) if I was clicked but my dropdownArrow and dropdown were not clicked
      // dropdownButton will handle its own events
      // dropdown will handle its own events
      return (
        targetClassList.contains(hashCode) &&
        !targetClassList.contains('dropdownButton') &&
        !targetClassList.contains('dropdown') &&
        !targetClassList.contains('tag')
      )
    }
    const handleOnWindowClick = (event: Event) => {
      const target = event.target as Element
      const targetClassList = target?.classList
      if (!targetClassList.contains(hashCode)) {
        // close me (actual select) if i am not clicked
        setIsDropdownOpened(false)
      } else if (isForcedToOpenDropdown(targetClassList) && !(target instanceof SVGMPathElement)) {
        // open me (actual select) if "I am forced to open"
        // && <path> in SVG icons because it means that dropdownButton, dropdown or tag was clicked
        // I can not set hashcode to path element so I can not recognize what belongs to me (actual select)
        setIsDropdownOpened(true)
      } // no else because there are cases when none of above is done, so everything stays like it is or other events are handled independently
    }
    document.addEventListener('click', handleOnWindowClick)
    return () => document.removeEventListener('click', handleOnWindowClick)
  }, [filterRef, hashCode])

  const handleOnChangeSelect = (selectedOptions: EnumOptionsType[], close?: boolean) => {
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

  const handleOnChooseOne = (option: EnumOptionsType, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([option], close)
    setFilter('')
  }

  const handleOnUnChooseOne = (option: EnumOptionsType, close?: boolean) => {
    if (close) setIsDropdownOpened(false)
    handleOnChangeSelect([], close)
  }

  const handleOnChooseMulti = (option: EnumOptionsType) => {
    const newValue = value ? [...value] : []
    newValue.push(option)
    handleOnChangeSelect(newValue)
    setFilter('')
  }

  const handleOnUnChooseMulti = (option: EnumOptionsType) => {
    const newValue = value
      ? [...value].filter((valueOption) => {
          return valueOption.value !== option.value || valueOption.label !== option.label
        })
      : []
    handleOnChangeSelect(newValue)
  }

  const handleOnDropdownArrowClick = () => {
    if (isDropdownOpened) {
      setIsDropdownOpened(false)
    }
  }

  const handleOnSelectFieldClick = (event: React.MouseEvent) => {
    const targetClassList = (event.target as Element).classList
    if (!isDropdownOpened && !targetClassList.contains('tag') && !disabled) {
      setIsDropdownOpened(true)
      filterRef.current?.focus()
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

  // HELPER FUNCTIONS
  const getDropdownValues = (): EnumOptionsType[] => {
    return value ? (type !== 'multiple' && value && value.length > 0 ? [value[0]] : value) : []
  }

  const getFilteredOptions = (): EnumOptionsType[] => {
    return enumOptions
      ? enumOptions.filter((option: EnumOptionsType) =>
          String(option.value).toLowerCase().includes(filter.toLowerCase()),
        )
      : []
  }

  // RENDER
  return (
    <section
      className={cx(
        'relative w-full max-w-[200px] xs:max-w-[320px] flex flex-col transition-all',
        className,
      )}
    >
      {/* FIELD HEADER WITH DESCRIPTION AND LABEL */}
      <FieldHeader
        label={label}
        htmlFor={hashCode}
        description={description}
        tooltip={tooltip}
        required={required}
        explicitOptional={explicitOptional}
      />

      {/* SELECT PART */}
      <div className={selectClassName} ref={ref} onClick={handleOnSelectFieldClick}>
        {/* MAIN BODY OF SELECT */}
        <SelectFieldBox
          ref={ref}
          hashCode={hashCode}
          value={value}
          multiple={type === 'multiple'}
          filter={filter}
          filterRef={filterRef}
          placeholder={placeholder}
          onRemove={handleOnRemove}
          onFilterChange={setFilter}
          onDeleteLastValue={handleOnDeleteLastValue}
        />

        {/* DROPDOWN ARROW */}
        <div
          className={`${hashCode} dropdownButton min-h-[56px] cursor-pointer select-none rounded-lg pl-4 pr-5 [&>svg]:m-1`}
          onClick={handleOnDropdownArrowClick}
        >
          <div
            className={`${hashCode} dropdownButton relative flex h-full flex-col justify-center`}
          >
            {isDropdownOpened ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <div className={`${hashCode} dropdownButton absolute inset-0 z-10`} />
          </div>
        </div>

        {disabled && <div className="absolute inset-0 rounded-lg z-20" />}
      </div>

      {/* DROPDOWN */}
      <div className={`${hashCode} dropdown relative`} ref={dropdownRef}>
        {isDropdownOpened && (
          <Dropdown
            enumOptions={getFilteredOptions()}
            value={getDropdownValues()}
            type={type}
            selectHashCode={hashCode}
            divider={dropdownDivider}
            selectAllOption={selectAllOption}
            absolute
            onChooseOne={handleOnChooseOne}
            onUnChooseOne={handleOnUnChooseOne}
            onSelectAll={handleOnSelectAll}
            onDeselectAll={handleOnDeselectAll}
            onChooseMulti={handleOnChooseMulti}
            onUnChooseMulti={handleOnUnChooseMulti}
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

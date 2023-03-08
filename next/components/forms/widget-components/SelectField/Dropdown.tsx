import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import { FC } from 'react'

import { useClickOutsideHandler } from '../../../utils/ClickOutsideHandler/useClickOutsideHandler'
import DropdownRow from './DropdownRow'
import SelectAllDropdownRow from './SelectAllDropdownRow'

interface DropdownProps {
  enumOptions: EnumOptionsType[]
  value: EnumOptionsType[]
  selectAllOption?: boolean
  absolute?: boolean
  isRowBold?: boolean
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  className?: string
  onChooseOne?: (option: EnumOptionsType, close?: boolean) => void
  onUnChooseOne?: (option: EnumOptionsType, close?: boolean) => void
  onChooseMulti?: (option: EnumOptionsType) => void
  onUnChooseMulti?: (option: EnumOptionsType) => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
  onClickOutside?: () => void
}

const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    enumOptions,
    value,
    selectAllOption,
    absolute,
    isRowBold,
    type,
    divider,
    className,
    onChooseOne,
    onUnChooseOne,
    onChooseMulti,
    onUnChooseMulti,
    onSelectAll,
    onDeselectAll,
    onClickOutside,
  } = props

  const { clickOutsideRef } = useClickOutsideHandler(() => {
    if (onClickOutside) onClickOutside()
  })

  // STYLES
  const dropdownClassName = cx(
    'dropdown border-form-input-pressed max-h-96 overflow-y-auto rounded-lg border-2 bg-white z-50 py-2',
    {
      'absolute top-2 left-0 right-0': absolute,
    },
    className,
  )

  // HELP FUNCTIONS
  const isSelected = (option: EnumOptionsType): boolean => {
    return value?.some((valueOption: EnumOptionsType) => {
      return valueOption.value === option.value && valueOption.label === option.label
    })
  }

  const isEverythingSelected = enumOptions.some((option: EnumOptionsType) => !isSelected(option))

  // EVENT HANDLERS
  const handleOnSelectAllRowClick = (isSelectingAll: boolean) => {
    if (isSelectingAll && onSelectAll) {
      onSelectAll()
    } else if (!isSelectingAll && onDeselectAll) {
      onDeselectAll()
    }
  }

  // RENDER
  return (
    <div className={dropdownClassName} ref={clickOutsideRef}>
      {selectAllOption && type === 'multiple' && (
        <SelectAllDropdownRow
          onSelectAll={handleOnSelectAllRowClick}
          divider={divider}
          isEverythingSelected={isEverythingSelected}
        />
      )}
      {enumOptions?.map((option, key) => (
        <DropdownRow
          key={key}
          option={option}
          divider={divider}
          selected={isSelected(option)}
          type={type}
          isBold={isRowBold}
          onChooseOne={(opt: EnumOptionsType, close?: boolean) =>
            onChooseOne ? onChooseOne(opt, close) : null
          }
          onUnChooseOne={(opt: EnumOptionsType, close?: boolean) =>
            onUnChooseOne ? onUnChooseOne(opt, close) : null
          }
          onChooseMulti={(opt: EnumOptionsType) => (onChooseMulti ? onChooseMulti(opt) : null)}
          onUnChooseMulti={(opt: EnumOptionsType) =>
            onUnChooseMulti ? onUnChooseMulti(opt) : null
          }
        />
      ))}
    </div>
  )
}

export default Dropdown

import cx from 'classnames'
import { FC, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import DropdownRow from './DropdownRow'
import SelectAllDropdownRow from './SelectAllDropdownRow'
import { SelectOption } from './SelectField'

interface DropdownProps {
  enumOptions: SelectOption[]
  value: SelectOption[]
  selectAllOption?: boolean
  absolute?: boolean
  isRowBold?: boolean
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  className?: string
  onChooseOne?: (option: SelectOption, close?: boolean) => void
  onUnChooseOne?: (option: SelectOption, close?: boolean) => void
  onChooseMulti?: (option: SelectOption) => void
  onUnChooseMulti?: (option: SelectOption) => void
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

  const clickOutsideRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(clickOutsideRef, () => {
    if (onClickOutside) onClickOutside()
  })

  // STYLES
  const dropdownClassName = cx(
    'dropdown border-form-input-pressed z-30 max-h-96 overflow-hidden rounded-lg border-2 bg-white',
    {
      'absolute top-2 left-0 right-0': absolute,
    },
    className,
  )

  // HELP FUNCTIONS
  const isSelected = (option: SelectOption): boolean => {
    return value?.some((valueOption: SelectOption) => {
      return valueOption.const === option.const
    })
  }

  const isEverythingSelected = enumOptions.some((option: SelectOption) => !isSelected(option))

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
      <div className="max-h-96 overflow-y-auto py-2">
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
            onChooseOne={(opt: SelectOption, close?: boolean) =>
              onChooseOne ? onChooseOne(opt, close) : null
            }
            onUnChooseOne={(opt: SelectOption, close?: boolean) =>
              onUnChooseOne ? onUnChooseOne(opt, close) : null
            }
            onChooseMulti={(opt: SelectOption) => (onChooseMulti ? onChooseMulti(opt) : null)}
            onUnChooseMulti={(opt: SelectOption) => (onUnChooseMulti ? onUnChooseMulti(opt) : null)}
          />
        ))}
      </div>
    </div>
  )
}

export default Dropdown

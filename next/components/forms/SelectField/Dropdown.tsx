import cx from 'classnames'
import { FC } from 'react'

import DropdownRow from './DropdownRow'
import SelectAllDropdownRow from './SelectAllDropdownRow'
import SelectOption from './SelectOption'

interface DropdownProps {
  options: SelectOption[]
  value?: SelectOption[]
  selectAllOption?: boolean
  absolute?: boolean
  multiple?: boolean
  divider?: boolean
  onChooseOne: (option: SelectOption, close?: boolean) => void
  onUnChooseOne: (option: SelectOption, close?: boolean) => void
  onChooseMulti: (option: SelectOption) => void
  onUnChooseMulti: (option: SelectOption) => void
  onSelectAll: () => void
}

const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    options,
    value,
    selectAllOption,
    absolute,
    multiple,
    divider,
    onChooseOne,
    onUnChooseOne,
    onChooseMulti,
    onUnChooseMulti,
    onSelectAll
  } = props

  // STYLES
  const dropdownClassName = cx(
    "rounded-lg border-2 border-form-input-pressed bg-white z-50 py-2",
    {
      "absolute top-2 left-0 right-0": absolute
    }
  )

  // HELP FUNCTIONS
  const isSelected = (option: SelectOption): boolean => {
    return !!value?.find((valueOption) => {
      return valueOption.value === option.value
        && valueOption.label === option.label
        && valueOption.description === option.description
    })
  }

  // RENDER
  return (
    <div className={dropdownClassName}>
      {
        selectAllOption && multiple && <SelectAllDropdownRow onSelectAll={onSelectAll} divider={divider}/>
      }
      {
        options.map(
          (option, key) =>
            <DropdownRow key={key} option={option} divider={divider} selected={isSelected(option)} multiple={multiple}
                         onChooseOne={onChooseOne} onUnChooseOne={onUnChooseOne} onChooseMulti={onChooseMulti} onUnChooseMulti={onUnChooseMulti} />
        )
      }
    </div>
  )
}

export default Dropdown

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
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  onChooseOne?: (option: SelectOption, close?: boolean) => void
  onUnChooseOne?: (option: SelectOption, close?: boolean) => void
  onChooseMulti?: (option: SelectOption) => void
  onUnChooseMulti?: (option: SelectOption) => void
  onSelectAll?: () => void
}

const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    options,
    value,
    selectAllOption,
    absolute,
    type,
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
        selectAllOption && type === 'multiple' && <SelectAllDropdownRow onSelectAll={() => onSelectAll ? onSelectAll() : null} divider={divider}/>
      }
      {
        options.map(
          (option, key) =>
            <DropdownRow key={key} option={option} divider={divider} selected={isSelected(option)} type={type}
                         onChooseOne={(opt: SelectOption, close?: boolean) => onChooseOne ? onChooseOne(opt, close) : null}
                         onUnChooseOne={(opt: SelectOption, close?: boolean) => onUnChooseOne ? onUnChooseOne(opt, close) : null}
                         onChooseMulti={(opt: SelectOption) => onChooseMulti ? onChooseMulti(opt) : null}
                         onUnChooseMulti={(opt: SelectOption) => onUnChooseMulti ? onUnChooseMulti(opt) : null} />
        )
      }
    </div>
  )
}

export default Dropdown

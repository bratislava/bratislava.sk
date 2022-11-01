import cx from 'classnames'

import DropdownRow from './DropdownRow'
import SelectOption from './SelectOption'

interface DropdownProps {
  options: SelectOption[]
  value?: SelectOption[]
  absolute?: boolean
  multiple?: boolean
  divider?: boolean
  onChooseOne: (option: SelectOption, close?: boolean) => void
  onUnChooseOne: (option: SelectOption, close?: boolean) => void
  onChooseMulti: (option: SelectOption) => void
  onUnChooseMulti: (option: SelectOption) => void
}

const Dropdown = ({options, value, absolute, multiple, divider, onChooseOne, onUnChooseOne, onChooseMulti, onUnChooseMulti}: DropdownProps) => {
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

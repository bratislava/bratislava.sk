import cx from 'classnames'

import SelectOption from './SelectOption'
import DropdownRow from './DropdownRow'

interface DropdownProps {
  options: SelectOption[]
  value?: SelectOption[]
  absolute?: boolean
  multiple?: boolean
  divider?: boolean
}

const Dropdown = ({options, value, absolute, multiple, divider}: DropdownProps) => {
  // STYLES
  const dropdownClassName = cx(
    "rounded-lg border-2 border-form-input-pressed bg-gray-100 z-50 py-2",
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
        options.map(option => <DropdownRow option={option} divider={divider} selected={isSelected(option)} multiple={multiple}/>)
      }
    </div>
  )
}

export default Dropdown

import cx from 'classnames'

import SelectOption from './SelectOption'
import DropdownRow from './DropdownRow'

interface DropdownProps {
  options: SelectOption[]
  absolute?: boolean
  multiple?: boolean
  divider?: boolean
}

const Dropdown = ({options, absolute, multiple, divider}: DropdownProps) => {
  // STYLES
  const dropdownClassName = cx(
    "rounded-lg border-2 border-form-input-pressed bg-gray-100 z-50 py-2",
    {
      "absolute top-2 left-0 right-0": absolute
    }
  )

  // RENDER
  return (
    <div className={dropdownClassName}>
      {
        options.map(option => <DropdownRow option={option} divider={divider}/>)
      }
    </div>
  )
}

export default Dropdown

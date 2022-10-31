import cx from 'classnames'

import SelectOption from './SelectOption'

interface DropdownProps {
  options: SelectOption[]
  multiple?: boolean
}

const Dropdown = ({options, multiple}: DropdownProps) => {
  // STYLES
  const dropdownClassName = cx(
    "rounded-lg border-2 border-form-input-pressed absolute top-2 left-0 right-0 bg-gray-100 z-50 py-2",
  )

  // RENDER
  return (
    <div className={dropdownClassName}>
      {
        options.map(option => <p>{option.label}</p>)
      }
    </div>
  )
}

export default Dropdown

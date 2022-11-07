import SelectedIcon from '@assets/images/forms/selected.svg'
import cx from 'classnames'

interface SelectCheckboxProps {
  checked?: boolean
}

const CheckboxIcon = ({ checked }: SelectCheckboxProps) => {
  // STYLES
  const checkboxClassName = cx(
    "rounded w-6 h-6 flex flex-col justify-center",
    {
      "bg-gray-700": checked,
      "border-2 border-gray-600": !checked
    }
  )

  // RENDER
  return (
    <div className={checkboxClassName}>
      { checked && <SelectedIcon className="m-auto"/> }
    </div>
  )
}

export default CheckboxIcon

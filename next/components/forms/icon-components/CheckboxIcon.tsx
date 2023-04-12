import SelectedIcon from '@assets/images/forms/selected.svg'
import cx from 'classnames'

interface SelectCheckboxProps {
  checked?: boolean
  className?: string
}

const CheckboxIcon = ({ checked, className }: SelectCheckboxProps) => {
  // STYLES
  const checkboxClassName = cx(
    'flex h-6 w-6 flex-col justify-center rounded',
    {
      'bg-gray-700': checked,
      'border-2 border-gray-600': !checked,
    },
    className,
  )

  const iconClassName = cx('m-auto', {
    dropdown: className && className.split(' ').includes('dropdown'),
  })

  // RENDER
  return (
    <div className={checkboxClassName}>{checked && <SelectedIcon className={iconClassName} />}</div>
  )
}

export default CheckboxIcon

import cx from 'classnames'
import SelectedIcon from '@assets/images/forms/selected.svg'
import SelectOption from './SelectOption'

interface DropdownRowProps {
  option: SelectOption
  selected?: boolean
  divider?: boolean
}

const DropdownRow = ({option, selected, divider}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    "flex flex-col w-full px-5 bg-gray-100 [&>div]:last:border-0",
    {
      "h-14": !option.description,
      "h-[84px]": option.description
    }
  )

  const optionClassName = cx(
    "text-p-md w-full",
    {
      "font-semibold": option.description
    }
  )

  // RENDER
  return (
    <div className={rowClassName}>
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-row justify-center">
          <p className={optionClassName}>{option.label}</p>
          { selected && <div className="flex flex-col justify-center"><SelectedIcon/></div>}
        </div>
        { option.description && <p className="text-p-sm">{option.description}</p> }
      </div>
      { divider && <div className="border-b-2 border-form-input-default"/> }
    </div>
  )
}

export default DropdownRow

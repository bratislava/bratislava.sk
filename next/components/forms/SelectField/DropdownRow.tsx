import cx from 'classnames'
import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import SelectOption from './SelectOption'
import CheckboxIcon from '../icon-components/CheckboxIcon'

interface DropdownRowProps {
  option: SelectOption
  selected?: boolean
  multiple?: boolean
  divider?: boolean
}

const DropdownRow = ({option, selected, multiple, divider}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    "flex flex-col w-full px-5 bg-gray-100 [&>div]:last:border-0 cursor-pointer hover:bg-form-plain-black-hover",
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
          <div className="flex flex-col justify-center">
              {
                multiple
                  ? <CheckboxIcon checked={selected}/>
                  : selected
                    ? <FilledSelectedIcon/>
                    : null
              }
          </div>
        </div>
        { option.description && <p className="text-p-sm">{option.description}</p> }
      </div>
      { divider && <div className="border-b-2 border-form-input-default"/> }
    </div>
  )
}

export default DropdownRow

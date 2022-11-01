import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import cx from 'classnames'

import CheckboxIcon from '../icon-components/CheckboxIcon'
import SelectOption from './SelectOption'

interface DropdownRowProps {
  option: SelectOption
  selected?: boolean
  multiple?: boolean
  divider?: boolean
  onChooseOne: (option: SelectOption, close?: boolean) => void
  onUnChooseOne: (option: SelectOption, close?: boolean) => void
  onChooseMulti: (option: SelectOption) => void
  onUnChooseMulti: (option: SelectOption) => void
}

const DropdownRow = ({option, selected, multiple, divider, onChooseOne, onUnChooseOne, onChooseMulti, onUnChooseMulti}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    "flex flex-col w-full px-5 bg-white [&>div]:last:border-0 cursor-pointer hover:bg-form-plain-black-hover",
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

  // EVENT HANDLERS
  const handleOnClick = () => {
    if (selected && multiple) onUnChooseMulti(option)
    else if (!selected && multiple) onChooseMulti(option)
    else if (selected && !multiple) onUnChooseOne(option, true)
    else if (!selected && !multiple) onChooseOne(option, true)
  }

  // RENDER
  return (
    <div className={rowClassName} onClick={handleOnClick}>
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

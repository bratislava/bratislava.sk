import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import cx from 'classnames'
import ChevronRightIcon from '../../../assets/images/forms/chevron-right.svg'
import CheckboxIcon from '../icon-components/CheckboxIcon'
import SelectOption from './SelectRJSFOptions'
import RadioButtonIcon from '../icon-components/RadioButtonIcon'
import { EnumOptionsType } from '@rjsf/utils'

interface DropdownRowProps {
  option: EnumOptionsType
  selected?: boolean
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  selectHashCode?: string
  onChooseOne: (option: EnumOptionsType, close?: boolean) => void
  onUnChooseOne: (option: EnumOptionsType, close?: boolean) => void
  onChooseMulti: (option: EnumOptionsType) => void
  onUnChooseMulti: (option: EnumOptionsType) => void
}

const DropdownRow = ({option, selected, type, divider, selectHashCode, onChooseOne, onUnChooseOne, onChooseMulti, onUnChooseMulti}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    "flex flex-col w-full px-5 bg-white [&>div]:last:border-0 cursor-pointer hover:bg-form-plain-black-hover",
    {
      "h-14": option.label === "" || option.label === option.value,
      "h-[84px]": option.label !== "" && option.label !== option.value
    },
    selectHashCode
  )

  const optionClassName = cx(
    "text-p-md w-full",
    {
      "font-semibold": option.label !== "" && option.label !== option.value
    },
    selectHashCode
  )

  // EVENT HANDLERS
  const handleOnClick = () => {
    if (selected && type === 'multiple') onUnChooseMulti(option)
    else if (!selected && type === 'multiple') onChooseMulti(option)
    else if (selected && ['one', 'arrow'].includes(type)) onUnChooseOne(option, true)
    else if (!selected && ['one', 'arrow'].includes(type)) onChooseOne(option, true)
    else if (selected && type === 'radio') onUnChooseOne(option, false)
    else if (!selected && type === 'radio') onChooseOne(option, false)
  }

  // HELPER FUNCTIONS
  const getRowIcon = () => {
    return type === 'multiple'
      ? <CheckboxIcon checked={selected}/>
      : type === 'one' && selected
        ? <FilledSelectedIcon/>
        : type === 'arrow'
          ? <ChevronRightIcon/>
          : type === 'radio'
            ? <RadioButtonIcon selected={selected}/>
            : null
  }

  // RENDER
  return (
    <div className={rowClassName} onClick={handleOnClick}>
      <div className={`${selectHashCode} flex h-full flex-col justify-center`}>
        <div className={`${selectHashCode} flex flex-row justify-center`}>
          <p className={optionClassName}>{option.value}</p>
          <div className={`${selectHashCode} flex flex-col justify-center`}>
              { getRowIcon() }
          </div>
        </div>
        { option.label !== option.value && <p className={`${selectHashCode} text-p-sm`}>{option.label}</p> }
      </div>
      { divider && <div className={`${selectHashCode} border-b-2 border-form-input-default`}/> }
    </div>
  )
}

export default DropdownRow

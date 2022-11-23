import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import cx from 'classnames'
import ChevronRightIcon from '../../../assets/images/forms/chevron-right.svg'
import CheckboxIcon from '../icon-components/CheckboxIcon'
import RadioButtonIcon from '../icon-components/RadioButtonIcon'
import { EnumOptionsType } from '@rjsf/utils'
import React from 'react'

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
    "dropdown flex flex-col w-full px-5 bg-white [&>div]:last:border-0 cursor-pointer hover:bg-form-plain-black-hover",
    {
      "h-14": option.label === "" || option.label === String(option.value),
      "h-full xs:h-[84px]": option.label !== "" && option.label !== String(option.value)
    },
    selectHashCode
  )

  const optionClassName = cx(
    "dropdown text-p-md w-full",
    {
      "font-semibold": option.label !== "" && option.label !== String(option.value)
    },
    selectHashCode
  )

  // EVENT HANDLERS
  const handleOnClick = () => {
    if (selected && type === 'multiple') onUnChooseMulti(option)
    else if (!selected && type === 'multiple') onChooseMulti(option)
    else if (selected && ['one', 'arrow', 'radio'].includes(type)) onUnChooseOne(option, true)
    else if (!selected && ['one', 'arrow'].includes(type)) onChooseOne(option, true)
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
      <div className={`${selectHashCode} dropdown flex h-full flex-col justify-center`}>
        <div className={`${selectHashCode} dropdown flex flex-row justify-center`}>
          <p className={optionClassName}>
            {option.value}
          </p>
          <div className={`${selectHashCode} dropdown relative flex flex-col justify-center`}>
              { getRowIcon() }
            <div className={`${selectHashCode} dropdown absolute inset-0 z-10`}/>
          </div>
        </div>
        { option.label !== String(option.value) && <p className={`${selectHashCode} dropdown text-p-sm`}>{option.label}</p> }
      </div>
      { divider && <div className={`${selectHashCode} dropdown border-b-2 border-form-input-default`}/> }
    </div>
  )
}

export default DropdownRow

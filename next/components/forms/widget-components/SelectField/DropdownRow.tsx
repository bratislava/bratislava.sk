import ChevronRightIcon from '@assets/images/forms/chevron-right.svg'
import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import React from 'react'

import CheckboxIcon from '../../icon-components/CheckboxIcon'
import RadioButtonIcon from '../../icon-components/RadioButtonIcon'

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

const DropdownRow = ({
  option,
  selected,
  type,
  divider,
  selectHashCode,
  onChooseOne,
  onUnChooseOne,
  onChooseMulti,
  onUnChooseMulti,
}: DropdownRowProps) => {
  // STYLES
  const rowClassName = cx(
    'dropdown hover:bg-form-plain-black-hover flex flex-col w-full px-5 bg-white [&>div]:last:border-0 cursor-pointer',
    {
      'h-14': option.label === '' || option.label === String(option.value),
      'h-full xs:h-[84px]': option.label !== '' && option.label !== String(option.value),
    },
    selectHashCode,
  )

  const optionClassName = cx(
    'dropdown text-20 w-full',
    {
      'font-semibold': option.label !== '' && option.label !== String(option.value),
    },
    selectHashCode,
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
    return type === 'multiple' ? (
      <CheckboxIcon checked={selected} />
    ) : type === 'one' && selected ? (
      <FilledSelectedIcon />
    ) : type === 'arrow' ? (
      <ChevronRightIcon />
    ) : type === 'radio' ? (
      <RadioButtonIcon selected={selected} />
    ) : null
  }

  // RENDER
  return (
    <div className={rowClassName} onClick={handleOnClick}>
      <div className={`${selectHashCode} dropdown flex h-full flex-col justify-center`}>
        <div className={`${selectHashCode} dropdown flex flex-row justify-center`}>
          <p className={optionClassName}>{option.value}</p>
          <div className={`${selectHashCode} dropdown relative flex flex-col justify-center`}>
            {getRowIcon()}
            <div className={`${selectHashCode} dropdown absolute inset-0 z-10`} />
          </div>
        </div>
        {option.label !== String(option.value) && (
          <p className={`${selectHashCode} dropdown text-3`}>{option.label}</p>
        )}
      </div>
      {divider && (
        <div className={`${selectHashCode} dropdown border-form-input-default border-b-2`} />
      )}
    </div>
  )
}

export default DropdownRow

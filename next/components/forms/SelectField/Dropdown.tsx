import { EnumOptionsType } from '@rjsf/utils'
import cx from 'classnames'
import { FC } from 'react'

import DropdownRow from './DropdownRow'
import SelectAllDropdownRow from './SelectAllDropdownRow'

interface DropdownProps {
  enumOptions: EnumOptionsType[]
  value: EnumOptionsType[]
  selectAllOption?: boolean
  absolute?: boolean
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  className?: string
  onChooseOne?: (option: EnumOptionsType, close?: boolean) => void
  onUnChooseOne?: (option: EnumOptionsType, close?: boolean) => void
  onChooseMulti?: (option: EnumOptionsType) => void
  onUnChooseMulti?: (option: EnumOptionsType) => void
  onSelectAll?: () => void
}

const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    enumOptions,
    value,
    selectAllOption,
    absolute,
    type,
    divider,
    className,
    onChooseOne,
    onUnChooseOne,
    onChooseMulti,
    onUnChooseMulti,
    onSelectAll,
  } = props

  // STYLES
  const dropdownClassName = cx(
    'rounded-lg border-2 border-form-input-pressed bg-white z-50 py-2',
    {
      'absolute top-2 left-0 right-0': absolute,
    },
    className,
  )

  // HELP FUNCTIONS
  const isSelected = (option: EnumOptionsType): boolean => {
    return !!(value?.find((valueOption) => {
      return valueOption.value === option.value
        && valueOption.label === option.label
    }))
  }

  // RENDER
  return (
    <div className={dropdownClassName}>
      {
        selectAllOption && type === 'multiple' &&
        <SelectAllDropdownRow onSelectAll={() => onSelectAll ? onSelectAll() : null} divider={divider} />
      }
      {
        enumOptions?.map(
          (option, key) =>
            <DropdownRow key={key} option={option} divider={divider} selected={isSelected(option)} type={type}
                         onChooseOne={(opt: EnumOptionsType, close?: boolean) => onChooseOne ? onChooseOne(opt, close) : null}
                         onUnChooseOne={(opt: EnumOptionsType, close?: boolean) => onUnChooseOne ? onUnChooseOne(opt, close) : null}
                         onChooseMulti={(opt: EnumOptionsType) => onChooseMulti ? onChooseMulti(opt) : null}
                         onUnChooseMulti={(opt: EnumOptionsType) => onUnChooseMulti ? onUnChooseMulti(opt) : null} />
        )
      }
    </div>
  )
}

export default Dropdown

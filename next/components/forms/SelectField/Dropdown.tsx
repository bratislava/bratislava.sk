import cx from 'classnames'
import { FC, Key, useState } from 'react'

import DropdownRow from './DropdownRow'
import SelectAllDropdownRow from './SelectAllDropdownRow'
import SelectOption from './SelectOption'

interface DropdownProps {
  options: any
  value?: any
  selectAllOption?: boolean
  absolute?: boolean
  type: 'one' | 'multiple' | 'arrow' | 'radio'
  divider?: boolean
  className?: string
  onChooseOne?: (option: any, close?: boolean) => void
  onUnChooseOne?: (option: any, close?: boolean) => void
  onChooseMulti?: (option: any) => void
  onUnChooseMulti?: (option: any) => void
  onSelectAll?: () => void
}

const Dropdown: FC<DropdownProps> = (props: DropdownProps) => {
  const {
    options,
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

  // STATE
  const [isOneSelected, setIsOneSelected] = useState<boolean>(false)

  // STYLES
  const dropdownClassName = cx(
    'rounded-lg border-2 border-form-input-pressed bg-white z-50 py-2',
    {
      'absolute top-2 left-0 right-0': absolute,
    },
    className,
  )

  // HELP FUNCTIONS
  const isSelected = (option: any): boolean => {
    return !!value?.find((valueOption: { value: any; label: any }) => {
      return valueOption.value === option.value
        && valueOption.label === option.label
    })
  }

  // RENDER
  return (
    <div className={dropdownClassName}>
      {
        selectAllOption && type === 'multiple' &&
        <SelectAllDropdownRow onSelectAll={() => onSelectAll ? onSelectAll() : null} divider={divider} />
      }
      {
        options.map(
          (option: SelectOption, key: number) =>
            <DropdownRow key={key} option={option} divider={divider} selected={isSelected(option)} type={type}
                         onChooseOne={(opt: any, close?: boolean) => onChooseOne ? onChooseOne(opt, close) : null}
                         onUnChooseOne={(opt: any, close?: boolean) => onUnChooseOne ? onUnChooseOne(opt, close) : null}
                         onChooseMulti={(opt: any) => onChooseMulti ? onChooseMulti(opt) : null}
                         onUnChooseMulti={(opt: any) => onUnChooseMulti ? onUnChooseMulti(opt) : null} />
        )
      }
    </div>
  )
}

export default Dropdown

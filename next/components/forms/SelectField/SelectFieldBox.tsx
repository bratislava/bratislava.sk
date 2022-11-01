import React, { FC, ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react'

import Tag from '../Tag'
import SelectOption from './SelectOption'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean
  filter: string
  onRemove: (optionId: number) => void
  onFilterChange: (value: string) => void
}

const SelectFieldBoxComponent: ForwardRefRenderFunction<HTMLInputElement, SelectFieldBoxProps>
  = (props: SelectFieldBoxProps, ref:ForwardedRef<HTMLInputElement>) => {
  // PROPS
  const { value, multiple, filter, onRemove, onFilterChange } = props

  // HELPER FUNCTIONS
  const getInputSize = () => {
    return filter.length <= 1
      ? 1
      : filter.length >= 9
        ? 13
        : filter.length
  }

  // RENDER
  return (
    <div className="flex w-full flex-row flex-wrap gap-2 py-2.5 px-4">
      { /* TAGS */
        value && value.length > 0
          ? (multiple ? value : value.slice(0,1)).map((option, key) =>
              <Tag key={key} text={option.label} size="large" onRemove={() => onRemove(key)} removable/>
            )
          : null
      }
      <input ref={ref} className="border-0 text-p-md outline-none" type="text" size={getInputSize()}
             value={filter} onChange={event => onFilterChange(event.target.value)}/>
    </div>
  )
}

const SelectFieldBox = forwardRef<HTMLInputElement, SelectFieldBoxProps>(SelectFieldBoxComponent)
export default SelectFieldBox

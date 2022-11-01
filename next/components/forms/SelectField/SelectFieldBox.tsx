import React, { FC } from 'react'

import Tag from '../Tag'
import SelectOption from './SelectOption'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean
  filter: string
  onRemove: (optionId: number) => void
  onFilterChange: (value: string) => void
}

const SelectFieldBox: FC<SelectFieldBoxProps> = ({value, multiple, filter, onRemove, onFilterChange}: SelectFieldBoxProps) => {
  // RENDER
  return (
    <div className="flex flex-row flex-wrap gap-2 w-full py-2.5 px-4">
      { /* TAGS */
        value && value.length > 0
          ? (multiple ? value : value.slice(0,1)).map((option, key) =>
              <Tag key={key} text={option.label} size="large" onRemove={() => onRemove(key)} removable/>
            )
          : null
      }
      <input type="text" value={filter} onChange={event => onFilterChange(event.target.value)}/>
    </div>
  )
}

export default SelectFieldBox

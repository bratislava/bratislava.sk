import { FC } from 'react'

import Tag from '../Tag'
import SelectOption from './SelectOption'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean
  onRemove: (optionId: number) => void
}

const SelectFieldBox: FC<SelectFieldBoxProps> = ({value, multiple, onRemove}: SelectFieldBoxProps) => {

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full py-2.5 px-4">
      { /* TAGS */
        value && value.length > 0
          ? (multiple ? value : value.slice(0,1)).map((option, key) =>
              <Tag key={key} text={option.label} size="large" onRemove={() => onRemove(key)} removable/>
            )
          : null
      }
    </div>
  )
}

export default SelectFieldBox

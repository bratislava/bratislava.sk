import { FC } from 'react'

import SelectOption from './SelectOption'
import Tag from '../Tag'

interface SelectFieldBoxProps {
  value?: SelectOption[]
  multiple?: boolean
}

const SelectFieldBox: FC<SelectFieldBoxProps> = ({value, multiple}: SelectFieldBoxProps) => {
  return (
    <div className="w-full">
      {
        value
          ? multiple
            ? value.map((option, key) => <Tag key={key} text={option.label} size="large" removable/>)
            : <Tag text={value[0].label} size="large" removable/>
          : null
      }
    </div>
  )
}

export default SelectFieldBox

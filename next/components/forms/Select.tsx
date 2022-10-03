import React, { forwardRef } from 'react';

interface Option {
  value: string
  text: string
}

interface SelectProps {
  label: string
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  size?: number
  value?: string
  options: Option[]
}

const getMappedOption = (option: Option, key: number) => {
  return <option key={key} value={option.value}>{option.text}</option>
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return (
    <div>
      <select ref={ref} placeholder={props.placeholder}>
        { props.options.map(getMappedOption) }
      </select>
    </div>
  )
})



export default Select;

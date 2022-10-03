import cx from 'classnames'
import React, { forwardRef, useState } from 'react'


interface SelectProps {
  label: string
  name: string
  options: string[]
  value?: string
  placeholder?: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  multiple?: boolean
  size?: number
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const [ valueState, setValueState ] = useState<string>(props.value || '')

  const labelStyle = cx(
    'relative mb-1 text-default font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs': props.required}
  )

  const selectStyle = cx(
    'w-full max-w-xs px-4 py-3 border-2 border-universal-gray-200 text-default rounded-lg caret-universal-gray-800 focus:outline-none focus:border-universal-gray-800',
    {
      // hover
      'hover:border-universal-gray-500': !props.disabled,
      // error
      'border-red-brick hover:border-red-brick focus:border-error': props.errorMessage,
      // disabled
      'opacity-50': props.disabled,
    }
  )

  return (
    <div className="flex w-max flex-col">
      <div>
        <label htmlFor={props.name} className={labelStyle}>{props.label}</label>
      </div>
      <div className="relative w-max">
        <input name={props.name} list={`${props.name}-list`}
               type="text" className={selectStyle}
               placeholder={props.placeholder} value={valueState}
               onChange={(event) => setValueState(event.target.value)}
               multiple={props.multiple}/>
        <datalist id={`${props.name}-list`}>
          { props.options.map((option, key) => <option key={key} value={option} />) }
        </datalist>
      </div>
    </div>
  )
})



export default Select;

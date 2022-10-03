import cx from 'classnames'
import React, { forwardRef, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'


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
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      name: props.name,
      placeholder: props.placeholder,
      value: props.value,
      isRequired: props.required,
      onChange(value) {
        setValueState(value)
      },
      isReadOnly: props.disabled,
    },
    ref as RefObject<HTMLInputElement>
  )


  const labelStyle = cx(
    'relative mb-1 text-default font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs': props.required}
  )

  const selectStyle = cx(
    'w-full max-w-xs mx-4 my-3 border-2 border-universal-gray-200 rounded-lg caret-universal-gray-800 focus:outline-none focus:border-universal-gray-800',
    {
      // hover
      'hover:border-universal-gray-500': !props.disabled,
      // error
      'border-red-brick hover:border-red-brick focus:border-error': props.errorMessage,
      // disabled
      'opacity-50': props.disabled,
    }
  )

  const inputStyle = cx(
    ' text-default rounded-lg px-4 py-3'
  )

  const errorStyle = cx(
      'mt-1 text-sm text-error'
  )

  return (
    <div className="flex w-max flex-col">
      <div>
        <label className={labelStyle} {...labelProps}>{props.label}</label>
      </div>
      <div className="relative w-max">
        <div className={selectStyle}>
          <input className={inputStyle} {...inputProps} />
        </div>
        <div>

        </div>
        {
          props.errorMessage && (
            <div className={errorStyle} {...errorMessageProps}>
              {props.errorMessage}
            </div>
          )
        }
      </div>
    </div>
  )
})



export default Select;

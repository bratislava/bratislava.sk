import cx from 'classnames'
import React, { forwardRef, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'
import ChevronDown from '../../assets/images/chevron-down-small.svg'
import ChevronUp from '../../assets/images/chevron-up-small.svg'

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
  tooltip?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  // STATE
  const [ valueState, setValueState ] = useState<string>(props.value || '')
  const [ placeholderState, setPlaceholderState ] = useState<string>(props.placeholder || '')
  const [ isDropdownOpened, setIsDropdownOpened ] = useState<boolean>(false)


  // EVENT HANDLERS
  const onInputChange = (value: string) => {
    setValueState(value)
    if (!value) {
      setPlaceholderState(props.placeholder || '')
    } else {
      setPlaceholderState('')
    }
  }

  const handleOnClickChevron = () => {
    if (!props.disabled) {
      setIsDropdownOpened(!isDropdownOpened)
    }
  }

  // REACT-ARIA
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      name: props.name,
      placeholder: placeholderState,
      value: valueState,
      isRequired: props.required,
      isReadOnly: props.disabled,
      onChange: onInputChange,
    },
    ref as RefObject<HTMLInputElement>
  )

  // STYLES
  const labelStyle = cx(
    'relative mb-1 text-default font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs': props.required}
  )

  const descriptionStyle = cx(
    'mb-1 text-sm text-universal-black'
  )

  const selectStyle = cx(
    'flex flex-row bg-white w-full max-w-xs border-2 border-universal-gray-200 rounded-lg caret-universal-gray-800 focus:border-universal-gray-800',
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
    'w-full max-w-xs  text-default rounded-lg px-4 py-3 focus:outline-none'
  )

  const errorStyle = cx(
      'mt-1 text-sm text-error'
  )

  const dropdownStyle = cx(
    'flex-column flex cursor-pointer items-center p-2'
  )

  // RENDER
  return (
    <section className="flex w-max flex-col">
      {/* LABEL */}
      <div>
        <label htmlFor={props.name} className={labelStyle} {...labelProps}>{props.label}</label>
      </div>
      { /* DESCRIPTION */
        props.description && (
          <div {...descriptionProps} className={descriptionStyle}>
            {props.description}
          </div>
        )
      }
      {/* MAIN SELECT PART */}
      <div className="relative w-max">
        {/* INPUT PART */}
        <div className={selectStyle}>
          <input className={inputStyle} {...inputProps} />
          <div className={dropdownStyle} onClick={handleOnClickChevron}>
            { isDropdownOpened ? <ChevronUp/> : <ChevronDown/> }
          </div>
        </div>
      </div>
      {/* ERROR MESSAGE */
        props.errorMessage && (
          <div className={errorStyle} {...errorMessageProps}>
            {props.errorMessage}
          </div>
        )
      }
    </section>
  )
})



export default Select;

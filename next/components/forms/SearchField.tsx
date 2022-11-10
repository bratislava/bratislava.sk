import ResetIcon from '@assets/images/forms/circle-filled-reset.svg'
import DarkSearchIcon from '@assets/images/forms/dark-search-icon.svg'
import cx from 'classnames'
import { ReactNode, useRef, useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface InputBase {
  label: string
  placeholder: string
  errorMessage?: string
  description?: string
  className?: string
  value?: string
  leftIcon?: ReactNode
  required?: boolean
  resetIcon?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (e: string) => void
}

const SearchField = (
  {
    label,
    placeholder,
    errorMessage,
    description,
    tooltip,
    required,
    value = '',
    disabled,
    leftIcon,
    resetIcon,
    className,
    ...rest
  }: InputBase,
) => {
  const [valueState, setValueState] = useState<string>(value)
  const ref = useRef<HTMLInputElement>(null)
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...rest,
      placeholder,
      label,
      errorMessage,
      value: valueState,
      description,
      onChange(inputValue){
        if (rest.onChange) {
          rest.onChange(inputValue)
        }
        setValueState(inputValue)
      },
      isRequired: required,
      isDisabled: disabled,
    },
    ref,
  )
  const resetHandler = () => {
    if (rest.onChange) {
      rest.onChange('')
    }
    setValueState('')
  }

  const style = cx(
    'w-full pl-12.5 px-4 py-2.5 border-2 border-gray-200 text-button-1 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700',
    className,
    {
      // conditions
      'pl-12.5': leftIcon,
      // hover
      'hover:border-gray-400': !disabled,

      // error
      'border-error hover:border-error focus:border-error': errorMessage && !disabled,

      // disabled
      'border-gray-300 bg-gray-100': disabled,
    },
  )

  return (
    <div className='flex w-full max-w-xs flex-col'>
      <FieldHeader
        label={label}
        labelProps={labelProps}
        htmlFor={inputProps?.id || ''}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
        tooltip={tooltip}
      />
      <div className='relative'>
        <i className='absolute inset-y-1/2 left-5 h-5 w-5 -translate-y-2/4'><DarkSearchIcon /></i>
        <input {...inputProps} ref={ref} className={style} />
        {resetIcon && valueState && (
          <i
            role='button'
            tabIndex={0}
            onKeyDown={resetHandler}
            onClick={resetHandler}
            className='absolute inset-y-1/2 right-5 h-5 w-5 -translate-y-2/4 cursor-pointer'
          >
            <ResetIcon />
          </i>
        )}
      </div>
      {!disabled && <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />}
    </div>
  )
}

export default SearchField

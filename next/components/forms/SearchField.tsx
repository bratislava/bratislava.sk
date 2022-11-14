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
    'w-full pl-12.5 px-4 py-2.5 border-2 border-form-input-default text-button-1 leading-8 rounded-lg caret-form-input-pressed focus:outline-none focus:border-form-input-pressed focus:placeholder:text-transparent',
    className,
    {
      // conditions
      'pl-[52px]': leftIcon,
      // hover
      'hover:border-form-input-hover': !disabled,

      // error
      'border-error hover:border-error focus:border-error': errorMessage && !disabled,

      // disabled
      'opacity-50 border-form-input-disabled': disabled,
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
        <i className={cx('absolute inset-y-1/2 left-5 h-5 w-5 -translate-y-2/4', {'opacity-50' : disabled})}><DarkSearchIcon /></i>
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

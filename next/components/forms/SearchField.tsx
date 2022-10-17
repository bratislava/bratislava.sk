import cx from 'classnames'
import { forwardRef, ReactNode, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'

import ResetIcon from '../../assets/images/forms/circle-filled-reset.svg'
import DarkSearchIcon from '../../assets/images/forms/dark-search-icon.svg'
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
}

const SearchField = forwardRef<HTMLInputElement, InputBase>(
  (
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
    },
    ref
  ) => {
    const [valueState, setValueState] = useState<string>(value)
    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...rest,
        placeholder,
        value,
        label,
        errorMessage,
        description,
        onChange(value) {
          setValueState(value)
        },
        isRequired: required,
        isDisabled: disabled,
      },
      ref as RefObject<HTMLInputElement>
    )

    const style = cx(
      'w-full pl-12.5 px-4 py-2.5 border-2 border-form-input-default text-default leading-8 rounded-lg caret-form-input-pressed focus:outline-none focus:border-form-input-pressed',
      className,
      {
        // conditions
        'pl-12.5': leftIcon,
        // hover
        'hover:border-form-input-hover': !disabled,

        // error
        'border-error hover:border-error focus:border-error': errorMessage && !disabled,

        // disabled
        'opacity-50 border-form-input-disabled': disabled,
      }
    )

    return (
      <div className="flex w-full max-w-xs flex-col">
        <FieldHeader
          label={label}
          labelProps={labelProps}
          htmlFor={inputProps?.id || ''}
          description={description}
          descriptionProps={descriptionProps}
          required={required}
          tooltip={tooltip}
        />
        <div className="relative">
          <i className="absolute inset-y-1/2 left-5 h-5 w-5 -translate-y-2/4"><DarkSearchIcon/></i>
          <input {...inputProps} ref={ref} value={valueState} className={style} />
          {resetIcon && valueState && (
            <i
              role="button"
              tabIndex={0}
              onKeyDown={() => setValueState('')}
              onClick={() => setValueState('')}
              className="absolute inset-y-1/2 right-5 h-5 w-5 -translate-y-2/4 cursor-pointer"
            >
              <ResetIcon />
            </i>
          )}
        </div>
        {!disabled && <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />}
      </div>
    )
  }
)

export default SearchField

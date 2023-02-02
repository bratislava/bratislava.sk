import ResetIcon from '@assets/images/forms/circle-filled-reset.svg'
import DarkSearchIcon from '@assets/images/forms/dark-search-icon.svg'
import cx from 'classnames'
import { RefObject, useRef, useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'
import FieldHeader from '../../info-components/FieldHeader'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

interface InputBase {
  label: string
  placeholder: string
  errorMessage?: string[]
  description?: string
  className?: string
  value?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  resetIcon?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (e: string) => void
}

const SearchField = ({
  label,
  placeholder,
  errorMessage = [],
  description,
  tooltip,
  required,
  explicitOptional,
  value = '',
  disabled,
  resetIcon,
  className,
  ...rest
}: InputBase) => {
  const [valueState, setValueState] = useState<string>(value)
  const ref = useRef<HTMLInputElement>(null)
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...rest,
      placeholder,
      value,
      label,
      errorMessage,
      description,
      onChange(value) {
        setValueState(value.startsWith(' ') ? value.trim() : value)
      },
      isRequired: required,
      isDisabled: disabled,
    },
    ref as RefObject<HTMLInputElement>,
  )

  const style = cx(
    'sm:text-16 text-p3 sm:leading-6 leading-5 w-full px-12 sm:px-[52px] py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 focus:placeholder-transparent',
    className,
    {
      // hover
      'hover:border-gray-400': !disabled,

      // error
      'border-error hover:border-error focus:border-error': errorMessage?.length > 0 && !disabled,

      // disabled
      'border-gray-300 bg-gray-100': disabled,
    },
  )

  return (
    <div className="flex w-full max-w-xs flex-col">
      <FieldHeader
        label={label}
        labelProps={labelProps}
        htmlFor={inputProps?.id}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
        explicitOptional={explicitOptional}
        tooltip={tooltip}
      />
      <div className="relative">
        <i
          className={cx(
            'flex items-center justify-center absolute inset-y-1/2 left-3 sm:left-4 h-6 w-6 -translate-y-2/4',
            {
              'opacity-50': disabled,
            },
          )}
        >
          <DarkSearchIcon />
        </i>
        <input
          {...inputProps}
          ref={ref}
          value={valueState}
          name={inputProps.id}
          className={style}
        />
        {resetIcon && valueState && (
          <i
            role="button"
            tabIndex={0}
            onKeyDown={() => setValueState('')}
            onClick={() => setValueState('')}
            className="flex items-center justify-center absolute inset-y-1/2 right-3 sm:right-4 h-6 w-6 -translate-y-2/4 cursor-pointer"
          >
            <ResetIcon />
          </i>
        )}
      </div>
      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
      )}
    </div>
  )
}

export default SearchField

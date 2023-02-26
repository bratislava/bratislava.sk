import cx from 'classnames'
import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useTextField } from 'react-aria'

import FieldHeader from '../../info-components/FieldHeader'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

type TimeFieldBase = {
  label?: string
  helptext?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  children?: ReactNode
  disabled?: boolean
  errorMessage?: string[]
  hour: string
  minute: string
  isOpen: boolean
  onChange?: (value?: string) => void
  value?: string
  readOnly?: boolean
  setIsInputEdited?: React.Dispatch<React.SetStateAction<boolean>>
  setPrevValue?: React.Dispatch<React.SetStateAction<string>>
}

const TimeField = ({
  label,
  helptext,
  tooltip,
  required,
  explicitOptional,
  children,
  disabled,
  errorMessage = [],
  hour,
  minute,
  onChange,
  value = '',
  isOpen,
  setIsInputEdited,
  readOnly,
  ...rest
}: TimeFieldBase) => {
  const [inputValue, setInputValue] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(onChange ? value : inputValue)
  }, [inputValue, onChange, value])

  const { labelProps, inputProps, descriptionProps } = useTextField(
    {
      label,
      description: helptext,
      placeholder: 'HH:MM',
      isRequired: required,
      isDisabled: disabled,
      value: onChange && value ? value : inputValue,
      onChange(val) {
        setIsInputEdited?.(true)
        if (onChange) {
          onChange(val)
          rest?.setPrevValue?.(val)
        } else {
          setInputValue(val)
        }
      },
      errorMessage,
      ...rest,
    },
    ref as RefObject<HTMLInputElement>,
  )
  const timeFieldStyle = cx(
    'sm:text-16 w-full max-w-xs flex rounded-lg bg-white border-2 px-3 sm:px-4 py-1.5 sm:py-2.5 focus:border-gray-700 focus-visible:outline-none placeholder:text-gray-500',
    {
      'hover:border-gray-400 border-gray-200': !disabled && !isOpen,
      'border-error focus:border-error focus-visible:outline-none hover:border-error':
        errorMessage?.length > 0,
      'pointer-events-none border-gray-300 bg-gray-100 text-gray-500': disabled,
      'border-gray-700': isOpen && !disabled && !(errorMessage?.length > 0),
    },
  )

  return (
    <>
      <FieldHeader
        label={label || ''}
        htmlFor={inputProps.id}
        labelProps={labelProps}
        tooltip={tooltip}
        helptext={helptext}
        descriptionProps={descriptionProps}
        required={required}
        explicitOptional={explicitOptional}
      />
      <div className="relative">
        <input
          {...inputProps}
          readOnly={readOnly}
          className={timeFieldStyle}
          ref={ref}
          name={inputProps.id}
        />
        <div className="absolute right-3 sm:right-4 top-2/4 flex -translate-y-2/4 items-center">
          {children}
        </div>
      </div>
    </>
  )
}

export default TimeField

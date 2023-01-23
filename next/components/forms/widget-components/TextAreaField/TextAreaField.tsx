import cx from 'classnames'
import React, { useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'
import FieldHeader from '../../info-components/FieldHeader'

interface TextAreaBase {
  label: string
  placeholder?: string
  errorMessage?: string[]
  description?: string
  className?: string
  defaultValue?: string
  value?: string
  required?: boolean
  explicitOptional?: 'none' | 'right' | 'left'
  disabled?: boolean
  tooltip?: string
  onChange?: (value?: string) => void
}

const TextAreaField = ({
  label,
  placeholder,
  errorMessage = [],
  description,
  tooltip,
  required,
  explicitOptional,
  value,
  disabled,
  className,
  defaultValue,
  onChange,
  ...rest
}: TextAreaBase) => {
  const [valueState, setValueState] = useState<string>('')
  const [useDefaultValue, setUseDefaultValue] = useState<boolean>(true)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const ref = React.useRef<HTMLTextAreaElement>(null)

  const displayValue =
    useDefaultValue && defaultValue && !value ? defaultValue : onChange ? value : valueState

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...rest,
      placeholder,
      value: displayValue,
      label,
      errorMessage,
      description,
      inputElementType: 'textarea',
      onChange(inputValue) {
        if (onChange) {
          onChange(inputValue.startsWith(' ') ? inputValue.trim() : inputValue)
        } else {
          setValueState(inputValue.startsWith(' ') ? inputValue.trim() : inputValue)
        }
        setUseDefaultValue(false)
      },
      isRequired: required,
      isDisabled: disabled,
    },
    ref,
  )
  const containerStyle = cx(
    'text-20 flex flex-col bg-gray-0 border-2 border-gray-200 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 resize-none overflow-hidden',
    className,
    {
      'hover:border-gray-400': !disabled && !isFocused,
      'border-error hover:border-error focus:border-error': errorMessage?.length > 0 && !disabled,
      'border-gray-300 bg-gray-100': disabled,
      'border-gray-700 hover:border-gray-700': !disabled && isFocused,
    },
  )

  const textareaStyle = cx(
    'overflow-y-scroll px-4 py-2.5 bg-gray-0 rounded-lg caret-gray-700 focus:outline-none resize-none focus:placeholder:text-transparent h-full w-full',
  )
  return (
    <div className="flex w-full flex-col">
      <FieldHeader
        label={label}
        labelProps={labelProps}
        htmlFor={inputProps.id}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
        explicitOptional={explicitOptional}
        tooltip={tooltip}
      />
      <div className={containerStyle}>
        <textarea
          {...inputProps}
          ref={ref}
          name={inputProps.id}
          className={textareaStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
      )}
    </div>
  )
}

export default TextAreaField

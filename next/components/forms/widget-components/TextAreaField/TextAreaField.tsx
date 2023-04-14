import cx from 'classnames'
import React, { useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'
import FieldHeader from '../../info-components/FieldHeader'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

interface TextAreaBase {
  label: string
  placeholder?: string
  errorMessage?: string[]
  helptext?: string
  className?: string
  defaultValue?: string
  value?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  disabled?: boolean
  tooltip?: string
  onChange?: (value?: string) => void
}

const TextAreaField = ({
  label,
  placeholder,
  errorMessage = [],
  helptext,
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
      description: helptext,
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
    'text-default-respo flex resize-none flex-col overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-0 caret-gray-700 focus:border-gray-700 focus:outline-none',
    className,
    {
      'hover:border-gray-400': !disabled && !isFocused,
      'border-negative-700 hover:border-negative-700 focus:border-negative-700':
        errorMessage?.length > 0 && !disabled,
      'border-gray-300 bg-gray-100': disabled,
      'border-gray-700 hover:border-gray-700': !disabled && isFocused,
    },
  )

  const textareaStyle = cx(
    'h-full w-full resize-none overflow-y-scroll rounded-lg bg-gray-0 px-3 py-2 caret-gray-700 focus:outline-none focus:placeholder:text-transparent sm:px-4 sm:py-3',
  )
  return (
    <div className="flex w-full flex-col">
      <FieldHeader
        label={label}
        labelProps={labelProps}
        htmlFor={inputProps.id}
        helptext={helptext}
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

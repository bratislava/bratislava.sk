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
  explicitOptional?: boolean
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
          onChange(inputValue)
        } else {
          setValueState(inputValue)
        }
        setUseDefaultValue(false)
      },
      isRequired: required,
      isDisabled: disabled,
    },
    ref,
  )
  const style = cx(
    'text-button-1 overflow-auto px-4 py-2.5 bg-gray-0 border-2 border-gray-200 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 resize-none focus:placeholder:text-transparent',
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
      <textarea {...inputProps} ref={ref} name={inputProps.id} className={style} />
      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
      )}
    </div>
  )
}

export default TextAreaField

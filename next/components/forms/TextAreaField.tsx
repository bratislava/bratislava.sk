import cx from 'classnames'
import React, { useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface TextAreaBase {
  label: string
  placeholder?: string
  errorMessage?: string
  description?: string
  className?: string
  defaultValue?: string
  value?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (value?: string) => void
}

const TextAreaField = ({
  label,
  placeholder,
  errorMessage,
  description,
  tooltip,
  required,
  value = '',
  disabled,
  className,
  ...rest
}: TextAreaBase) => {
  const [, setValueState] = useState<string>(value)
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...rest,
      placeholder,
      value: value || ref.current?.value,
      label,
      errorMessage,
      description,
      inputElementType: 'textarea',
      onChange(inputValue) {
        if (rest.onChange) {
          rest.onChange(inputValue)
        } else {
          setValueState(inputValue)
        }
      },
      isRequired: required,
      isDisabled: disabled,
    },
    ref,
  )
  const style = cx(
    'w-full px-4 py-2.5 w-320 h-196 border-2 border-gray-200 text-button-1 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 resize-none',
    className,
    {
      // hover
      'hover:border-gray-400': !disabled,

      // error
      'border-error hover:border-error focus:border-error': errorMessage && !disabled,

      // disabled
      'border-gray-300 bg-gray-100': disabled,
    },
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
      <textarea {...inputProps} ref={ref} className={style} />
      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
      )}
    </div>
  )
}

export default TextAreaField

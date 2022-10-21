import cx from 'classnames'
import React, { useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface TextAreaBase {
  label: string
  placeholder: string
  errorMessage?: string
  description?: string
  className?: string
  defaultValue?: string
  value?: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (e: string) => void
}

const TextAreaField = (
  {
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
  }: TextAreaBase,
) => {
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
        if(rest.onChange) {
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
    'w-full px-4 py-2.5 w-320 h-196 border-2 border-form-input-default text-default leading-8 rounded-lg caret-form-input-pressed focus:outline-none focus:border-form-input-pressed resize-none',
    className,
    {
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
      <textarea {...inputProps} ref={ref} className={style} />
      {!disabled && <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />}
    </div>
  )
}

export default TextAreaField
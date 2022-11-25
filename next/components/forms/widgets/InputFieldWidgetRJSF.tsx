import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import InputField from 'components/forms/InputField'
import React from 'react'

type InputFieldRJSFOptions = {
  tooltip?: string
  description?: string
  className?: string
  resetIcon?: boolean
  leftIcon?: boolean
}

interface InputFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: InputFieldRJSFOptions
  value: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
}

const InputFieldWidgetRJSF = ({
  label,
  options,
  placeholder = '',
  errorMessage,
  required,
  value = '',
  disabled,
}: InputFieldWidgetRJSFProps) => {
  const { description, tooltip, className, resetIcon, leftIcon } = options
  return (
    <InputField
      label={label}
      placeholder={placeholder}
      value={value}
      errorMessage={errorMessage}
      required={required}
      disabled={disabled}
      description={description}
      tooltip={tooltip}
      className={className}
      resetIcon={resetIcon}
      leftIcon={leftIcon}
    />
  )
}
export default InputFieldWidgetRJSF

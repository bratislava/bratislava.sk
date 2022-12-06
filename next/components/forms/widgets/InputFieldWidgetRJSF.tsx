import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import InputField from 'components/forms/InputField'
import React from 'react'

type InputFieldRJSFOptions = {
  tooltip?: string
  type?: 'text' | 'password'
  description?: string
  className?: string
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  explicitOptional?: boolean
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
  onChange: (value?: string) => void
}

const InputFieldWidgetRJSF = ({
  label,
  options,
  placeholder = '',
  errorMessage,
  required,
  value,
  disabled,
  onChange,
}: InputFieldWidgetRJSFProps) => {
  const { description, tooltip, className, resetIcon, leftIcon, explicitOptional, type } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  return (
    <InputField
      label={label}
      type={type}
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
      onChange={handleOnChange}
      explicitOptional={explicitOptional}
    />
  )
}
export default InputFieldWidgetRJSF

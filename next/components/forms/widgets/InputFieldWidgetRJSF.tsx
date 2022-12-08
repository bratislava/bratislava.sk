import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import InputField from 'components/forms/InputField'
import React from 'react'

type Spacing = 'large' | 'default' | 'small' | 'none'

type InputFieldRJSFOptions = {
  tooltip?: string
  type?: string
  description?: string
  className?: string
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  explicitOptional?: boolean
  spaceBottom?: Spacing
  spaceTop?: Spacing
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
  const {
    description,
    tooltip,
    className,
    resetIcon,
    leftIcon,
    explicitOptional,
    type,
    spaceBottom = 'none',
    spaceTop = 'default',
  } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  const spacingHandler = (space: Spacing): string => {
    switch (space) {
      case 'none':
        return '0'
      case 'large':
        return '40px'
      case 'default':
        return '32px'
      case 'small':
        return '24px'
      default:
        return '0'
    }
  }
  return (
    <div
      style={{
        paddingBottom: spacingHandler(spaceBottom),
        paddingTop: spacingHandler(spaceTop),
      }}
    >
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
    </div>
  )
}
export default InputFieldWidgetRJSF

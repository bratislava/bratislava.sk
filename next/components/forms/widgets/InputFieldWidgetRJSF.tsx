import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import { formSpacingHandler, FormSpacingType } from '@utils/formsHelper'
import InputField from 'components/forms/InputField'
import React from 'react'

type InputFieldRJSFOptions = {
  tooltip?: string
  type?: string
  description?: string
  className?: string
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  explicitOptional?: boolean
  spaceBottom?: FormSpacingType
  spaceTop?: FormSpacingType
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
  return (
    <div
      style={{
        paddingBottom: formSpacingHandler(spaceBottom),
        paddingTop: formSpacingHandler(spaceTop),
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

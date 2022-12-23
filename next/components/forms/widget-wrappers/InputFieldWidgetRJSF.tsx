import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import cx from 'classnames'
import { WidgetOptions } from 'components/forms/types/WidgetOptions'
import InputField from 'components/forms/widget-components/InputField/InputField'
import WidgetWrapper from 'components/forms/widget-wrappers/WidgetWrapper'
import React from 'react'

type InputFieldRJSFOptions = {
  type?: 'text' | 'password'
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  size?: 'large' | 'default' | 'small'
} & WidgetOptions

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
    size = 'default',
    spaceBottom = 'default',
    spaceTop = 'none',
  } = options

  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  return (
    <WidgetWrapper
      className={cx({
        'w-full': size === 'large',
        'max-w-[388px]': size === 'default',
        'max-w-[200px]': size === 'small',
      })}
      spaceBottom={spaceBottom}
      spaceTop={spaceTop}
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
    </WidgetWrapper>
  )
}
export default InputFieldWidgetRJSF

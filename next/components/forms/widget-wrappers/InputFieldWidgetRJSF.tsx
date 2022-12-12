import { StrictRJSFSchema, WidgetProps } from '@rjsf/utils'
import cx from 'classnames'
import InputField from 'components/forms/widget-components/InputField/InputField'

type InputFieldRJSFOptions = {
  tooltip?: string
  type?: 'text' | 'password'
  description?: string
  className?: string
  resetIcon?: boolean
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  explicitOptional?: boolean
  size?: 'large' | 'default' | 'small'
}

interface InputFieldWidgetRJSFProps extends WidgetProps {
  label: string
  options: InputFieldRJSFOptions
  value: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  schema: StrictRJSFSchema
  onChange: (value?: string) => void
  rawErrors?: string[]
}

const InputFieldWidgetRJSF = ({
  label,
  options,
  placeholder = '',
  required,
  value,
  disabled,
  onChange,
  rawErrors,
}: InputFieldWidgetRJSFProps) => {
  const { description, tooltip, className, resetIcon, leftIcon, explicitOptional, type, size } =
    options
  const handleOnChange = (newValue?: string) => (newValue ? onChange(newValue) : onChange())

  const sizeHandler = (): string => {
    switch (size) {
      case 'large':
        return 'w-full'
      case 'default':
        return 'max-w-[388px]'
      case 'small':
        return 'max-w-[200px]'

      default:
        return 'w-full'
    }
  }
  return (
    <div className={cx('', sizeHandler())}>
      <InputField
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        errorMessage={rawErrors}
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

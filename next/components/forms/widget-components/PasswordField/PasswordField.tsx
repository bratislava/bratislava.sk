import HiddenIcon from '@assets/images/forms/hidden.svg'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { forwardRef, useState } from 'react'

interface Props {
  label: string
  placeholder: string
  errorMessage?: string[]
  description?: string
  className?: string
  value?: string
  required?: boolean
  explicitOptional?: 'none' | 'right' | 'left'
  disabled?: boolean
  tooltip?: string
  onChange?: (value?: string) => void
}

const PasswordField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      errorMessage = [],
      description,
      tooltip,
      required,
      explicitOptional,
      value = '',
      disabled,
      className,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const [type, setType] = useState<'password' | 'text'>('password')

    return (
      <InputField
        type={type}
        label={label}
        placeholder={placeholder}
        errorMessage={errorMessage}
        description={description}
        value={value}
        className={className}
        required={required}
        disabled={disabled}
        tooltip={tooltip}
        onChange={onChange}
        explicitOptional={explicitOptional}
        ref={ref}
        endIcon={
          <button
            type="button"
            tabIndex={0}
            className="absolute inset-y-1/2 right-5 h-5 w-5 -translate-y-2/4 cursor-pointer"
            onPointerUp={() => setType('password')}
            onPointerDown={() => setType('text')}
          >
            <HiddenIcon />
          </button>
        }
        {...rest}
      />
    )
  },
)

export default PasswordField

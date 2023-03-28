import HiddenIcon from '@assets/images/forms/hidden.svg'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { forwardRef, useState } from 'react'

import { ExplicitOptionalType } from '../../types/ExplicitOptional'

interface Props {
  label: string
  placeholder: string
  errorMessage?: string[]
  helptext?: string
  className?: string
  value?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  disabled?: boolean
  tooltip?: string
  autoComplete?: string
  onChange?: (value?: string) => void
}

const PasswordField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      errorMessage = [],
      helptext,
      tooltip,
      required,
      explicitOptional,
      value = '',
      disabled,
      className,
      onChange,
      autoComplete,
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
        helptext={helptext}
        value={value}
        className={className}
        required={required}
        disabled={disabled}
        tooltip={tooltip}
        onChange={onChange}
        explicitOptional={explicitOptional}
        ref={ref}
        autoComplete={autoComplete}
        endIcon={
          <button
            type="button"
            tabIndex={0}
            className="absolute inset-y-1/2 right-3 flex h-6 w-6 -translate-y-2/4 cursor-pointer items-center justify-center sm:right-4"
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

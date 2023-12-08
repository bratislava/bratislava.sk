import HiddenIcon from '@assets/images/forms/hidden.svg'
import Button from '@components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import { useTranslations } from 'next-intl'
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

    const t = useTranslations()

    const handlePointerDown = () => {
      setType('text')
    }

    const handlePointerUp = () => {
      setType('password')
    }

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
          <Button
            className="absolute inset-y-1/2 right-3 flex h-6 w-6 -translate-y-2/4 cursor-pointer items-center justify-center sm:right-4"
            aria-label={t('passwordReveal')}
            icon={<HiddenIcon />}
            onPressEnd={() => handlePointerUp()}
            onPressStart={() => handlePointerDown()}
          />
        }
        {...rest}
      />
    )
  },
)

export default PasswordField

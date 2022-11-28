import cx from 'classnames'
import { forwardRef, ReactNode, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'

import CallIcon from '../../assets/images/forms/call.svg'
import ResetIcon from '../../assets/images/forms/circle-filled-reset.svg'
import LockIcon from '../../assets/images/forms/lock.svg'
import MailIcon from '../../assets/images/forms/mail.svg'
import PersonIcon from '../../assets/images/forms/person.svg'
import FieldErrorMessage from './FieldErrorMessage'
import FieldHeader from './FieldHeader'

interface InputBase {
  label: string
  placeholder: string
  errorMessage?: string
  description?: string
  className?: string
  value?: string
  leftIcon?: 'person' | 'mail' | 'call' | 'lock'
  required?: boolean
  resetIcon?: boolean
  disabled?: boolean
  tooltip?: string
}

const InputField = forwardRef<HTMLInputElement, InputBase>(
  (
    {
      label,
      placeholder,
      errorMessage,
      description,
      tooltip,
      required,
      value = '',
      disabled,
      leftIcon,
      resetIcon,
      className,
      ...rest
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState<string>(value)
    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...rest,
        placeholder,
        value,
        label,
        errorMessage,
        description,
        onChange(value) {
          setValueState(value)
        },
        isRequired: required,
        isDisabled: disabled,
      },
      ref as RefObject<HTMLInputElement>,
    )

    const leftIconSwitcher = (icon: string): ReactNode | null => {
      switch (icon) {
        case 'person':
          return <PersonIcon />
        case 'mail':
          return <MailIcon />
        case 'call':
          return <CallIcon />
        case 'lock':
          return <LockIcon />
        default:
          return null
      }
    }

    const style = cx(
      'w-full px-4 py-2.5 border-2 border-gray-200 text-20 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 focus:placeholder:opacity-0',
      className,
      {
        // conditions
        'pl-[52px]': leftIcon,
        // hover
        'hover:border-gray-400': !disabled,

        // error
        'border-error hover:border-error focus:border-error': errorMessage && !disabled,

        // disabled
        'border-gray-300 bg-gray-100': disabled,
      },
    )

    return (
      <div className="flex w-full max-w-xs flex-col">
        <FieldHeader
          label={label}
          labelProps={labelProps}
          htmlFor={inputProps?.id || ''}
          description={description}
          descriptionProps={descriptionProps}
          required={required}
          tooltip={tooltip}
        />
        <div className="relative">
          {leftIcon && (
            <i
              className={cx('absolute left-4 h-full flex items-center w-4-translate-y-2/4', {
                'opacity-50': disabled,
              })}
            >
              {leftIconSwitcher(leftIcon)}
            </i>
          )}
          <input {...inputProps} ref={ref} value={valueState} className={style} />
          {resetIcon && valueState && (
            <i
              role="button"
              tabIndex={0}
              onKeyDown={() => setValueState('')}
              onClick={() => setValueState('')}
              className="absolute inset-y-1/2 right-5 h-5 w-5 -translate-y-2/4 cursor-pointer"
            >
              <ResetIcon />
            </i>
          )}
        </div>
        {!disabled && (
          <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
        )}
      </div>
    )
  },
)

export default InputField

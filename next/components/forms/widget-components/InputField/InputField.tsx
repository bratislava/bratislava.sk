import CallIcon from '@assets/images/forms/call.svg'
import ResetIcon from '@assets/images/forms/circle-filled-reset.svg'
import LockIcon from '@assets/images/forms/lock.svg'
import MailIcon from '@assets/images/forms/mail.svg'
import PersonIcon from '@assets/images/forms/person.svg'
import cx from 'classnames'
import { forwardRef, ReactNode, RefObject, useEffect, useState } from 'react'
import { useTextField } from 'react-aria'

import FieldErrorMessage from '../../info-components/FieldErrorMessage'
import FieldHeader from '../../info-components/FieldHeader'
import { ExplicitOptionalType } from '../../types/ExplicitOptional'

export type LeftIconVariants = 'person' | 'mail' | 'call' | 'lock'
export type InputType = 'text' | 'password'
export type SizeType = 'large' | 'default' | 'small'

export const isLeftIconVariant = (value: string): value is LeftIconVariants => {
  const list: LeftIconVariants[] = ['person', 'mail', 'call', 'lock']
  return list.includes(value as LeftIconVariants)
}

export const isInputSize = (value: string): value is SizeType => {
  const list: SizeType[] = ['large', 'default', 'small']
  return list.includes(value as SizeType)
}

export type InputBase = {
  label: string
  type?: InputType
  placeholder: string
  errorMessage?: string[]
  description?: string
  className?: string
  value?: string
  leftIcon?: LeftIconVariants
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  resetIcon?: boolean
  disabled?: boolean
  tooltip?: string
  onChange?: (value?: string) => void
  size?: SizeType
  endIcon?: ReactNode
}

const InputField = forwardRef<HTMLInputElement, InputBase>(
  (
    {
      label,
      type,
      placeholder,
      errorMessage = [],
      description,
      tooltip,
      required,
      explicitOptional,
      value = '',
      disabled,
      leftIcon,
      resetIcon,
      className,
      size,
      onChange,
      endIcon,
      ...rest
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState<string>(value)

    useEffect(() => {
      setValueState(onChange ? value : valueState)
    }, [valueState, value, onChange])

    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...rest,
        placeholder,
        value: onChange && value ? value : valueState,
        type: type !== 'password' ? 'text' : type,
        label,
        errorMessage,
        description,
        onChange(inputValue) {
          if (onChange) {
            onChange(inputValue.startsWith(' ') ? inputValue.trim() : inputValue)
          } else {
            setValueState(inputValue.startsWith(' ') ? inputValue.trim() : inputValue)
          }
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

    const resetIconHandler = () => {
      if (onChange) onChange('')
      else setValueState('')
    }

    const style = cx(
      'text-20 w-full px-4 py-2.5 border-2 border-gray-200 leading-8 rounded-lg caret-gray-700 focus:outline-none focus:border-gray-700 focus:placeholder:opacity-0',
      className,
      {
        // conditions
        'pl-[52px]': leftIcon,
        'pr-[52px]': resetIcon,
        // hover
        'hover:border-gray-400': !disabled,

        // error
        'border-error hover:border-error focus:border-error': errorMessage?.length > 0 && !disabled,

        // disabled
        'border-gray-300 bg-gray-100': disabled,
      },
    )
    return (
      <div
        className={cx('flex w-full flex-col', {
          'w-full': size === 'large',
          'max-w-[388px]': size === 'default',
          'max-w-[200px]': size === 'small',
        })}
      >
        <FieldHeader
          label={label}
          labelProps={labelProps}
          htmlFor={inputProps.id}
          description={description}
          descriptionProps={descriptionProps}
          required={required}
          explicitOptional={explicitOptional}
          tooltip={tooltip}
        />
        <div className="relative">
          {leftIcon && (
            <i
              className={cx('w-4-translate-y-2/4 absolute left-4 h-full flex items-center', {
                'opacity-50': disabled,
              })}
            >
              {leftIconSwitcher(leftIcon)}
            </i>
          )}
          <input {...inputProps} ref={ref} name={inputProps.id} className={style} />
          {resetIcon && valueState && (
            <button
              type="button"
              tabIndex={0}
              onClick={resetIconHandler}
              className="absolute inset-y-1/2 right-5 h-5 w-5 -translate-y-2/4 cursor-pointer"
            >
              <ResetIcon />
            </button>
          )}
          {endIcon}
        </div>
        {!disabled && (
          <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
        )}
      </div>
    )
  },
)

export default InputField

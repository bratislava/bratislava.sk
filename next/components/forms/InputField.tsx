import cx from 'classnames'
import { forwardRef, ReactNode, RefObject, useState } from 'react'
import { useTextField } from 'react-aria'

import ResetIcon from '../../assets/images/forms/circle-filled-reset.svg'
import HelpIcon from '../../assets/images/forms/icon-help.svg'

interface InputBase {
  label: string
  placeholder: string
  errorMessage?: string
  description?: string
  required?: boolean
  disabled?: boolean
  className?: string
  value?: string
  leftIcon?: ReactNode
  resetIcon?: boolean
  tooltip?: boolean
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
      value,
      disabled,
      leftIcon,
      resetIcon,
      className,
      ...rest
    },
    ref
  ) => {
    const [valueState, setValueState] = useState(value)
    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
      {
        ...rest,
        placeholder,
        value,
        isRequired: required,
        onChange(value) {
          setValueState(value)
        },
        isDisabled: disabled,
      },
      ref as RefObject<HTMLInputElement>
    )

    const style = cx(
      'w-full max-w-xs px-4 py-3 border-2 border-universal-gray-200 text-default rounded-lg caret-universal-gray-800 focus:outline-none focus:border-universal-gray-800',
      className,
      {
        //conditions
        'pl-12.5': leftIcon,
        // hover
        'hover:border-universal-gray-500': !disabled,

        // error
        'border-red-brick hover:border-red-brick focus:border-error': errorMessage,

        // disabled
        'opacity-50': disabled,
      }
    )

    return (
      <div className="flex flex-col w-max">
        <div className="flex justify-between">
          <label
            className={cx('relative mb-1 text-default font-semibold text-universal-black', {
              'after:content-["✱"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs':
                required,
            })}
            {...labelProps}
          >
            {label}
          </label>
          {tooltip && (
            <div className="flex">
              <p className="text-default mr-4.5">Optional</p>
              <i className="w-5 h-5">
                <HelpIcon />
              </i>
            </div>
          )}
        </div>
        {description && (
          <div {...descriptionProps} className="mb-1 text-sm text-universal-black">
            {description}
          </div>
        )}
        <div className="relative w-max">
          {leftIcon && <i className="w-4 h-4 absolute inset-y-1/2 -translate-y-2/4 left-5">{leftIcon}</i>}
          <input {...inputProps} ref={ref} value={valueState} className={style} />
          {resetIcon && valueState && (
            <i
              onClick={() => setValueState('')}
              className="w-5 h-5 absolute inset-y-1/2 -translate-y-2/4 right-5 cursor-pointer"
            >
              {<ResetIcon />}
            </i>
          )}
        </div>
        {errorMessage && (
          <div {...errorMessageProps} className="mt-1 text-sm text-error">
            {errorMessage}
          </div>
        )}
      </div>
    )
  }
)

export default InputField

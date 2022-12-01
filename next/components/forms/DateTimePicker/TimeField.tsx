import cx from 'classnames'
import padStart from 'lodash/padStart'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useLocale, useTimeField } from 'react-aria'
import { useTimeFieldState } from 'react-stately'

import FieldErrorMessage from '../FieldErrorMessage'
import FieldHeader from '../FieldHeader'

type TimeFieldBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: boolean
  children?: ReactNode
  disabled?: boolean
  errorMessage?: string
  hour: string
  minute: string
  isOpen: boolean
}

const TimeField = ({
  label,
  description,
  tooltip,
  required,
  explicitOptional,
  children,
  disabled,
  errorMessage = '',
  hour,
  minute,
  isOpen,
  ...rest
}: TimeFieldBase) => {
  const { locale } = useLocale()
  const [inputValue, setInputValue] = useState<string>('')
  const [errorMessageState, setErrorMessageState] = useState<string>(errorMessage || '')
  const ref = useRef<HTMLDivElement>(null)
  const INVALID_ERROR_MESSAGE = 'Invalid date format'

  const state = useTimeFieldState({
    label,
    description,
    isRequired: required,
    isDisabled: disabled,
    errorMessage,
    ...rest,
    locale,
  })

  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useTimeField(
    {
      label,
      description,
      isRequired: required,
      isDisabled: disabled,
      errorMessage,
      ...rest,
    },
    state,
    ref,
  )
  const timeFieldStyle = cx(
    'w-80 flex rounded-lg bg-white border-2 pl-4 py-2.5 pr-12 text-20 leading-8 border-gray-200 focus:border-gray-700',
    {
      'hover:border-gray-400': !disabled,
      'border-error focus:border-error focus-visible:outline-none hover:border-error':
        errorMessageState,
      'pointer-events-none border-gray-300 bg-gray-100 text-gray-500': disabled,
    },
  )

  useEffect(() => {
    setInputValue(
      // eslint-disable-next-line lodash-fp/no-extraneous-args
      `${hour ? padStart(hour, 2, '0') : ''}${hour || minute ? ':' : ''}${
        minute ? padStart(minute, 2, '0') : ''
      }`,
    )
  }, [hour, minute])

  // Validation
  useEffect(() => {
    const isValideFormate = (): boolean =>
      !inputValue || /^([01]?\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(inputValue)
    if (!isOpen) setErrorMessageState(isValideFormate() ? errorMessage : INVALID_ERROR_MESSAGE)
  }, [errorMessage, inputValue, isOpen])

  return (
    <>
      <FieldHeader
        label={label || ''}
        htmlFor={fieldProps?.id || ''}
        labelProps={labelProps}
        tooltip={tooltip}
        description={description}
        descriptionProps={descriptionProps}
        required={required}
        explicitOptional={explicitOptional}
      />
      <div className="relative">
        <input
          className={timeFieldStyle}
          type="text"
          value={inputValue}
          placeholder="HH:MM"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="absolute right-4 top-2/4 flex -translate-y-2/4 items-center">
          {children}
        </div>
      </div>
      {!disabled && (
        <FieldErrorMessage errorMessage={errorMessageState} errorMessageProps={errorMessageProps} />
      )}
    </>
  )
}

export default TimeField

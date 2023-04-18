/* eslint-disable lodash-fp/no-extraneous-args */
import TimeIcon from '@assets/images/forms/access-time-icon.svg'
import cx from 'classnames'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import padStart from 'lodash/padStart'
import { useLocale, } from 'next-intl'

import { forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import { ExplicitOptionalType } from '../../types/ExplicitOptional'
import Popover from './Popover'
import TimeField from './TimeField'
import TimeSelector from './TimeSelector'

type ButtonBase = {
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ children, disabled, ...rest }: ButtonBase) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ isDisabled: disabled, ...rest }, ref)
  return (
    <button
      className={cx('focus:outline-none', { 'opacity-50': disabled })}
      type="button"
      {...buttonProps}
      ref={ref}
    >
      {children}
    </button>
  )
}

export const convertTimeToValidFormat = (timeValue: string) => {
  const [hours, minutes] = timeValue?.split(':')
  return `${hours ? padStart(hours, 2, '0') : ''}${hours || minutes ? ':' : ''}${
    minutes ? padStart(minutes, 2, '0') : ''
  }`
}

export type TimePickerBase = {
  label?: string
  helptext?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  disabled?: boolean
  // providing this 'prop' will disable error messages rendering inside this component
  customErrorPlace?: boolean
  errorMessage?: string[]
  value?: string
  minValue?: string
  maxValue?: string
  readOnly?: boolean
  onChange?: (value?: string) => void
}

const TimePicker = forwardRef<HTMLDivElement, TimePickerBase>(
  (
    {
      label,
      disabled,
      errorMessage,
      required,
      explicitOptional,
      tooltip,
      helptext,
      onChange,
      value = '',
      minValue,
      maxValue,
      readOnly = false,
      customErrorPlace = false,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale()

    const [hour, setHour] = useState<string>('')
    const [minute, setMinute] = useState<string>('')

    const [isInputEdited, setIsInputEdited] = useState<boolean>(false)

    const [prevValue, setPrevValue] = useState<string>('')

    const state = useDatePickerState({
      label,
      errorMessage,
      isRequired: required,
      isDisabled: disabled,
      shouldCloseOnSelect: false,
      ...rest,
    })
    const { fieldProps, buttonProps, dialogProps, errorMessageProps } = useDatePicker(
      { errorMessage, isDisabled: disabled, label, ...rest },
      state,
      ref as RefObject<HTMLDivElement>,
    )

    const resetValues = () => {
      if (onChange) onChange('')
      setMinute('')
      setHour('')
      setPrevValue('')
    }

    const addZeroOnSuccess = (): void => {
      if (!hour || !minute) {
        if (hour) {
          if (onChange) onChange(`${padStart(hour, 2, '0')}:00`)
          setMinute('00')
          setPrevValue(`${padStart(hour, 2, '0')}:00`)
        }
        if (minute) {
          if (onChange) onChange(`00:${padStart(minute, 2, '0')}`)
          setHour('00')
          setPrevValue(`00:${padStart(minute, 2, '0')}`)
        }
      }
    }

    const closeFailedHandler = () => {
      if (onChange && prevValue) onChange(prevValue)
      else if (onChange) onChange()

      if (prevValue) setHour(prevValue.split(':')[0])
      else setHour('')

      if (prevValue) setMinute(prevValue.split(':')[1])
      else setMinute('')

      state?.close()
    }

    const closeSuccessHandler = () => {
      if (onChange && value) setPrevValue((prev) => (prev === value ? prev : value))
      addZeroOnSuccess()
      state?.close()
    }

    const resetCloseHandler = () => {
      resetValues()
      state?.close()
    }

    useEffect(() => {
      if (isInputEdited) {
        setMinute('')
        setHour('')
        setPrevValue('')
      }
    }, [isInputEdited])

    useEffect(() => {
      const convertedTimeToValidFormat = convertTimeToValidFormat(value)
      if (value) setPrevValue(convertedTimeToValidFormat)
      if (onChange) onChange(convertedTimeToValidFormat)
    }, [])

    return (
      <I18nProvider locale={locale}>
        <div className="relative w-full max-w-xs">
          <div ref={ref}>
            <TimeField
              {...fieldProps}
              label={label}
              helptext={helptext}
              required={required}
              explicitOptional={explicitOptional}
              disabled={disabled}
              tooltip={tooltip}
              errorMessage={errorMessage}
              hour={hour}
              minute={minute}
              isOpen={state?.isOpen}
              onChange={onChange}
              value={value}
              readOnly={readOnly}
              setIsInputEdited={setIsInputEdited}
              setPrevValue={setPrevValue}
            >
              <Button {...buttonProps} disabled={disabled}>
                <TimeIcon />
              </Button>
            </TimeField>
          </div>
          {state?.isOpen && (
            <OverlayProvider>
              <Popover
                {...dialogProps}
                shouldCloseOnBlur={false}
                isOpen={state?.isOpen}
                onClose={closeFailedHandler}
              >
                <TimeSelector
                  setHour={setHour}
                  hour={hour}
                  setMinute={setMinute}
                  minute={minute}
                  onReset={resetCloseHandler}
                  onSubmit={closeSuccessHandler}
                  onChange={onChange}
                  value={value}
                  minValue={minValue}
                  maxValue={maxValue}
                  setIsInputEdited={setIsInputEdited}
                />
              </Popover>
            </OverlayProvider>
          )}
          {!disabled && !customErrorPlace && (
            <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
          )}
        </div>
      </I18nProvider>
    )
  },
)

export default TimePicker

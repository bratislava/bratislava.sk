/* eslint-disable lodash-fp/no-extraneous-args */
import TimeIcon from '@assets/images/forms/access-time-icon.svg'
import cx from 'classnames'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import padStart from 'lodash/padStart'
import { forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import { usePageWrapperContext } from '../../../layouts/PageWrapper'
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

type TimePickerBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: boolean
  disabled?: boolean
  errorMessage?: string
  value?: string
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
      description,
      onChange,
      value = '',
      ...rest
    },
    ref,
  ) => {
    const { locale } = usePageWrapperContext()

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
          onChange(`${padStart(hour, 2, '0')}:00`)
          setMinute('00')
          setPrevValue(`${padStart(hour, 2, '0')}:00`)
        }
        if (minute) {
          onChange(`00:${padStart(minute, 2, '0')}`)
          setHour('00')
          setPrevValue(`00:${padStart(minute, 2, '0')}`)
        }
      }
    }

    const closeFailedHandler = () => {
      if (onChange) onChange(prevValue)
      if (prevValue) setHour(prevValue.split(':')[0])
      else setHour('')

      if (prevValue) setMinute(prevValue.split(':')[1])
      else setMinute('')

      state?.close()
    }

    const closeSuccessHandler = () => {
      if (onChange && value) setPrevValue((prev) => (prev !== value ? value : prev))
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

    return (
      <I18nProvider locale={locale}>
        <div className="relative w-full max-w-xs">
          <div ref={ref}>
            <TimeField
              {...fieldProps}
              label={label}
              description={description}
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
              setIsInputEdited={setIsInputEdited}
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
                  setIsInputEdited={setIsInputEdited}
                />
              </Popover>
            </OverlayProvider>
          )}
          {!disabled && (
            <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
          )}
        </div>
      </I18nProvider>
    )
  },
)

export default TimePicker

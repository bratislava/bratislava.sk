import CalendarIcon from '@assets/images/forms/calendar-icon.svg'
import { DateValue, parseDate } from '@internationalized/date'
import cx from 'classnames'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import { forwardRef, ReactNode, RefObject, useRef, useState } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import { usePageWrapperContext } from '../../../layouts/PageWrapper'
import Calendar from './Calendar/Calendar'
import DateField from './DateField'
import Popover from './Popover'

type ButtonBase = {
  children?: ReactNode
  className?: string
}

const Button = ({ children, className, ...rest }: ButtonBase) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ children, ...rest }, ref)
  return (
    <button
      className={cx('focus:outline-none', className)}
      type="button"
      {...buttonProps}
      ref={ref}
    >
      {children}
    </button>
  )
}

type DatePickerBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: boolean
  disabled?: boolean
  errorMessage?: string
  value?: string
  onChange?: (value?: DateValue) => void
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerBase>(
  (
    {
      label,
      disabled,
      errorMessage,
      required,
      explicitOptional,
      tooltip,
      description,
      value,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const { locale } = usePageWrapperContext()
    const [valueState, setValueState] = useState<DateValue | undefined>(null)
    const [prevValue, setPrevValue] = useState<string | null>(null)

    const state = useDatePickerState({
      label,
      errorMessage,
      value: onChange && value ? parseDate(value) : valueState,
      onChange(inputValue) {
        if (onChange) {
          onChange(inputValue)
        } else {
          setValueState(inputValue)
        }
      },
      isRequired: required,
      isDisabled: disabled,
      ...rest,
      shouldCloseOnSelect: false,
    })
    const { fieldProps, buttonProps, calendarProps, dialogProps, errorMessageProps } =
      useDatePicker(
        {
          errorMessage,
          isDisabled: disabled,
          label,
          ...rest,
        },
        state,
        ref as RefObject<HTMLDivElement>,
      )

    const closeHandler = () => {
      state?.close()
      state?.setDateValue(typeof prevValue === 'string' ? parseDate(prevValue) : prevValue)
    }

    const submitCloseHandler = () => {
      setPrevValue((prev) => (prev !== value ? value : prev))
      state?.close()
    }

    const resetCloseHandler = () => {
      state?.setDateValue(null)
      state?.close()
    }

    return (
      <I18nProvider locale={locale}>
        <div className="relative w-full max-w-xs">
          <div ref={ref}>
            <DateField
              {...fieldProps}
              label={label}
              description={description}
              required={required}
              explicitOptional={explicitOptional}
              disabled={disabled}
              tooltip={tooltip}
              errorMessage={errorMessage}
              isOpen={state?.isOpen}
            >
              <Button {...buttonProps} className={disabled ? 'opacity-50' : ''}>
                <CalendarIcon />
              </Button>
            </DateField>
          </div>
          {state?.isOpen && (
            <OverlayProvider>
              <Popover {...dialogProps} isOpen={state?.isOpen} onClose={closeHandler}>
                <Calendar
                  {...calendarProps}
                  onSubmit={submitCloseHandler}
                  onReset={resetCloseHandler}
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

export default DatePicker

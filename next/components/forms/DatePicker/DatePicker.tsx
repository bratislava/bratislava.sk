import { forwardRef, ReactNode, RefObject, useRef } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import CalendarIcon from '../../../assets/images/forms/calendar-icon.svg'
import { usePageWrapperContext } from '../../layouts/PageWrapper'
import Calendar from './Calendar/Calendar'
import DateField from './DateField'
import Popover from './Popover'

type ButtonBase = {
  children?: ReactNode
}

const Button = ({ children, ...rest }: ButtonBase) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ children, ...rest }, ref)
  return (
    <button className="focus:outline-none" type="button" {...buttonProps} ref={ref}>
      {children}
    </button>
  )
}

type DatePickerBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerBase>(
  ({ label, disabled, errorMessage, required, tooltip, description, ...rest }, ref) => {
    const { locale } = usePageWrapperContext()
    const state = useDatePickerState({
      label,
      errorMessage,
      isRequired: required,
      isDisabled: disabled,
      ...rest,
      shouldCloseOnSelect: false,
    })
    const { fieldProps, buttonProps, calendarProps, dialogProps } = useDatePicker(
      { errorMessage, isDisabled: disabled, label, ...rest },
      state,
      ref as RefObject<HTMLDivElement>
    )

    const closeHandler = () => {
      state?.close()
      // https://github.com/adobe/react-spectrum/discussions/3318
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state?.setDateValue(null)
    }

    return (
      <I18nProvider locale={locale}>
        <div className="relative">
          <div ref={ref}>
            <DateField
              {...fieldProps}
              label={label}
              description={description}
              required={required}
              disabled={disabled}
              tooltip={tooltip}
              errorMessage={errorMessage}
            >
              <Button {...buttonProps}>
                <CalendarIcon />
              </Button>
            </DateField>
          </div>
          {state?.isOpen && (
            <OverlayProvider>
              <Popover {...dialogProps} isOpen={state?.isOpen} onClose={closeHandler}>
                <Calendar {...calendarProps} onClose={closeHandler} onSubmit={() => state?.close()} />
              </Popover>
            </OverlayProvider>
          )}
        </div>
      </I18nProvider>
    )
  }
)

export default DatePicker

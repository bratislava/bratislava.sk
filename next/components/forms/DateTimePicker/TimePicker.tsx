import { forwardRef, ReactNode, RefObject, useRef, useState } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import TimeIcon from '../../../assets/images/forms/access-time-icon.svg'
import { usePageWrapperContext } from '../../layouts/PageWrapper'
import Popover from './Popover'
import TimeField from './TimeField'
import TimeSelector from './TimeSelector'

type ButtonBase = {
  children?: ReactNode
  disabled?: boolean
}

const Button = ({ children, disabled, ...rest }: ButtonBase) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ isDisabled: disabled, ...rest }, ref)
  return (
    <button className="focus:outline-none" type="button" {...buttonProps} ref={ref}>
      {children}
    </button>
  )
}

type TimePickerBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
}

const TimePicker = forwardRef<HTMLDivElement, TimePickerBase>(
  ({ label, disabled, errorMessage, required, tooltip, description, ...rest }, ref) => {
    const { locale } = usePageWrapperContext()

    const [hour, setHour] = useState<string>('')
    const [minute, setMinute] = useState<string>('')

    const state = useDatePickerState({
      label,
      errorMessage,
      isRequired: required,
      isDisabled: disabled,
      shouldCloseOnSelect: false,
      ...rest,
    })
    const { fieldProps, buttonProps, dialogProps } = useDatePicker(
      { errorMessage, isDisabled: disabled, label, ...rest },
      state,
      ref as RefObject<HTMLDivElement>
    )
    const closeHandler = () => {
      state?.close()
      setHour('')
      setMinute('')
    }
    return (
      <I18nProvider locale={locale}>
        <div className="relative">
          <div ref={ref}>
            <TimeField
              {...fieldProps}
              label={label}
              description={description}
              required={required}
              disabled={disabled}
              tooltip={tooltip}
              errorMessage={errorMessage}
              hour={hour}
              minute={minute}
            >
              <Button {...buttonProps} disabled={disabled}>
                <TimeIcon />
              </Button>
            </TimeField>
          </div>
          {state?.isOpen && (
            <OverlayProvider>
              <Popover {...dialogProps} shouldCloseOnBlur={false} isOpen={state?.isOpen} onClose={closeHandler}>
                <TimeSelector
                  setHour={setHour}
                  hour={hour}
                  setMinute={setMinute}
                  minute={minute}
                  onClose={closeHandler}
                  onSubmit={() => state?.close()}
                />
              </Popover>
            </OverlayProvider>
          )}
        </div>
      </I18nProvider>
    )
  }
)

export default TimePicker

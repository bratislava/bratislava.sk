import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import DatePicker, { DatePickerBase } from '../widget-components/DateTimePicker/DatePicker'

type DateFrom = {
  DateFromLabel: DatePickerBase['label']
  DateFromTooltip?: DatePickerBase['tooltip']
  DateFromDescription?: DatePickerBase['helptext']
  DateFromRequired?: DatePickerBase['required']
  DateFromExplicitOptional?: DatePickerBase['explicitOptional']
  DateFromDisabled?: DatePickerBase['disabled']
  DateFromValue?: DatePickerBase['value']
  DateFromOnChange: DatePickerBase['onChange']
  DateFromErrorMessage?: DatePickerBase['errorMessage']
}

type DateTo = {
  DateToLabel: DatePickerBase['label']
  DateToTooltip?: DatePickerBase['tooltip']
  DateToDescription?: DatePickerBase['helptext']
  DateToRequired?: DatePickerBase['required']
  DateToExplicitOptional?: DatePickerBase['explicitOptional']
  DateToDisabled?: DatePickerBase['disabled']
  DateToValue?: DatePickerBase['value']
  DateToOnChange: DatePickerBase['onChange']
  DateToErrorMessage?: DatePickerBase['errorMessage']
}

export const DateFromTo = ({
  DateFromLabel,
  DateToLabel,
  DateFromErrorMessage,
  DateToErrorMessage,
  DateFromTooltip,
  DateToTooltip,
  DateFromRequired,
  DateToRequired,
  DateFromExplicitOptional,
  DateToExplicitOptional,
  DateFromDisabled,
  DateToDisabled,
  DateFromDescription,
  DateToDescription,
  DateFromValue,
  DateToValue,
  DateFromOnChange,
  DateToOnChange,
}: DateFrom & DateTo) => {
  return (
    <div className={cx('flex-col flex items-start')}>
      <div className="items-left lg:flex-row flex-col flex gap-4">
        <div className={cx('w-[320px] flex flex-col items-start justify-end')}>
          <DatePicker
            label={DateFromLabel}
            errorMessage={DateFromErrorMessage}
            required={DateFromRequired}
            helptext={DateFromDescription}
            tooltip={DateFromTooltip}
            explicitOptional={DateFromExplicitOptional}
            disabled={DateFromDisabled}
            customErrorPlace
            value={DateFromValue}
            maxValue={DateToValue}
            onChange={DateFromOnChange}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:w-[320px] lg:hidden block')}>
            <FieldErrorMessage errorMessage={DateFromErrorMessage} />
          </div>
        </div>
        <div className={cx('lg:w-8 lg:block hidden h-0.5 bg-gray-300 mt-auto mb-6')} />
        <div className={cx('flex flex-col w-[320px]')}>
          <DatePicker
            label={DateToLabel}
            errorMessage={DateToErrorMessage}
            tooltip={DateToTooltip}
            required={DateToRequired}
            helptext={DateToDescription}
            explicitOptional={DateToExplicitOptional}
            disabled={DateToDisabled}
            value={DateToValue}
            customErrorPlace
            minValue={DateFromValue}
            onChange={DateToOnChange}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:w-[320px] lg:hidden block')}>
            <FieldErrorMessage errorMessage={DateFromErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields */}
      <div className="flex-row flex gap-4">
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={DateFromErrorMessage} />
        </div>
        <div className={cx('lg:w-8 lg:block hidden h-0.5 bg-white')} />
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={DateToErrorMessage} />
        </div>
      </div>
    </div>
  )
}

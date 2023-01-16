import cx from 'classnames'

import DatePicker, { DatePickerBase } from '../widget-components/DateTimePicker/DatePicker'

type DateFrom = {
  DateFromLabel: DatePickerBase['label']
  DateFromTooltip?: DatePickerBase['tooltip']
  DateFromDescription?: DatePickerBase['description']
  DateFromRequired?: DatePickerBase['required']
  DateFromExplicitOptional?: DatePickerBase['explicitOptional']
  DateFromDisabled?: DatePickerBase['disabled']
  DateFromValue?: DatePickerBase['value']
  DateFromOnChange: DatePickerBase['onChange']
  DateFromErrorMessage?: string[]
}

type DateTo = {
  DateToLabel: DatePickerBase['label']
  DateToTooltip?: DatePickerBase['tooltip']
  DateToDescription?: DatePickerBase['description']
  DateToRequired?: DatePickerBase['required']
  DateToExplicitOptional?: DatePickerBase['explicitOptional']
  DateToDisabled?: DatePickerBase['disabled']
  DateToValue?: DatePickerBase['value']
  DateToOnChange: DatePickerBase['onChange']
  DateToErrorMessage?: string[]
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
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left lg:flex-row flex-col flex gap-4">
        <div className="w-[320px] flex flex-col items-start justify-end">
          <DatePicker
            label={DateFromLabel}
            errorMessage={DateFromErrorMessage}
            required={DateFromRequired}
            description={DateFromDescription}
            tooltip={DateFromTooltip}
            explicitOptional={DateFromExplicitOptional}
            disabled={DateFromDisabled}
            value={DateFromValue}
            maxValue={DateToValue}
            onChange={DateFromOnChange}
          />
        </div>
        <div className={cx('lg:w-8 lg:block hidden h-0.5 bg-gray-300 mt-auto mb-8')} />
        <div className="flex flex-row w-[320px] items-end gap-1 mt-auto">
          <DatePicker
            label={DateToLabel}
            errorMessage={DateToErrorMessage}
            tooltip={DateToTooltip}
            required={DateToRequired}
            description={DateToDescription}
            explicitOptional={DateToExplicitOptional}
            disabled={DateToDisabled}
            value={DateToValue}
            minValue={DateFromValue}
            onChange={DateToOnChange}
          />
        </div>
      </div>
    </div>
  )
}

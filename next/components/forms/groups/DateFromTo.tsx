import { DateValue } from '@internationalized/date'
import cx from 'classnames'

import DatePicker from '../widget-components/DateTimePicker/DatePicker'

type DatePickerBase = {
  DateFromLabel: string
  DateToLabel?: string
  DateFromTooltip?: string
  DateToTooltip?: string
  DateFromDescription?: string
  DateToDescription?: string
  DateFromRequired?: boolean
  DateToRequired?: boolean
  DateFromExplicitOptional?: boolean
  DateToExplicitOptional?: boolean
  DateFromDisabled?: boolean
  DateToDisabled?: boolean
  DateFromValue?: string
  DateToValue?: string
  DateFromOnChange: (value?: DateValue) => void
  DateToOnChange: (value?: DateValue) => void
  DateFromErrorMessage?: string[]
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
}: DatePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left mdCustom:flex-row flex-col flex gap-4">
        <div className="w-sm flex flex-col items-start justify-end">
          <DatePicker
            label={DateFromLabel}
            errorMessage={DateFromErrorMessage}
            required={DateFromRequired}
            description={DateFromDescription}
            tooltip={DateFromTooltip}
            explicitOptional={DateFromExplicitOptional}
            disabled={DateFromDisabled}
            value={DateFromValue}
            onChange={DateFromOnChange}
          />
        </div>
        <div className={cx('mdCustom:w-8 mdCustom:block hidden h-0.5 bg-gray-300 mt-auto mb-8')} />
        <div className="flex flex-row w-sm items-end gap-1 mt-auto">
          <DatePicker
            label={DateToLabel}
            errorMessage={DateToErrorMessage}
            tooltip={DateToTooltip}
            required={DateToRequired}
            description={DateToDescription}
            explicitOptional={DateToExplicitOptional}
            disabled={DateToDisabled}
            value={DateToValue}
            onChange={DateToOnChange}
          />
        </div>
      </div>
    </div>
  )
}

import { DateValue } from '@internationalized/date'
import cx from 'classnames'

import DatePicker from '../widget-components/DateTimePicker/DatePicker'

type DateFrom = {
  DateFromLabel: string
  DateFromTooltip?: string
  DateFromDescription?: string
  DateFromRequired?: boolean
  DateFromExplicitOptional?: boolean
  DateFromDisabled?: boolean
  DateFromValue?: string
  DateFromOnChange: (value?: DateValue) => void
  DateFromErrorMessage?: string[]
}

type DateTo = {
  DateToLabel: string
  DateToTooltip?: string
  DateToDescription?: string
  DateToRequired?: boolean
  DateToExplicitOptional?: boolean
  DateToDisabled?: boolean
  DateToValue?: string
  DateToOnChange: (value?: DateValue) => void
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

import cx from 'classnames'

import DatePicker from '../widget-components/DateTimePicker/DatePicker'

type DatePickerBase = {
  label: string
  DateFromTooltip?: string
  DateToTooltip?: string
  description?: string
  DateFromRequired?: boolean
  DateToRequired?: boolean
  DateFromExplicitOptional?: boolean
  DateToExplicitOptional?: boolean
  DateFromDisabled?: boolean
  DateToDisabled?: boolean
  errorMessage?: string[]
}

export const DateFromTo = ({
  label,
  errorMessage,
  DateFromTooltip,
  DateToTooltip,
  DateFromRequired,
  DateToRequired,
  DateFromExplicitOptional,
  DateToExplicitOptional,
  DateFromDisabled,
  DateToDisabled,
}: DatePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left mdCustom:flex-row flex-col flex gap-4">
        <div className="w-sm flex flex-col items-start">
          <DatePicker
            label={label}
            errorMessage={errorMessage}
            required={DateFromRequired}
            tooltip={DateFromTooltip}
            explicitOptional={DateFromExplicitOptional}
            disabled={DateFromDisabled}
          />
        </div>
        <div
          className={cx('mdCustom:w-8 mdCustom:block hidden h-0.5 bg-gray-300 mt-auto mb-7', {
            'mt-1': !label,
          })}
        />
        <div className="flex flex-row w-sm items-end gap-1 mt-auto">
          <DatePicker
            tooltip={DateToTooltip}
            required={DateToRequired}
            explicitOptional={DateToExplicitOptional}
            disabled={DateToDisabled}
          />
        </div>
      </div>
    </div>
  )
}

import cx from 'classnames'

import DatePicker from '../widget-components/DateTimePicker/DatePicker'
import TimePicker from '../widget-components/DateTimePicker/TimePicker'

type DateTimePickerBase = {
  DateLabel?: string
  DateDescription?: string
  DateTooltip?: string
  DateRequired?: boolean
  DateExplicitOptional?: boolean
  DateDisabled?: boolean
  DateErrorMessage?: string

  TimeLabel?: string
  TimeDescription?: string
  TimeTooltip?: string
  TimeRequired?: boolean
  TimeExplicitOptional?: boolean
  TimeDisabled?: boolean
  TimeErrorMessage?: string
}

export const DateTimePicker = ({
  DateLabel,
  DateErrorMessage,
  DateTooltip,
  DateDescription,
  DateDisabled,
  DateExplicitOptional,
  DateRequired,

  TimeDisabled,
  TimeDescription,
  TimeLabel,
  TimeRequired,
  TimeTooltip,
  TimeErrorMessage,
  TimeExplicitOptional,
}: DateTimePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4')}>
      <div className="flex flex-row items-center p-0 gap-4">
        <div className="flex flex-col items-start p-0 sm:w-[300px]">
          <DatePicker
            label={DateLabel}
            errorMessage={DateErrorMessage}
            tooltip={DateTooltip}
            description={DateDescription}
            disabled={DateDisabled}
            explicitOptional={DateExplicitOptional}
            required={DateRequired}
          />
        </div>
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <TimePicker
            errorMessage={TimeErrorMessage}
            disabled={TimeDisabled}
            description={TimeDescription}
            label={TimeLabel}
            required={TimeRequired}
            tooltip={TimeTooltip}
            explicitOptional={TimeExplicitOptional}
          />
        </div>
      </div>
    </div>
  )
}

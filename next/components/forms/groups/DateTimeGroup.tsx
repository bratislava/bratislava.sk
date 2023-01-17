import cx from 'classnames'

import DatePicker, { DatePickerBase } from '../widget-components/DateTimePicker/DatePicker'
import TimePicker, { TimePickerBase } from '../widget-components/DateTimePicker/TimePicker'

type TDatePicker = {
  DateLabel: DatePickerBase['label']
  DateTooltip?: DatePickerBase['tooltip']
  DateDescription?: DatePickerBase['description']
  DateRequired?: DatePickerBase['required']
  DateExplicitOptional?: DatePickerBase['explicitOptional']
  DateDisabled?: DatePickerBase['disabled']
  DateValue?: DatePickerBase['value']
  DateOnChange: DatePickerBase['onChange']
  DateErrorMessage?: DatePickerBase['errorMessage']
}

type TTimePicker = {
  TimeLabel: TimePickerBase['label']
  TimeTooltip?: TimePickerBase['tooltip']
  TimeDescription?: TimePickerBase['description']
  TimeRequired?: TimePickerBase['required']
  TimeExplicitOptional?: TimePickerBase['explicitOptional']
  TimeDisabled?: TimePickerBase['disabled']
  TimeValue?: TimePickerBase['value']
  TimeOnChange: TimePickerBase['onChange']
  TimeErrorMessage?: TimePickerBase['errorMessage']
}

export const DateTimePicker = ({
  DateLabel,
  DateErrorMessage,
  DateTooltip,
  DateDescription,
  DateDisabled,
  DateExplicitOptional,
  DateRequired,
  DateOnChange,
  DateValue,

  TimeDisabled,
  TimeDescription,
  TimeLabel,
  TimeRequired,
  TimeTooltip,
  TimeErrorMessage,
  TimeExplicitOptional,
  TimeOnChange,
  TimeValue,
}: TDatePicker & TTimePicker) => {
  return (
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="flex lg:flex-row flex-col items-center gap-4">
        <div className="flex flex-col items-start w-[320px]">
          <DatePicker
            label={DateLabel}
            errorMessage={DateErrorMessage}
            tooltip={DateTooltip}
            description={DateDescription}
            disabled={DateDisabled}
            explicitOptional={DateExplicitOptional}
            value={DateValue}
            onChange={DateOnChange}
            required={DateRequired}
          />
        </div>
        <div className="w-[320px] flex flex-row items-end gap-1 mt-auto">
          <TimePicker
            errorMessage={TimeErrorMessage}
            disabled={TimeDisabled}
            description={TimeDescription}
            label={TimeLabel}
            required={TimeRequired}
            tooltip={TimeTooltip}
            value={TimeValue}
            onChange={TimeOnChange}
            explicitOptional={TimeExplicitOptional}
          />
        </div>
      </div>
    </div>
  )
}

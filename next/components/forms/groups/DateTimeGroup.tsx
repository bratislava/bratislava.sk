import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import DatePicker, { DatePickerBase } from '../widget-components/DateTimePicker/DatePicker'
import TimePicker, { TimePickerBase } from '../widget-components/DateTimePicker/TimePicker'

type TDatePicker = {
  DateLabel?: DatePickerBase['label']
  DateTooltip?: DatePickerBase['tooltip']
  DateDescription?: DatePickerBase['helptext']
  DateRequired?: DatePickerBase['required']
  DateExplicitOptional?: DatePickerBase['explicitOptional']
  DateDisabled?: DatePickerBase['disabled']
  DateValue?: DatePickerBase['value']
  DateOnChange?: DatePickerBase['onChange']
  DateErrorMessage?: DatePickerBase['errorMessage']
}

type TTimePicker = {
  TimeLabel?: TimePickerBase['label']
  TimeTooltip?: TimePickerBase['tooltip']
  TimeDescription?: TimePickerBase['helptext']
  TimeRequired?: TimePickerBase['required']
  TimeExplicitOptional?: TimePickerBase['explicitOptional']
  TimeDisabled?: TimePickerBase['disabled']
  TimeValue?: TimePickerBase['value']
  TimeOnChange?: TimePickerBase['onChange']
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
    <div className={cx('flex flex-col items-start')}>
      <div className="flex flex-col items-end gap-4 lg:flex-row">
        <div className={cx('flex w-[320px] flex-col')}>
          <DatePicker
            label={DateLabel}
            errorMessage={DateErrorMessage}
            tooltip={DateTooltip}
            helptext={DateDescription}
            disabled={DateDisabled}
            explicitOptional={DateExplicitOptional}
            value={DateValue}
            customErrorPlace
            onChange={DateOnChange}
            required={DateRequired}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('block flex flex-col lg:hidden')}>
            <FieldErrorMessage errorMessage={DateErrorMessage} />
          </div>
        </div>
        <div className={cx('flex w-[320px] flex-col gap-1')}>
          <TimePicker
            errorMessage={TimeErrorMessage}
            disabled={TimeDisabled}
            helptext={TimeDescription}
            label={TimeLabel}
            required={TimeRequired}
            tooltip={TimeTooltip}
            value={TimeValue}
            customErrorPlace
            onChange={TimeOnChange}
            explicitOptional={TimeExplicitOptional}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('block flex flex-col lg:hidden')}>
            <FieldErrorMessage errorMessage={TimeErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields */}
      <div className="flex flex-row gap-4">
        <div className={cx('flex hidden flex-col lg:block lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={DateErrorMessage} />
        </div>
        <div className={cx('flex hidden flex-col lg:block lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={TimeErrorMessage} />
        </div>
      </div>
    </div>
  )
}

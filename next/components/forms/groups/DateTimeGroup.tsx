import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import DatePicker, { DatePickerBase } from '../widget-components/DateTimePicker/DatePicker'
import TimePicker, { TimePickerBase } from '../widget-components/DateTimePicker/TimePicker'

type TDatePicker = {
  DateLabel?: DatePickerBase['label']
  DateTooltip?: DatePickerBase['tooltip']
  DateDescription?: DatePickerBase['description']
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
  TimeDescription?: TimePickerBase['description']
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
    <div className={cx('flex-col flex items-start')}>
      <div className="flex lg:flex-row flex-col gap-4 items-end">
        <div className={cx('flex flex-col w-[320px]')}>
          <DatePicker
            label={DateLabel}
            errorMessage={DateErrorMessage}
            tooltip={DateTooltip}
            description={DateDescription}
            disabled={DateDisabled}
            explicitOptional={DateExplicitOptional}
            value={DateValue}
            customErrorPlace
            onChange={DateOnChange}
            required={DateRequired}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:hidden block')}>
            <FieldErrorMessage errorMessage={DateErrorMessage} />
          </div>
        </div>
        <div className={cx('w-[320px] flex flex-col gap-1')}>
          <TimePicker
            errorMessage={TimeErrorMessage}
            disabled={TimeDisabled}
            description={TimeDescription}
            label={TimeLabel}
            required={TimeRequired}
            tooltip={TimeTooltip}
            value={TimeValue}
            customErrorPlace
            onChange={TimeOnChange}
            explicitOptional={TimeExplicitOptional}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:hidden block')}>
            <FieldErrorMessage errorMessage={TimeErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields */}
      <div className="flex-row flex gap-4">
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={DateErrorMessage} />
        </div>
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={TimeErrorMessage} />
        </div>
      </div>
    </div>
  )
}

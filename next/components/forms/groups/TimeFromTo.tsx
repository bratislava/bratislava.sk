import cx from 'classnames'

import FieldErrorMessage from '../info-components/FieldErrorMessage'
import TimePicker, { TimePickerBase } from '../widget-components/DateTimePicker/TimePicker'

type TimeFromBase = {
  TimeFromLabel: TimePickerBase['label']
  TimeFromDescription?: TimePickerBase['helptext']
  TimeFromTooltip?: TimePickerBase['tooltip']
  TimeFromRequired?: TimePickerBase['required']
  TimeFromExplicitOptional?: TimePickerBase['explicitOptional']
  TimeFromDisabled?: TimePickerBase['disabled']
  TimeFromValue?: TimePickerBase['value']
  TimeFromOnChange?: TimePickerBase['onChange']
  TimeFromErrorMessage?: TimePickerBase['errorMessage']
}
type TimeToBase = {
  TimeToLabel: TimePickerBase['label']
  TimeToDescription?: TimePickerBase['helptext']
  TimeToTooltip?: TimePickerBase['tooltip']
  TimeToRequired?: TimePickerBase['required']
  TimeToExplicitOptional?: TimePickerBase['explicitOptional']
  TimeToDisabled?: TimePickerBase['disabled']
  TimeToValue?: TimePickerBase['value']
  TimeToOnChange?: TimePickerBase['onChange']
  TimeToErrorMessage?: TimePickerBase['errorMessage']
}

export const TimeFromTo = ({
  TimeFromLabel,
  TimeToLabel,
  TimeFromDescription,
  TimeToDescription,
  TimeFromTooltip,
  TimeToTooltip,
  TimeFromRequired,
  TimeToRequired,
  TimeFromExplicitOptional,
  TimeToExplicitOptional,
  TimeFromDisabled,
  TimeToDisabled,
  TimeFromOnChange,
  TimeToOnChange,
  TimeFromValue,
  TimeToValue,
  TimeFromErrorMessage,
  TimeToErrorMessage,
}: TimeFromBase & TimeToBase) => {
  return (
    <div className={cx('flex-col flex')}>
      <div className="flex lg:flex-row flex-col gap-4 items-end">
        <div className={cx('flex flex-col w-[320px] items-start')}>
          <TimePicker
            label={TimeFromLabel}
            errorMessage={TimeFromErrorMessage}
            helptext={TimeFromDescription}
            tooltip={TimeFromTooltip}
            required={TimeFromRequired}
            explicitOptional={TimeFromExplicitOptional}
            value={TimeFromValue}
            maxValue={TimeToValue}
            customErrorPlace
            onChange={TimeFromOnChange}
            disabled={TimeFromDisabled}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:hidden block lg:w-[320px]')}>
            <FieldErrorMessage errorMessage={TimeFromErrorMessage} />
          </div>
        </div>
        <div className={cx('lg:w-8 lg:block hidden h-0.5 bg-gray-300 mt-auto mb-8')} />
        <div className={cx('w-[320px] flex flex-col')}>
          <TimePicker
            label={TimeToLabel}
            helptext={TimeToDescription}
            errorMessage={TimeToErrorMessage}
            tooltip={TimeToTooltip}
            required={TimeToRequired}
            explicitOptional={TimeToExplicitOptional}
            value={TimeToValue}
            customErrorPlace
            minValue={TimeFromValue}
            onChange={TimeToOnChange}
            disabled={TimeToDisabled}
          />
          {/* Custom render error messages for both fields at small screens */}
          <div className={cx('flex flex-col lg:hidden block lg:w-[320px]')}>
            <FieldErrorMessage errorMessage={TimeToErrorMessage} />
          </div>
        </div>
      </div>

      {/* Custom render error messages for both fields */}
      <div className="flex-row flex gap-4">
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={TimeFromErrorMessage} />
        </div>
        <div className={cx('lg:w-8 lg:block hidden h-0.5 bg-white')} />
        <div className={cx('flex flex-col lg:block hidden lg:w-[320px]')}>
          <FieldErrorMessage errorMessage={TimeToErrorMessage} />
        </div>
      </div>
    </div>
  )
}

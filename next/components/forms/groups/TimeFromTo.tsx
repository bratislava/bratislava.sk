import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

import TimePicker, { TimePickerBase } from '../widget-components/DateTimePicker/TimePicker'

type TimeFromBase = {
  TimeFromLabel: TimePickerBase['label']
  TimeFromDescription?: TimePickerBase['description']
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
  TimeToDescription?: TimePickerBase['description']
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
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left flex lg:flex-row flex-col gap-4">
        <div
          className={cx('flex flex-col w-[320px] items-start', {
            'mb-6': !isEmpty(TimeToErrorMessage),
          })}
        >
          <TimePicker
            label={TimeFromLabel}
            errorMessage={TimeFromErrorMessage}
            description={TimeFromDescription}
            tooltip={TimeFromTooltip}
            required={TimeFromRequired}
            explicitOptional={TimeFromExplicitOptional}
            value={TimeFromValue}
            maxValue={TimeToValue}
            onChange={TimeFromOnChange}
            disabled={TimeFromDisabled}
          />
        </div>
        <div
          className={cx('lg:w-8 lg:block hidden h-0.5 bg-gray-300 mt-auto mb-8', {
            'mb-14':
              (!isEmpty(TimeFromErrorMessage) && isEmpty(TimeToErrorMessage)) ||
              (isEmpty(TimeFromErrorMessage) && !isEmpty(TimeToErrorMessage)),
            'mb-20': !isEmpty(TimeFromErrorMessage) && !isEmpty(TimeToErrorMessage),
          })}
        />
        <div
          className={cx('w-[320px] flex flex-row items-end mt-auto', {
            'mb-6': !isEmpty(TimeFromErrorMessage),
          })}
        >
          <TimePicker
            label={TimeToLabel}
            description={TimeToDescription}
            errorMessage={TimeToErrorMessage}
            tooltip={TimeToTooltip}
            required={TimeToRequired}
            explicitOptional={TimeToExplicitOptional}
            value={TimeToValue}
            minValue={TimeFromValue}
            onChange={TimeToOnChange}
            disabled={TimeToDisabled}
          />
        </div>
      </div>
    </div>
  )
}

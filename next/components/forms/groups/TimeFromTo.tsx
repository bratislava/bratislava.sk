import cx from 'classnames'

import TimePicker from '../widget-components/DateTimePicker/TimePicker'

type TimePickerBase = {
  label: string

  // description
  TimeFromDescription?: string
  TimeToDescription?: string

  // tooltip
  TimeFromTooltip?: string
  TimeToTooltip?: string

  // required
  TimeFromRequired?: boolean
  TimeToRequired?: boolean

  // explicitOptional
  TimeFromExplicitOptional?: boolean
  TimeToExplicitOptional?: boolean

  // disabled
  TimeFromDisabled?: boolean
  TimeToDisabled?: boolean

  errorMessage?: string[]
}

export const TimeFromTo = ({
  label,
  errorMessage,
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
}: TimePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left flex mdCustom:flex-row flex-col gap-4">
        <div className="flex flex-col w-sm items-start">
          <TimePicker
            label={label}
            errorMessage={errorMessage}
            description={TimeFromDescription}
            tooltip={TimeFromTooltip}
            required={TimeFromRequired}
            explicitOptional={TimeFromExplicitOptional}
            disabled={TimeFromDisabled}
          />
        </div>
        <div
          className={cx('mdCustom:w-8 mdCustom:block hidden h-0.5 bg-gray-300 mt-auto mb-7', {
            'mt-1': !label,
          })}
        />
        <div className="flex flex-row w-sm items-end mt-auto">
          <TimePicker
            description={TimeToDescription}
            tooltip={TimeToTooltip}
            required={TimeToRequired}
            explicitOptional={TimeToExplicitOptional}
            disabled={TimeToDisabled}
          />
        </div>
      </div>
    </div>
  )
}

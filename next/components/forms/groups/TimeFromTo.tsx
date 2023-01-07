import cx from 'classnames'

import TimePicker from '../widget-components/DateTimePicker/TimePicker'

type TimePickerBase = {
  // label
  TimeFromLabel: string
  TimeToLabel?: string

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

  // value
  TimeFromValue?: string
  TimeToValue?: string

  // handlers
  TimeFromOnChange?: (value?: string) => void
  TimeToOnChange?: (value?: string) => void

  // errors
  TimeFromErrorMessage?: string[]
  TimeToErrorMessage?: string[]
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
}: TimePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start gap-4')}>
      <div className="items-left flex mdCustom:flex-row flex-col gap-4">
        <div className="flex flex-col w-sm items-start">
          <TimePicker
            label={TimeFromLabel}
            errorMessage={TimeFromErrorMessage}
            description={TimeFromDescription}
            tooltip={TimeFromTooltip}
            required={TimeFromRequired}
            explicitOptional={TimeFromExplicitOptional}
            value={TimeFromValue}
            onChange={TimeFromOnChange}
            disabled={TimeFromDisabled}
          />
        </div>
        <div className={cx('mdCustom:w-8 mdCustom:block hidden h-0.5 bg-gray-300 mt-auto mb-7')} />
        <div className="flex flex-row w-sm items-end mt-auto">
          <TimePicker
            label={TimeToLabel}
            description={TimeToDescription}
            errorMessage={TimeToErrorMessage}
            tooltip={TimeToTooltip}
            required={TimeToRequired}
            explicitOptional={TimeToExplicitOptional}
            value={TimeToValue}
            onChange={TimeToOnChange}
            disabled={TimeToDisabled}
          />
        </div>
      </div>
    </div>
  )
}

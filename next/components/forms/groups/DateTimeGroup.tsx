import cx from 'classnames'

import DatePicker from '../DateTimePicker/DatePicker'
import TimePicker from '../DateTimePicker/TimePicker'

type DateTimePickerBase = {
  label: string
  errorMessage?: [string, string]
}

export const DateTimePicker = ({ label, errorMessage = ['', ''] }: DateTimePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4')}>
      <div className="flex flex-row items-center p-0 gap-4">
        <div className="flex flex-col items-start p-0 sm:w-[300px]">
          <DatePicker label={label} errorMessage={errorMessage[0]} />
        </div>
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <TimePicker errorMessage={errorMessage[1]} />
        </div>
      </div>
    </div>
  )
}

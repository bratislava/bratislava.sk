import cx from 'classnames'

import DatePicker from '../DateTimePicker/DatePicker'

type DatePickerBase = {
  label: string
  errorMessage?: string
}

export const DateFromTo = ({ label, errorMessage }: DatePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4')}>
      <div className="flex flex-row items-center p-0 gap-6">
        <div className="flex flex-col items-start p-0 gap-1">
          <DatePicker label={label} errorMessage={errorMessage} />
        </div>
        <div
          className={cx('w-8 h-0.5 bg-gray-300 mt-10', {
            'mt-1': !label,
          })}
        />
        <div className="flex flex-row items-end p-0 gap-1 mt-auto">
          <DatePicker />
        </div>
      </div>
    </div>
  )
}

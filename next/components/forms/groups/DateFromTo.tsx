import cx from 'classnames'

import DatePicker from '../widget-components/DateTimePicker/DatePicker'

type DatePickerBase = {
  label: string
  errorMessage?: string
}

export const DateFromTo = ({ label, errorMessage }: DatePickerBase) => {
  return (
    <div className={cx('flex-col flex items-start p-0 gap-4')}>
      <div className="items-left flex flex-row p-0 gap-4">
        <div className="flex flex-col items-start sm:w-[300px]">
          <DatePicker label={label} errorMessage={errorMessage} />
        </div>
        <div
          className={cx('w-8 h-0.5 bg-gray-300 mt-auto mb-7', {
            'mt-1': !label,
          })}
        />
        <div className="flex flex-row items-end p-0 gap-1 mt-auto sm:w-[300px]">
          <DatePicker />
        </div>
      </div>
    </div>
  )
}

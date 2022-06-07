import cx from 'classnames'
import * as React from 'react'
import { LocalDate } from '@js-joda/core'
import { ReactComponent as Calendar } from '../../../assets/images/calendar.svg'
import { DateSelectShortcuts } from '../DateSelectShortcuts/DateSelectShortcuts'

export type DateSelectProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
> & {
  className?: string
  value: string
  onChange?: (value: string) => void
  showShorcuts?: boolean
}

export const DateSelect = ({ className, value, onChange, showShorcuts, ...rest }: DateSelectProps) => {
  const selectedDate = LocalDate.parse(value)
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const showDate = selectedDate >= LocalDate.now().plusDays(5) || selectedDate < LocalDate.now()

  const showMobileDate = selectedDate >= LocalDate.now().plusDays(3) || selectedDate < LocalDate.now()
  return (
    <div className={cx('flex md:inline-flex rounded-lg overflow-hidden h-16', className)}>
      {showShorcuts && <DateSelectShortcuts value={value} onClick={onChange} />}
      <label className="relative text-primary flex-1 flex items-center text-right">
        <div
          className={cx(
            'absolute md:bg-secondary right-0 sm:right-5 w-full pointer-events-none z-10 flex items-center justify-center md:right-auto md:w-auto',
            {
              'hidden md:block': showMobileDate,
              'md:left-7': showDate,
              'md:left-12': !showDate,
            }
          )}
        >
          <Calendar />
        </div>

        {/* Mobile */}
        {showMobileDate && (
          <div className="absolute w-full text-center sm:hidden pointer-events-none text-default">
            {`${selectedDate.dayOfMonth()}.`} {MONTHS[selectedDate.monthValue() - 1]}
          </div>
        )}

        {/* Desktop */}
        {!showDate && (
          <div className="absolute hidden sm:block bg-secondary left-3 md:left-20 pl-7 w-56 md:w-60 text-left">
            Kalendár
          </div>
        )}

        <input
          className="appearance-none bg-secondary text-center md:pr-6 md:pl-16 focus:outline-none cursor-pointer h-full w-0 sm:w-60"
          type="date"
          onChange={(e) => onChange?.(e.target.value)}
          value={value}
          {...rest}
        />
      </label>
    </div>
  )
}

export default DateSelect

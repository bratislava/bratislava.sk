import { LocalDate } from '@js-joda/core'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import Calendar from '../../../assets/images/calendar.svg'
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
  const { t } = useTranslation()

  const selectedDate = LocalDate.parse(value)
  const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  const showDate = selectedDate >= LocalDate.now().plusDays(5) || selectedDate < LocalDate.now()

  const showMobileDate = selectedDate >= LocalDate.now().plusDays(3) || selectedDate < LocalDate.now()
  return (
    <div className={cx('flex md:inline-flex rounded-lg overflow-hidden h-16', className)}>
      {showShorcuts && <DateSelectShortcuts value={value} onClick={onChange} />}
      <label className="relative flex flex-1 items-center text-right text-category-600">
        <div
          className={cx(
            'absolute md:bg-category-100 right-0 sm:right-5 w-full pointer-events-none z-10 flex items-center justify-center md:right-auto md:w-auto',
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
          <div className="pointer-events-none absolute w-full text-center text-default sm:hidden">
            {`${selectedDate.dayOfMonth()}.`} {t(MONTHS[selectedDate.monthValue() - 1])}
          </div>
        )}

        {/* Desktop */}
        {!showDate && (
          <div className="absolute left-3 hidden w-56 bg-category-100 pl-7 text-left sm:block md:left-20 md:w-60">
            {t('calendar')}
          </div>
        )}

        <input
          className="h-full w-0 cursor-pointer appearance-none bg-category-100 text-center focus:outline-none sm:w-60 md:pr-6 md:pl-16"
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

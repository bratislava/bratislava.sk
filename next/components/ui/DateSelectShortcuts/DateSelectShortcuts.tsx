import { DayOfWeek, LocalDate } from '@js-joda/core'
import cx from 'classnames'
import { useTranslations } from 'next-intl';


const DOW = {
  [DayOfWeek.MONDAY.value()]: 'monday',
  [DayOfWeek.TUESDAY.value()]: 'tuesday',
  [DayOfWeek.WEDNESDAY.value()]: 'wednesday',
  [DayOfWeek.THURSDAY.value()]: 'thursday',
  [DayOfWeek.FRIDAY.value()]: 'friday',
  [DayOfWeek.SATURDAY.value()]: 'saturday',
  [DayOfWeek.SUNDAY.value()]: 'sunday',
}

export interface DateSelectShortcutsProps {
  value: string
  onClick?: (date: string) => void
}

export const DateSelectShortcuts = ({ value, onClick }: DateSelectShortcutsProps) => {
  const today = LocalDate.now()
  const t = useTranslations();

  return (
    <>
      {Array.from({ length: 5 })
        .fill(1)
        .map((_, i) => {
          const date = today.plusDays(i)

          const title = (() => {
            switch (i) {
              case 0:
                return t('today')

              case 1:
                return t('tomorrow')

              default:
                return t(DOW[date.dayOfWeek().value()])
            }
          })()

          const dateValue = date.toJSON()
          const isActive = dateValue === value

          return (
            <button
              className={cx('relative cursor-pointer bg-white px-2 sm:px-4', {
                'text-font hover:text-category-600': !isActive,
                'font-bold text-category-600 hover:text-font': isActive,
                'hidden md:block': i > 2,
              })}
              key={i}
              onClick={() => onClick?.(dateValue)}
            >
              {title}
              {isActive && (
                <div className="absolute left-1/2 top-1/2 mt-4 h-1 w-1 rounded-full bg-current" />
              )}
            </button>
          )
        })}
    </>
  )
}

export default DateSelectShortcuts

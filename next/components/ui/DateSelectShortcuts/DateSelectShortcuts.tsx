import { DayOfWeek, LocalDate } from '@js-joda/core'
import cx from 'classnames'

const DOW = {
  [DayOfWeek.MONDAY.value()]: 'Pondelok',
  [DayOfWeek.TUESDAY.value()]: 'Utorok',
  [DayOfWeek.WEDNESDAY.value()]: 'Streda',
  [DayOfWeek.THURSDAY.value()]: 'Štvrtok',
  [DayOfWeek.FRIDAY.value()]: 'Piatok',
  [DayOfWeek.SATURDAY.value()]: 'Sobota',
  [DayOfWeek.SUNDAY.value()]: 'Nedeľa',
}

export interface DateSelectShortcutsProps {
  value: string
  onClick?: (date: string) => void
}

export const DateSelectShortcuts = ({ value, onClick }: DateSelectShortcutsProps) => {
  const today = LocalDate.now()
  return (
    <>
      {new Array(5).fill(1).map((_, i) => {
        const date = today.plusDays(i)

        const title = (() => {
          switch (i) {
            case 0:
              return 'Dnes'
            case 1:
              return 'Zajtra'
            default:
              return DOW[date.dayOfWeek().value()]
          }
        })()

        const dateValue = date.toJSON()
        const isActive = dateValue === value

        return (
          <button
            className={cx('bg-input-nav-bg px-2 sm:px-4 relative cursor-pointer', {
              'text-font hover:text-primary': !isActive,
              'text-primary hover:text-font font-bold': isActive,
              'hidden md:block': i > 2,
            })}
            key={i}
            onClick={() => onClick?.(dateValue)}
          >
            {title}
            {isActive && <div className="absolute top-1/2 left-1/2 bg-current w-1 h-1 rounded-full mt-4" />}
          </button>
        )
      })}
    </>
  )
}

export default DateSelectShortcuts

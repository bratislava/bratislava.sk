import { CalendarDate } from '@internationalized/date'
import cx from 'classnames'
import { useRef } from 'react'
import { useCalendarCell } from 'react-aria'
import { CalendarState } from 'react-stately'

type CalendarCellBase = {
  state: CalendarState
  date: CalendarDate
}

const CalendarCell = ({ state, date }: CalendarCellBase) => {
  const ref = useRef<HTMLDivElement>(null)
  const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, formattedDate } = useCalendarCell(
    { date },
    state,
    ref
  )
  return (
    <div {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        className={cx(
          'flex h-10 w-10 items-center justify-center text-p2-medium focus:rounded-lg focus:bg-gray-700 focus:text-white',
          {
            'rounded-lg bg-gray-700 text-white': isSelected,
            'hover:rounded-lg hover:bg-gray-50': !isOutsideVisibleRange && !isSelected,
            'opacity-50': isOutsideVisibleRange,
          }
        )}
      >
        {formattedDate.replace('.', '')}
      </div>
    </div>
  )
}

export default CalendarCell

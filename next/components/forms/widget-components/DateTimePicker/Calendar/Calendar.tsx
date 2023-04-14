import ChevronIconLeft from '@assets/images/forms/chevron-left.svg'
import ChevronIconRight from '@assets/images/forms/chevron-right.svg'
import { createCalendar } from '@internationalized/date'
import Button from 'components/forms/simple-components/Button'
import { useRef } from 'react'
import { useButton, useCalendar, useLocale } from 'react-aria'
import { useCalendarState } from 'react-stately'

import CalendarGrid from './CalendarGrid'

type CalendarBase = {
  onSubmit?: () => void
  onReset?: () => void
}

const Calendar = ({ onSubmit, onReset, ...rest }: CalendarBase) => {
  const { locale } = useLocale()
  const state = useCalendarState({
    ...rest,
    locale,
    createCalendar,
  })
  const ref = useRef<HTMLDivElement>(null)
  const prevTriggerRef = useRef<HTMLButtonElement>(null)
  const nextTriggerRef = useRef<HTMLButtonElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar({ ...rest }, state)

  const { buttonProps: prevButtonPropsBtn } = useButton({ ...prevButtonProps }, prevTriggerRef)
  const { buttonProps: nextButtonPropsBtn } = useButton({ ...nextButtonProps }, nextTriggerRef)

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="w-full max-w-xs rounded-lg border-2 border-gray-700 bg-white"
    >
      <div className="flex justify-between px-4 py-3">
        <button
          className="flex h-6 w-6 items-center justify-center focus:outline-none"
          ref={prevTriggerRef}
          type="button"
          {...prevButtonPropsBtn}
        >
          <ChevronIconLeft />
        </button>
        <span className="text-default font-semibold">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
        <button
          className="flex h-6 w-6 items-center justify-center focus:outline-none"
          ref={nextTriggerRef}
          type="button"
          {...nextButtonPropsBtn}
        >
          <ChevronIconRight />
        </button>
      </div>
      <CalendarGrid state={state} />
      <div className="flex items-center justify-between border-t-2 border-gray-700 px-4 py-3">
        <Button onPress={onReset} variant="black-plain" size="sm">
          Resetovať
        </Button>
        <Button onPress={onSubmit} variant="black" size="sm">
          Potvrdiť
        </Button>
      </div>
    </div>
  )
}

export default Calendar

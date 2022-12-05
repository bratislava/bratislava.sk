/* eslint-disable lodash-fp/no-extraneous-args */
import cx from 'classnames'
import Button from 'components/forms/Button'
import padStart from 'lodash/padStart'
import React, { MouseEvent, useRef } from 'react'
import { useDidMount } from 'rooks'

type TimeSelectorBase = {
  onClose?: () => void
  onSubmit?: () => void
  setHour: React.Dispatch<React.SetStateAction<string>>
  setMinute: (value: string) => void
  hour: string
  minute: string
}

const HOURS_LIMIT = 23
const MINUTES_LIMIT = 59

const TimeSelector = ({
  onClose,
  onSubmit,
  setHour,
  setMinute,
  hour,
  minute,
}: TimeSelectorBase) => {
  const hoursArray = Array.from({ length: HOURS_LIMIT + 1 }, (_, i) => i + 0)
  const minutesArray = Array.from({ length: MINUTES_LIMIT + 1 }, (_, i) => i + 0)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const hoursItemRef = useRef<HTMLButtonElement[]>([])
  const minutesItemRef = useRef<HTMLButtonElement[]>([])

  const clickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'hour' | 'minute',
    value: string,
  ) => {
    const hoursItemOffset =
      hoursItemRef && hoursItemRef.current ? hoursItemRef.current[+value]?.offsetTop : 0
    const minutesItemOffset =
      minutesItemRef && minutesItemRef.current ? minutesItemRef?.current[+value]?.offsetTop : 0
    if (type === 'hour') {
      setHour(value)
      hourRef?.current?.scrollTo({ top: hoursItemOffset - 125, behavior: 'smooth' })
    }
    if (type === 'minute') {
      setMinute(value)
      minuteRef?.current?.scrollTo({ top: minutesItemOffset - 125, behavior: 'smooth' })
    }
    e.preventDefault()
  }

  useDidMount(() => {
    const hoursItemOffset =
      hoursItemRef && hoursItemRef.current ? hoursItemRef.current[+hour]?.offsetTop : 0
    const minutesItemOffset =
      minutesItemRef && minutesItemRef.current ? minutesItemRef?.current[+minute]?.offsetTop : 0
    hourRef?.current?.scrollTo({ top: hoursItemOffset - 125, behavior: 'auto' })
    minuteRef?.current?.scrollTo({ top: minutesItemOffset - 125, behavior: 'auto' })
  })

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-gray-700 bg-white">
      <div className="flex w-full flex-col justify-between py-10">
        <div className="flex h-fit max-h-52 justify-between overflow-hidden px-4">
          <div className="overflow-x-hidden flex flex-col items-center justify-start">
            <div ref={hourRef} className="flex flex-col overflow-y-auto scrollbar-hide">
              <span className="pt-[84px] focus:outline-none" />
              {hoursArray?.map((item) => (
                <button
                  ref={(el: HTMLButtonElement) =>
                    hoursItemRef ? (hoursItemRef.current[item] = el) : null
                  }
                  id={`btn-${item}`}
                  type="button"
                  key={item}
                  onClick={(e) => {
                    clickHandler(e, 'hour', `${item}`)
                  }}
                  className={cx('cursor-pointer rounded-lg px-10 py-2 focus:outline-none', {
                    'bg-gray-100': +hour === item,
                  })}
                >
                  <span className="flex h-6 w-12 items-center justify-center">
                    {padStart(`${item}`, 2, '0')}
                  </span>
                </button>
              ))}
              <span className="pb-[84px] focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-20 flex h-6 w-6 items-center justify-center">:</span>
          </div>
          <div className="overflow-x-hidden flex flex-col items-center justify-start">
            <div ref={minuteRef} className="flex flex-col overflow-y-auto scrollbar-hide">
              <span className="pt-[84px] focus:outline-none" />
              {minutesArray?.map((item) => (
                <button
                  ref={(el: HTMLButtonElement) =>
                    minutesItemRef ? (minutesItemRef.current[item] = el) : null
                  }
                  id={`btn-${item}`}
                  type="button"
                  key={item}
                  onClick={(e) => {
                    clickHandler(e, 'minute', `${item}`)
                  }}
                  className={cx('cursor-pointer rounded-lg px-10 py-2 focus:outline-none', {
                    'bg-gray-100': +minute === item,
                  })}
                >
                  <span className="flex h-6 w-12 items-center justify-center">
                    {padStart(`${item}`, 2, '0')}
                  </span>
                </button>
              ))}
              <span className="pb-[84px] focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-2 border-gray-700 py-3 px-4">
        <Button onPress={onClose} text="Zrušiť" variant="plain-black" size="sm" />
        <Button onPress={onSubmit} text="Potvrdiť" variant="black" size="sm" />
      </div>
    </div>
  )
}

export default TimeSelector

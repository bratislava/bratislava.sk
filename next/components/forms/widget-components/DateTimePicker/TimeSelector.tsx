/* eslint-disable lodash-fp/no-extraneous-args */
import cx from 'classnames'
import Button from 'components/forms/simple-components/Button'
import padStart from 'lodash/padStart'
import React, { MouseEvent, useEffect, useRef } from 'react'
import { useDidMount } from 'rooks'

type TimeSelectorBase = {
  onReset?: () => void
  onSubmit?: () => void
  setHour: React.Dispatch<React.SetStateAction<string>>
  setMinute: React.Dispatch<React.SetStateAction<string>>
  hour: string
  minute: string
  onChange?: (value?: string) => void
  value?: string
  minValue?: string
  maxValue?: string
  fillAllBeforeSubmit?: boolean
  setIsInputEdited?: React.Dispatch<React.SetStateAction<boolean>>
}

const HOURS_LIMIT = 23
const MINUTES_LIMIT = 59

const TimeSelector = ({
  onReset,
  onSubmit,
  setHour,
  setMinute,
  hour,
  minute,
  onChange,
  setIsInputEdited,
  minValue,
  maxValue,
  value,
}: TimeSelectorBase) => {
  const hoursArray = Array.from({ length: HOURS_LIMIT + 1 }, (_, i) => i + 0)
  const minutesArray = Array.from({ length: MINUTES_LIMIT + 1 }, (_, i) => i + 0)
  const minValueArray = minValue?.split(':').map((value) => parseInt(value, 10))
  const maxValueArray = maxValue?.split(':').map((value) => parseInt(value, 10))
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const hoursItemRef = useRef<HTMLButtonElement[]>([])
  const minutesItemRef = useRef<HTMLButtonElement[]>([])

  const timeValueFormat = `${hour ? padStart(hour, 2, '0') : ''}${hour || minute ? ':' : ''}${
    minute ? padStart(minute, 2, '0') : ''
  }`
  const timeFormatArray = value
    ? value.split(':').map((value) => parseInt(value, 10) || 0)
    : minValue
    ? minValue.split(':').map((value) => parseInt(value, 10) || 0)
    : [0, 0]

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
      if (!minute) {
        setMinute(timeFormatArray[1].toString())
      }
      setHour(value)
      hourRef?.current?.scrollTo({ top: hoursItemOffset - 125, behavior: 'smooth' })
    }
    if (type === 'minute') {
      if (!hour) {
        setHour(timeFormatArray[0].toString())
      }
      setMinute(value)
      minuteRef?.current?.scrollTo({ top: minutesItemOffset - 125, behavior: 'smooth' })
    }
    setIsInputEdited?.(false)
    e.preventDefault()
  }

  useEffect(() => {
    if (onChange && timeValueFormat) {
      onChange(timeValueFormat)
    }
  }, [timeValueFormat])

  useDidMount(() => {
    const hoursItemOffset = hoursItemRef?.current?.[+timeFormatArray[0]]?.offsetTop || 0
    const minutesItemOffset = minutesItemRef?.current?.[+timeFormatArray[1]]?.offsetTop || 0
    hourRef?.current?.scrollTo({ top: hoursItemOffset - 125, behavior: 'auto' })
    minuteRef?.current?.scrollTo({ top: minutesItemOffset - 125, behavior: 'auto' })
  })

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-gray-700 bg-white">
      <div className="flex w-full flex-col justify-between py-10">
        <div className="flex h-fit max-h-52 justify-between overflow-hidden px-4">
          <div className="flex flex-col items-center justify-start overflow-x-hidden">
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
                    'bg-gray-100': +timeFormatArray[0] === item,
                    'pointer-events-none opacity-50':
                      (minValueArray && item < minValueArray[0]) ||
                      (maxValueArray && item > maxValueArray[0]),
                    'qwe pointer-events-none opacity-50':
                      (minValueArray &&
                        parseInt(minute, 10) < minValueArray[1] &&
                        item <= minValueArray[0]) ||
                      (maxValueArray &&
                        parseInt(minute, 10) > maxValueArray[1] &&
                        item >= maxValueArray[0]),
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
          <div className="flex flex-col items-center justify-start overflow-x-hidden">
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
                    'bg-gray-100': +timeFormatArray[1] === item,
                    'pointer-events-auto cursor-pointer opacity-100':
                      (minValueArray && minValueArray[0] < timeFormatArray[0]) ||
                      (maxValueArray && maxValueArray[0] > timeFormatArray[0]),
                    'pointer-events-none opacity-50':
                      (minValueArray && item < minValueArray[1]) ||
                      (maxValueArray && item > maxValueArray[1]),
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
        <Button onPress={onReset} text="Resetovať" variant="plain-black" size="sm" />
        <Button onPress={onSubmit} text="Potvrdiť" variant="black" size="sm" />
      </div>
    </div>
  )
}

export default TimeSelector

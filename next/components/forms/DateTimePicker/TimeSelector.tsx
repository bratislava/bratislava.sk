/* eslint-disable lodash-fp/no-extraneous-args */
import cx from 'classnames'
import Button from 'components/forms/Button'
import padStart from 'lodash/padStart'
import React, { ReactNode, useRef, useState } from 'react'
import { useButton } from 'react-aria'
import { useDidMount } from 'rooks'

type TimeSelectorBase = {
  onClose?: () => void
  onSubmit?: () => void
  setHour: React.Dispatch<React.SetStateAction<string>>
  setMinute: React.Dispatch<React.SetStateAction<string>>
  hour: string
  minute: string
}

type ButtonBase = {
  children: ReactNode
  className?: string
  onPress?: () => void
}
// Constants
const HOURS_LIMIT = 23
const MINUTES_LIMIT = 59
const SCROLL_STEP = 40

const TimeSelector = ({
  onClose,
  onSubmit,
  setHour,
  setMinute,
  hour,
  minute,
}: TimeSelectorBase) => {
  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const hoursArray = Array.from({ length: HOURS_LIMIT + 1 }, (_, i) => i + 0)
  const minutesArray = Array.from({ length: MINUTES_LIMIT + 1 }, (_, i) => i + 0)

  const [translateYHour, setTranslateYHour] = useState<number>(+hour * -SCROLL_STEP)
  const [translateYMinute, setTranslateYMinute] = useState<number>(+minute * -SCROLL_STEP)

  const lastPositionHour = -SCROLL_STEP * HOURS_LIMIT
  const lastPositionMinute = -SCROLL_STEP * MINUTES_LIMIT

  // Function for pass a condition by type (limits of scrolling)
  const translateMoveCondition = (
    prevState: number,
    nextPosition: number,
    type: 'hour' | 'minute',
  ): boolean => {
    if (type === 'hour') {
      return prevState - nextPosition <= -prevState && prevState - nextPosition >= lastPositionHour
    }
    if (type === 'minute') {
      return (
        prevState - nextPosition <= -prevState && prevState - nextPosition >= lastPositionMinute
      )
    }
    return false
  }

  // Set value when scroll with limits by type
  const setValueCondtion = (prevState: number, delta: number, type: 'hour' | 'minute'): string => {
    if (prevState === 0 && delta > 0) return `${prevState + delta}`
    if (type === 'hour' && prevState === HOURS_LIMIT && delta > 0) return `${prevState}`
    if (type === 'minute' && prevState === MINUTES_LIMIT && delta > 0) return `${prevState}`
    if (prevState > 0) return `${prevState + delta}`
    return `${prevState}`
  }

  const wheelHandler = (event: WheelEvent, type: 'hour' | 'minute') => {
    // delta is direction (up or down)
    const delta = event.deltaY > 0 ? 1 : -1
    const nextPosition = SCROLL_STEP * delta

    if (type === 'hour') {
      setTranslateYHour((prev) =>
        translateMoveCondition(prev, nextPosition, type) ? prev - nextPosition : prev,
      )
      setHour((prev) => setValueCondtion(+prev, delta, type))
    }
    if (type === 'minute') {
      setTranslateYMinute((prev) =>
        translateMoveCondition(prev, nextPosition, type) ? prev - nextPosition : prev,
      )
      setMinute((prev) => setValueCondtion(+prev, delta, type))
    }
    event.preventDefault()
  }
  // Events
  useDidMount(() => {
    hourRef?.current?.addEventListener('wheel', (e) => wheelHandler(e, 'hour'), { passive: false })
    hourRef?.current?.addEventListener('mousedown', (e) => e.preventDefault())
    minuteRef?.current?.addEventListener('wheel', (e) => wheelHandler(e, 'minute'), {
      passive: false,
    })
    minuteRef?.current?.addEventListener('mousedown', (e) => e.preventDefault())
    return () => {
      hourRef?.current?.removeEventListener('wheel', (e) => wheelHandler(e, 'hour'))
      minuteRef?.current?.removeEventListener('wheel', (e) => wheelHandler(e, 'minute'))
      hourRef?.current?.removeEventListener('mousedown', (e) => e.preventDefault())
      minuteRef?.current?.removeEventListener('mousedown', (e) => e.preventDefault())
    }
  })

  const ButtonSelector = ({ children, className, onPress, ...rest }: ButtonBase) => {
    const ref = useRef<HTMLButtonElement>(null)
    const { buttonProps } = useButton(
      {
        children,
        ...rest,
        onPress,
      },
      ref,
    )
    return (
      <button {...buttonProps} type="button" className={className}>
        {children}
      </button>
    )
  }

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-gray-700 bg-white">
      <div className="flex w-full flex-col justify-between py-10">
        <div className="flex h-fit max-h-52 justify-between overflow-hidden px-4">
          <div
            ref={hourRef}
            className="overflow-x-hidden flex flex-col items-center justify-start overflow-y-auto scrollbar-hide"
          >
            <div
              className="flex flex-col"
              style={{
                transform: `translate3d(0px, ${translateYHour}px, 0px)`,
                transition: 'transform 1000ms cubic-bezier(0.19, 1, 0.22, 1) 0s',
              }}
            >
              <span className="pt-[84px] focus:outline-none" />
              {hoursArray?.map((item) => (
                <ButtonSelector
                  key={item}
                  onPress={() => {
                    setHour(`${item}`)
                    setTranslateYHour(item * -SCROLL_STEP)
                  }}
                  className={cx('cursor-pointer rounded-lg px-10 py-2 focus:outline-none', {
                    'bg-gray-100': +hour === item,
                  })}
                >
                  <span className="flex h-6 w-12 items-center justify-center">
                    {padStart(`${item}`, 2, '0')}
                  </span>
                </ButtonSelector>
              ))}
              <span className="pb-[84px] focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-20 flex h-6 w-6 items-center justify-center">:</span>
          </div>
          <div
            ref={minuteRef}
            className="overflow-x-hidden flex flex-col items-center justify-start overflow-y-auto scrollbar-hide"
          >
            <div
              className="flex flex-col"
              style={{
                transform: `translate3d(0px, ${translateYMinute}px, 0px)`,
                transition: 'transform 1000ms cubic-bezier(0.19, 1, 0.22, 1) 0s',
              }}
            >
              <span className="pt-[84px] focus:outline-none" />
              {minutesArray?.map((item) => (
                <ButtonSelector
                  key={item}
                  onPress={() => {
                    setMinute(`${item}`)
                    setTranslateYMinute(item * -SCROLL_STEP)
                  }}
                  className={cx('cursor-pointer rounded-lg px-10 py-2 focus:outline-none', {
                    'bg-gray-100': +minute === item,
                  })}
                >
                  <span className="flex h-6 w-12 items-center justify-center">
                    {padStart(`${item}`, 2, '0')}
                  </span>
                </ButtonSelector>
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

/* eslint-disable lodash-fp/no-extraneous-args */
import cx from 'classnames'
import Button from 'components/forms/Button'
import padStart from 'lodash/padStart'
import { ReactNode, useRef, WheelEvent } from 'react'
import { useButton } from 'react-aria'
import { useDidMount } from 'rooks'

type TimeSelectorBase = {
  onClose?: () => void
  onSubmit?: () => void
  setHour: (value: string) => void
  setMinute: (value: string) => void
  hour: string
  minute: string
}

type ButtonBase = {
  children: ReactNode
  className?: string
  onPress?: () => void
}

type SelectorBase = {
  array: number[]
  type: 'hour' | 'minute'
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

  const Selector = ({ array, type }: SelectorBase) => {
    const ref = useRef<HTMLDivElement>(null)

    useDidMount(() => {
      const wheel = (delta: number) => {
        const step = 40
        const position = ref?.current?.scrollTop
        const nextPos = position ? position + step * delta : 0
        ref?.current?.scrollTo({ top: nextPos })
      }
      const wheelHandler = (event: { deltaY: number; preventDefault: () => void }) => {
        // TODO: an error with WheelEvent<HTMLDivElement> type (???)
        // const wheelHandler = (event: WheelEvent<HTMLDivElement>) => {
        const delta = event.deltaY / 100
        if (delta > -2 && delta < 2) {
          wheel(delta)
        }
        event.preventDefault()
      }
      ref?.current?.addEventListener('wheel', wheelHandler, { passive: false })

      return () => ref?.current?.removeEventListener('wheel', wheelHandler)
    })

    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden scrollbar-hide"
      >
        <span className="pt-[84px] focus:outline-none" />
        {array?.map((item) => (
          <ButtonSelector
            key={item}
            onPress={() => {
              if (type === 'hour') setHour(`${item}`)
              if (type === 'minute') setMinute(`${item}`)
            }}
            className={cx(
              'cursor-pointer rounded-lg px-10 py-2 hover:bg-gray-50 focus:outline-none',
              {
                'bg-gray-100':
                  (hour === `${item}` && type === 'hour') ||
                  (minute === `${item}` && type === 'minute'),
              },
            )}
          >
            <span className="flex h-6 w-12 items-center justify-center">
              {padStart(`${item}`, 2, '0')}
            </span>
          </ButtonSelector>
        ))}
        <span className="pb-[84px] focus:outline-none" />
      </div>
    )
  }

  return (
    <div className="w-full max-w-xs rounded-lg border-2 border-gray-700 bg-white">
      <div className="flex w-full flex-col justify-between py-10">
        <div className="flex h-fit max-h-52 justify-between overflow-hidden px-4">
          <Selector array={hoursArray} type="hour" />
          <div className="flex items-center">
            <span className="text-20 flex h-6 w-6 items-center justify-center">:</span>
          </div>
          <Selector array={minutesArray} type="minute" />
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

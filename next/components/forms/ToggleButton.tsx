import * as React from 'react'
import { useToggleState } from '@react-stately/toggle'
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria'
import cx from 'classnames'

type ToggleBase = {
  variant?: 'default'
  className?: string
  isDisabled?: boolean
  error?: boolean
  isReadOnly?: boolean
  defaultSelected?: boolean
  isSelected?: boolean
  children: React.ReactNode
  value: string
}

const Switch = ({ error = false, children, isDisabled = false, variant = 'default', ...rest }: ToggleBase) => {
  let state = useToggleState({ ...rest, isDisabled, children })
  let ref = React.useRef()
  let { inputProps } = useSwitch({ ...rest, isDisabled, children }, state, ref)
  let { focusProps } = useFocusRing()

  let isSelected = state.isSelected
  const toggleContainer = cx('group flex flex-row absolute items-center p-0 gap-4', {
    'opacity-50 cursor-not-allowed': isDisabled,
  })
  const labelStyle = cx('select-none not-italic font-normal text-default leading-8 text-gray-universal-700 ml-16', {})

  const togglerContainer = cx('absolute w-12 h-6 rounded-full items-center justify-center', {
    'bg-[#23D675]': isSelected,
    'bg-[#ADADAD]': !isSelected,
  })

  const toggleBall = cx('absolute w-5 h-5 rounded-full bg-white top-[2px]', {
    'left-[26px]': isSelected,
    'left-[2px]': !isSelected,
  })
  return (
    <label className={toggleContainer}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={togglerContainer}>
        <svg
          className={cx('absolute left-[8.28px] top-[7.72px] right-[6px] bottom-[7.73px]', {
            hidden: !isSelected,
          })}
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.00001 7.78003L1.22001 5.00002L0.276672 5.94336L4.00001 9.66669L12 1.66669L11.0567 0.723358L4.00001 7.78003Z"
            fill="white"
          />
        </svg>
        <svg
          className={cx('absolute left-[29.33px] top-[7.72px] right-[9.33px] bottom-[7.73px]', {
            hidden: isSelected,
          })}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.66668 1.27668L8.72334 0.333344L5.00001 4.05668L1.27668 0.333344L0.333344 1.27668L4.05668 5.00001L0.333344 8.72334L1.27668 9.66668L5.00001 5.94334L8.72334 9.66668L9.66668 8.72334L5.94334 5.00001L9.66668 1.27668Z"
            fill="white"
          />
        </svg>

        <div className={toggleBall}></div>
      </div>

      <div className={labelStyle}>{children}</div>
    </label>
  )
}

export default Switch
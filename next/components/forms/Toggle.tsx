import cx from 'classnames'
import * as React from 'react'
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria'
import { ToggleState, useToggleState } from 'react-stately'

import CheckedIcon from './icon-components/CheckedIcon'
import UnCheckedIcon from './icon-components/UnCheckedIcon'

type ToggleBase = {
  className?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  defaultSelected?: boolean
  isSelected?: boolean
  children: React.ReactNode
  value: string
}

const Toggle = ({ children, isDisabled = false, ...rest }: ToggleBase) => {
  const state: ToggleState = useToggleState({ ...rest, isDisabled, children })
  const ref = React.useRef(null);
  const { inputProps } = useSwitch({ ...rest, isDisabled, children }, state, ref as React.MutableRefObject<null>)
  const { focusProps } = useFocusRing()

  const { isSelected } = state
  const toggleContainer = cx('group flex flex-row items-center p-0 gap-4 select-none', {
    'opacity-50 cursor-not-allowed': isDisabled,
  })
  const labelStyle = cx('select-none not-italic font-normal text-default leading-8 text-gray-universal-700 ml-16', {})

  const togglerContainer = cx('absolute w-12 h-6 rounded-full items-center justify-center', {
    'bg-success-700': isSelected,
    'bg-gray-universal-400': !isSelected,
  })

  const toggleBall = cx('absolute w-5 h-5 rounded-full bg-white top-[2px]', {
    'left-[26px]': isSelected,
    'left-[2px]': !isSelected,
  })
  return (
    <label htmlFor={rest.value} className={toggleContainer}>
      <VisuallyHidden>
        <input id={rest.value} {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={togglerContainer}>
        <CheckedIcon
          className={cx('absolute left-[8.28px] top-[6.72px] right-[6px] bottom-[7.73px]', {
            hidden: !isSelected,
          })}
        />
        <UnCheckedIcon
          className={cx('absolute left-[29.33px] top-[6.72px] right-[9.33px] bottom-[7.73px]', {
            hidden: isSelected,
          })}
        />
        <div className={toggleBall} />
      </div>

      <div className={labelStyle}>{children}</div>
    </label>
  )
}

export default Toggle
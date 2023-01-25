import cx from 'classnames'
import * as React from 'react'
import { useId } from 'react'
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria'
import { ToggleState, useToggleState } from 'react-stately'

import CheckedIcon from '../icon-components/CheckedIcon'
import UnCheckedIcon from '../icon-components/UnCheckedIcon'

type ToggleBase = {
  className?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  defaultSelected?: boolean
  isSelected?: boolean
  children?: React.ReactNode
  value?: string
  id?: string
  onChange?: (isSelected: boolean) => void
}

const Toggle = ({ children, isDisabled = false, ...rest }: ToggleBase) => {
  const state: ToggleState = useToggleState({ ...rest, isDisabled, children })
  const generatedId = useId()
  const generatedOrProvidedId = rest.id ?? generatedId
  const ref = React.useRef(null)
  const { inputProps } = useSwitch(
    { ...rest, isDisabled, children, 'aria-label': generatedOrProvidedId },
    state,
    ref as React.MutableRefObject<null>,
  )
  const { focusProps } = useFocusRing()

  const { isSelected } = state
  const toggleContainer = cx('group select-none flex flex-row items-center p-0 gap-4', {
    'opacity-50 cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  })
  const labelStyle = cx('text-20 select-none not-italic leading-8 text-gray-700')

  const togglerContainer = cx('w-12 h-6 rounded-full flex items-center', {
    'bg-success-700': isSelected,
    'bg-gray-400': !isSelected,
  })

  const toggleBall = cx('w-5 h-5 relative rounded-full bg-white', {
    'left-[26px]': isSelected,
    'left-0.5': !isSelected,
  })
  return (
    <label htmlFor={generatedOrProvidedId} className={toggleContainer}>
      <VisuallyHidden>
        <input id={generatedOrProvidedId} {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div className={togglerContainer}>
        <div
          className={cx('absolute w-4 h-4 flex items-center justify-center ml-1.5', {
            hidden: !isSelected,
          })}
        >
          <CheckedIcon />
        </div>
        <div
          className={cx('ml-[26px] absolute w-4 h-4 flex items-center justify-center', {
            hidden: isSelected,
          })}
        >
          <UnCheckedIcon />
        </div>
        <div className={toggleBall} />
      </div>

      {children && <div className={labelStyle}>{children}</div>}
    </label>
  )
}

export default Toggle

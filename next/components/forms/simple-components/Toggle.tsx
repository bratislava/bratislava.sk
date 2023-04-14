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
  const toggleContainer = cx('group flex select-none flex-row items-center gap-4 p-0', {
    'opacity-50 cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  })
  const labelStyle = cx('text-default select-none text-gray-700')

  const togglerContainer = cx('flex h-6 w-12 items-center rounded-full', {
    'bg-success-700': isSelected,
    'bg-gray-400': !isSelected,
  })

  const toggleBall = cx('relative h-5 w-5 rounded-full bg-white', {
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
          className={cx('absolute ml-1.5 flex h-4 w-4 items-center justify-center', {
            hidden: !isSelected,
          })}
        >
          <CheckedIcon />
        </div>
        <div
          className={cx('absolute ml-[26px] flex h-4 w-4 items-center justify-center', {
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

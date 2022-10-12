import CheckboxChecked from '@assets/images/forms/checkbox-checked.svg'
import CheckboxIntermediated from '@assets/images/forms/checkbox-intermediated.svg'
import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import React from 'react'
import { useCheckbox, useFocusRing } from 'react-aria'
import { useToggleState } from 'react-stately'

type CheckBoxBase = {
  variant?: 'basic' | 'boxed'
  className?: string
  isDisabled?: boolean
  error?: boolean
  isIndeterminate?: boolean
  isSelected?: boolean
  children: React.ReactNode
  value: string
  tooltip?: string
}

const SingleCheckBox = ({
  error = false,
  children,
  tooltip,
  isDisabled = false,
  variant = 'basic',
  ...rest
}: CheckBoxBase) => {
  const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  const state = useToggleState(rest)
  const ref = React.useRef(null)
  const { inputProps } = useCheckbox({ ...rest, isDisabled, children }, state, ref as React.MutableRefObject<null>)

  const { focusProps } = useFocusRing()
  const isSelected = state.isSelected && !rest.isIndeterminate

  const checkboxStyle = cx(
    'focus-visible: outline-none focus:outline-none appearance-none items-center justify-center w-6 h-6 rounded border-2 border-solid border-gray-universal-700 left-0 right-0 top-0 bottom-0',
    {
      'bg-gray-universal-700': isSelected || rest.isIndeterminate,
      'group-hover:border-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && !rest.isIndeterminate && !isSelected && !isDisabled && !error,
      'group-hover:border-gray-universal-600 group-hover:bg-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && isSelected && !isDisabled && !error,
      'opacity-50 cursor-not-allowed': isDisabled,

      // error
      'bg-red-negative-700': error && isSelected,
      'border-red-negative-700': error,
    }
  )

  const containerStyle = cx('group flex flex-row relative items-center justify-center p-0 ', rest.className, {
    'h-12 py-3 px-4 bg-white border-2 border-solid rounded-[8px]': variant === 'boxed',
    'border-gray-universal-300 group-hover:border-gray-500':
      variant === 'boxed' && !isSelected && rest.isIndeterminate && !isDisabled && !error,
    'border-gray-universal-700 hover:border-gray-500': variant === 'boxed' && isSelected && !isDisabled && !error,

    // error
    'border-red-negative-700': variant === 'boxed' && error,
    // disabled
    'opacity-50 cursor-not-allowed': isDisabled,
  })

  const labelStyle = cx(
    'flex select-none not-italic font-normal text-default leading-8 text-gray-universal-700 gap-4 ml-4',
    {}
  )

  return (
    <label htmlFor={rest.value} className={containerStyle}>
      {
        /* TOOLTIP */
        tooltip && (
          <div className="relative">
            {isTooltipOpened && (
              <div className="absolute bottom-5 z-50 h-16 w-56 rounded-lg bg-white p-2 drop-shadow-lg">{tooltip}</div>
            )}
          </div>
        )
      }
      <input id={rest.value} className={checkboxStyle} {...inputProps} {...focusProps} ref={ref} />

      {isSelected && (
        <CheckboxChecked
          className={cx('absolute', {
            hidden: !isSelected,
            'left-[4px]': variant === 'basic',
            'left-[20px]': variant === 'boxed',
          })}
        />
      )}
      {rest.isIndeterminate && (
        <CheckboxIntermediated
          className={cx('absolute', {
            hidden: !rest.isIndeterminate,
            'left-[6px]': variant === 'basic',
            'left-[23px]': variant === 'boxed',
          })}
        />
      )}
      <div className={labelStyle}>
        {children}
        {
          /* TOOLTIP ICON */
          tooltip && (
            <div className="flex-column flex items-center">
              <HelpIcon
                className="cursor-pointer"
                onMouseOver={() => setIsTooltipOpened(true)}
                onMouseLeave={() => setIsTooltipOpened(false)}
              />
            </div>
          )
        }
      </div>
    </label>
  )
}

export default SingleCheckBox

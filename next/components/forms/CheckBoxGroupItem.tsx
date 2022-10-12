import CheckboxChecked from '@assets/images/forms/checkbox-checked.svg'
import CheckboxIntermediated from '@assets/images/forms/checkbox-intermediated.svg'
import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import * as React from 'react'
import { useCheckboxGroupItem, useFocusRing } from 'react-aria'

import { CheckboxGroupContext } from './CheckboxGroup'

type CheckBoxBase = {
  variant?: 'basic' | 'boxed'
  className?: string
  error?: boolean
  isIndeterminate?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  children: React.ReactNode
  value: string
  tooltip?: string
}

const CheckboxGroupItem = ({
  error = false,
  isIndeterminate = false,
  tooltip,
  variant = 'basic',
  ...rest
}: CheckBoxBase) => {
  const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  const state = React.useContext(CheckboxGroupContext)
  const ref = React.useRef(null)
  const { inputProps } = useCheckboxGroupItem({ ...rest, isIndeterminate }, state, ref)
  const { focusProps } = useFocusRing()
  const isDisabled = state.isDisabled || rest.isDisabled
  const isSelected = state.isSelected(rest.value)

  const checkboxStyle = cx(
    'focus-visible: outline-none focus:outline-none appearance-none items-center justify-center w-6 h-6 rounded border-2 border-solid border-gray-universal-700 left-0 right-0 top-0 bottom-0',
    {
      'bg-gray-universal-700': isSelected || isIndeterminate,
      'group-hover:border-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && !isIndeterminate && !isSelected && !isDisabled && !error,
      'group-hover:border-gray-universal-600 group-hover:bg-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && isSelected && !isDisabled && !error,
      'opacity-50 cursor-not-allowed': isDisabled,

      // error
      'bg-red-negative-700': error && isSelected,
      'border-red-negative-700': error,
    }
  )

  const containerStyle = cx('group flex flex-row relative items-center p-0 ', rest.className, {
    'h-12 py-3 px-4 bg-white border-2 border-solid rounded-[8px]': variant === 'boxed',
    'border-gray-universal-300 group-hover:border-[#858585]':
      variant === 'boxed' && !isSelected && isIndeterminate && !isDisabled && !error,
    'border-gray-universal-700 group-hover:border-[#858585]':
      variant === 'boxed' && isSelected && !isDisabled && !error,

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

      {isSelected && !isIndeterminate && (
        <CheckboxChecked
          className={cx('absolute', {
            hidden: !isSelected,
            'left-[4px]': variant === 'basic',
            'left-[20px]': variant === 'boxed',
          })}
        />
      )}
      {isIndeterminate && (
        <CheckboxIntermediated
          className={cx('absolute', {
            hidden: !isIndeterminate,
            'left-[6px]': variant === 'basic',
            'left-[22px]': variant === 'boxed',
          })}
        />
      )}
      <div className={labelStyle}>
        {rest.children}
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

export default CheckboxGroupItem

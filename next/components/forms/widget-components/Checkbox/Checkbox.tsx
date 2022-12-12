import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import * as React from 'react'
import { useCheckboxGroupItem, useFocusRing, VisuallyHidden } from 'react-aria'

import Tooltip from '../../info-components/Tooltip'
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
  children,
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
    'flex items-center justify-center w-6 h-6 rounded border-2 border-solid border-gray-700',
    {
      'bg-gray-700': (isSelected || isIndeterminate) && !error,
      'group-hover:border-gray-600':
        (variant === 'basic' || variant === 'boxed') &&
        !isIndeterminate &&
        !isSelected &&
        !isDisabled &&
        !error,
      'group-hover:border-gray-600 group-hover:bg-gray-600':
        (variant === 'basic' || variant === 'boxed') && isSelected && !isDisabled && !error,
      'opacity-50 cursor-not-allowed': isDisabled,

      // error
      'border-negative-700': error && !isSelected && !isDisabled,
      'bg-negative-700 border-negative-700': error && isSelected && !isDisabled,
    },
  )

  const containerStyle = cx('group flex flex-row', rest.className, {
    'py-3 px-4 bg-white border-2 border-solid rounded-lg': variant === 'boxed',
    'border-gray-300 group-hover:border-gray-500':
      variant === 'boxed' && !isSelected && isIndeterminate && !isDisabled && !error,
    'border-gray-700 group-hover:border-gray-500':
      variant === 'boxed' && isSelected && !isIndeterminate && !isDisabled && !error,

    // error
    'border-negative-700': variant === 'boxed' && error,
    // disabled
    'opacity-50 cursor-not-allowed': isDisabled,
  })

  const labelStyle = cx('flex w-full text-p-md text-gray-700', {})

  return (
    <div>
      {tooltip && (
        <div className="relative">
          <Tooltip
            className="w-max"
            text={tooltip}
            visible={isTooltipOpened}
            arrow="bottom"
            alignArrow="right"
            bottom={0}
            right={variant === 'basic' ? -14 : 5}
            absolute
          />
        </div>
      )}
      <label className={containerStyle}>
        <VisuallyHidden>
          <input id={rest.value} {...inputProps} {...focusProps} ref={ref} />
        </VisuallyHidden>
        <div className="flex w-full gap-4 items-center">
          <div>
            <div className={checkboxStyle}>
              {isSelected && !isIndeterminate && (
                <svg
                  className={cx('', {
                    hidden: !isSelected,
                  })}
                  width="16"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.49999 9.47504L2.02499 6.00004L0.845825 7.17921L5.49999 11.8334L15.5 1.83337L14.3208 0.654205L5.49999 9.47504Z"
                    fill="white"
                  />
                </svg>
              )}
              {isIndeterminate && (
                <svg
                  className={cx('', {
                    hidden: !isIndeterminate,
                  })}
                  width="12"
                  height="2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.8333 1.83333H0.166656V0.166668H11.8333V1.83333Z" fill="white" />
                </svg>
              )}
            </div>
          </div>
          <div className="items-center w-full gap-4 flex">
            <div className={labelStyle}>{children}</div>
            {tooltip && (
              <div className="flex items-center">
                <HelpIcon
                  className="cursor-pointer"
                  onMouseOver={() => setIsTooltipOpened(true)}
                  onMouseLeave={() => setIsTooltipOpened(false)}
                />
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  )
}

export default CheckboxGroupItem

import cx from 'classnames'
import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'
import React from 'react'
import { useCheckbox, useFocusRing, VisuallyHidden } from 'react-aria'
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
  onChange?: (isSelected: boolean) => void
  fullWidth?: boolean
  required?: boolean
}

const SingleCheckBox = ({
  error = false,
  children,
  tooltip,
  isDisabled = false,
  variant = 'basic',
  fullWidth,
  required,
  ...rest
}: CheckBoxBase) => {
  const state = useToggleState(rest)
  const ref = React.useRef<HTMLInputElement>(null)
  const { inputProps } = useCheckbox({ ...rest, isDisabled, children }, state, ref)

  const { focusProps } = useFocusRing()
  const isSelected = state.isSelected && !rest.isIndeterminate

  const checkboxStyle = cx(
    'flex items-center justify-center w-6 h-6 rounded border-2 border-solid border-gray-700',
    {
      'bg-gray-700': (isSelected || rest.isIndeterminate) && !error,
      'group-hover:border-gray-600':
        (variant === 'basic' || variant === 'boxed') &&
        !rest.isIndeterminate &&
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

  const containerStyle = cx(
    'group flex flex-row  items-center justify-center p-0 gap-4',
    rest.className,
    {
      'py-3 px-4 bg-white border-2 border-solid rounded-lg': variant === 'boxed',
      'border-gray-300 group-hover:border-gray-500':
        variant === 'boxed' && !isSelected && rest.isIndeterminate && !isDisabled && !error,
      'border-gray-700 group-hover:border-gray-500':
        variant === 'boxed' && isSelected && !isDisabled && !error,

      // error
      'border-negative-700': variant === 'boxed' && error,
      // disabled
      'opacity-50 cursor-not-allowed': isDisabled,
    },
  )

  const labelStyle = cx('flex items-center select-none font-normal text-p-md text-gray-700 gap-4', {
    'w-full': fullWidth,
  })

  return (
    <div>
      <label htmlFor={rest.value} className={containerStyle}>
        <VisuallyHidden>
          <input id={rest.value} {...inputProps} {...focusProps} ref={ref} />
        </VisuallyHidden>
        <div className={checkboxStyle}>
          {isSelected && (
            <svg
              className={cx({
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
          {rest.isIndeterminate && (
            <svg
              className={cx({
                hidden: !rest.isIndeterminate,
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
        <div className={labelStyle}>
          <div
            className={cx('relative', {
              'after:text-20-semibold after:content-["*"] after:ml-0.5 after:absolute after:bottom-0.5 after:text-main-700':
                required,
            })}
          >
            {children}
          </div>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
      </label>
    </div>
  )
}

export default SingleCheckBox

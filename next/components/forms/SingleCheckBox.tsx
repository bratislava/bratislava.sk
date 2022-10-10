import React from 'react'
import { useCheckbox, useFocusRing } from 'react-aria'
import { useToggleState } from '@react-stately/toggle'
import cx from 'classnames'
import HelpIcon from '@assets/images/forms/icon-help.svg'
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
  let state = useToggleState(rest)
  let ref = React.useRef()
  let { inputProps } = useCheckbox({ ...rest, isDisabled, children }, state, ref)
  
  let { focusProps } = useFocusRing()
  let isSelected = state.isSelected && !rest.isIndeterminate

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
      'border-red-negative-700': error && !isSelected && !isDisabled,
      'bg-red-negative-700 border-red-negative-700': error && isSelected && !isDisabled,
    }
  )

  const containerStyle = cx('group flex flex-row relative items-center justify-center p-0 ', rest.className, {
    'h-12 py-3 px-4 bg-white border-2 border-solid rounded-[8px]': variant === 'boxed',
    'border-gray-universal-300 group-hover:border-[#858585]':
      variant === 'boxed' && !isSelected && rest.isIndeterminate && !isDisabled && !error,
    'border-gray-universal-700 group-hover:border-[#858585]':
      variant === 'boxed' && isSelected && !isDisabled && !error,

    //error
    'border-red-negative-700': variant === 'boxed' && error,
    // disabled
    'opacity-50 cursor-not-allowed': isDisabled,
  })

  const labelStyle = cx(
    'flex select-none not-italic font-normal text-default leading-8 text-gray-universal-700 gap-4 ml-4',
    {}
  )

  return (
    <label className={containerStyle}>
      {
        /* TOOLTIP */
        tooltip && (
          <div className="relative">
            {isTooltipOpened && (
              <div className="z-50 absolute bottom-5 h-16 w-56 rounded-lg bg-white p-2 drop-shadow-lg">{tooltip}</div>
            )}
          </div>
        )
      }
      <input className={checkboxStyle} {...inputProps} {...focusProps} ref={ref} />

      {isSelected && (
        <svg
          className={cx('absolute', {
            hidden: !isSelected,
            'left-[4px]': variant === 'basic',
            'left-[20px]': variant === 'boxed',
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
          className={cx('absolute', {
            hidden: !rest.isIndeterminate,
            'left-[6px]': variant === 'basic',
            'left-[23px]': variant === 'boxed',
          })}
          width="12"
          height="2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.8333 1.83333H0.166656V0.166668H11.8333V1.83333Z" fill="white" />
        </svg>
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

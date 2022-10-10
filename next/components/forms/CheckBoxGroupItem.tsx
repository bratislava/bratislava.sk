import * as React from 'react'
import { useCheckboxGroupItem, useFocusRing } from 'react-aria'
import cx from 'classnames'
import { CheckboxGroupContext } from './CheckboxGroup'
import HelpIcon from '@assets/images/forms/icon-help.svg'
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

const CheckboxGroupItem = ({ error = false, isIndeterminate = false, tooltip, variant = 'basic', ...rest }: CheckBoxBase) => {
  const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  let state = React.useContext(CheckboxGroupContext)
  let ref = React.useRef()
  let { inputProps } = useCheckboxGroupItem({ ...rest, isIndeterminate }, state, ref)
  let { focusProps } = useFocusRing()
  let isDisabled = state.isDisabled || rest.isDisabled
  let isSelected = state.isSelected(rest.value)

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
      'border-red-negative-700': error && !isSelected && !isDisabled,
      'bg-red-negative-700 border-red-negative-700': error && isSelected && !isDisabled,
    }
  )

  const containerStyle = cx('group flex flex-row relative items-center p-0 ', rest.className, {
    'h-12 py-3 px-4 bg-white border-2 border-solid rounded-[8px]': variant === 'boxed',
    'border-gray-universal-300 group-hover:border-[#858585]':
      variant === 'boxed' && !isSelected && isIndeterminate && !isDisabled && !error,
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

      {isSelected && !isIndeterminate && (
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
      {isIndeterminate && (
        <svg
          className={cx('absolute', {
            hidden: !isIndeterminate,
            'left-[6px]': variant === 'basic',
            'left-[22px]': variant === 'boxed',
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

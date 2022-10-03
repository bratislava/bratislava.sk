import * as React from 'react'
import { useCheckboxGroupItem, useFocusRing } from 'react-aria'
import cx from 'classnames'
import { CheckboxGroupContext } from './CheckboxGroup'

type CheckBoxBase = {
  variant?: 'basic' | 'boxed'
  className?: string
  error?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  children: React.ReactNode
  value: string
}

const CheckboxGroupItem = ({ error = false, variant = 'basic', ...rest }: CheckBoxBase) => {
  let state = React.useContext(CheckboxGroupContext)
  let ref = React.useRef()
  let { inputProps } = useCheckboxGroupItem({ ...rest }, state, ref)
  let { focusProps } = useFocusRing()
  let isDisabled = state.isDisabled || rest.isDisabled
  let isSelected = state.isSelected(rest.value)

  const checkboxStyle = cx(
    'relative focus-visible: outline-none focus:outline-none appearance-none items-center justify-center w-6 h-6 rounded-[4px] border-2 border-solid border-gray-universal-700 left-0 right-0 top-0 bottom-0',
    {
      'bg-gray-universal-700': isSelected,
      'group-hover:border-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && !isSelected && !isDisabled && !error,
      'group-hover:border-gray-universal-600 group-hover:bg-gray-universal-600':
        (variant === 'basic' || variant === 'boxed') && isSelected && !isDisabled && !error,
      'opacity-50 cursor-not-allowed text-red-negative-700': isDisabled,

      // error
      'border-red-negative-700': error && !isSelected && !isDisabled,
      'bg-red-negative-700 border-red-negative-700': error && isSelected && !isDisabled,
    }
  )

  const containerStyle = cx('group flex flex-row items-center justify-center p-0 gap-4', rest.className, {
    'h-12 py-3 px-4 bg-[#FFFFFF] border-2 border-solid rounded-[8px]': variant === 'boxed',
    'border-gray-universal-300 hover:border-[#858585]': variant === 'boxed' && !isSelected && !isDisabled && !error,
    'border-gray-universal-700 hover:border-[#858585]': variant === 'boxed' && isSelected && !isDisabled && !error,

    //error
    'border-[red]': variant === 'boxed' && error,
    // disabled
    'opacity-50 cursor-not-allowed': isDisabled,
  })

  const labelStyle = cx(
    'select-none not-italic font-normal text-xl leading-8 text-gray-universal-700 flex-none order-1 grow',
    {}
  )

  return (
    <label className={containerStyle}>
      <input className={checkboxStyle} {...inputProps} {...focusProps} ref={ref} />

      {isSelected && (
        <svg
          className={cx('absolute', {
            hidden: !isSelected,
            'left-[34px]': variant === 'basic',
            'left-[52px]': variant === 'boxed',
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
      <div className={labelStyle}>{rest.children}</div>
    </label>
  )
}

export default CheckboxGroupItem

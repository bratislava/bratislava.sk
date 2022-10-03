import * as React from 'react'
import { useRadio } from 'react-aria'
import cx from 'classnames'
import { RadioContext } from './RadioGroup'

type RadioBase = {
  variant?: 'basic' | 'boxed' | 'card'
  className?: string
  isDisabled?: boolean
  error?: boolean
  children: React.ReactNode
  value: string
}

export default function Radio({ error = false, isDisabled = false, variant = 'basic', ...rest }: RadioBase) {
  let state = React.useContext(RadioContext)

  let ref = React.useRef(null)
  let { inputProps } = useRadio({ ...rest, isDisabled }, state, ref)
  const inputStyle = cx(
    `focus-visible: outline-none focus:outline-none appearance-none bg-white m-0 w-6 h-6 grid place-content-center left-0 right-0 top-0 bottom-0 rounded-[1000px] border-2 border-solid border-gray-universal-700`,
    rest.className,
    {
      'before:w-4 before:h-4 before:left-[14px] before:top-[14px] before:bg-gray-universal-700 before:rounded-[10px]':
        inputProps.checked,
      'border-negative-700 before:bg-negative-700': error,

      // hover
      'hover:before:bg-gray-universal-600 hover:border-gray-universal-600 ': !isDisabled && inputProps.checked && !error,
      'hover:border-gray-universal-600': !isDisabled && !error,

      // disabled
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  )

  const containerStyle = cx('flex', rest.className, {
    'flex-row items-center p-0 gap-4 w-[320px] h-8 left-[20px] top-[20px]': variant === 'basic' && !error,
    'flex-row items-center p-0 gap-4 w-56 h-12 py-3 px-4 bg-white border-2 border-solid':
      variant === 'boxed',
    'border-[#D6D6D6] rounded-[8px]': variant === 'boxed' && !error,
    'border-negative-700 rounded-[8px]': variant === 'boxed' && error,

    'flex-col justify-end items-start p-6 w-[384px] h-32 left-[20px] top-[20px] border-2 border-solid border-[#D6D6D6] rounded-[8px]':
      variant === 'card',
    'border-[black] hover:border-gray-universal-600':
      (variant === 'boxed' || variant === 'card') && !error && inputProps.checked && !isDisabled,
    'hover:border-[#858585]':
      (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked && !isDisabled,
    'border-negative-700': variant === 'card' && error && !isDisabled,

    'opacity-50 cursor-not-allowed': isDisabled,
  })

  return (
    <label className={containerStyle}>
      {variant === 'card' ? (
        <div className={'flex flex-col items-start p-0 gap-4 w-[336px] h-16'}>
          <input {...inputProps} ref={ref} className={inputStyle} />
          <div className={'not-italic font-normal text-[20px] leading-8 text-gray-universal-700 flex-none order-1 grow'}>{rest.children}</div>
        </div>
      ) : (
        <>
          <input {...inputProps} ref={ref} className={inputStyle} />
          <div className={'not-italic font-normal text-[20px] leading-8 text-gray-universal-700 flex-none order-1 grow'}>{rest.children}</div>
        </>
      )}
    </label>
  )
}

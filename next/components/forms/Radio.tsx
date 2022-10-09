import * as React from 'react'
import { useRadio } from 'react-aria'
import cx from 'classnames'
import { RadioContext } from './RadioGroup'
import HelpIcon from '@assets/images/forms/icon-help.svg'

type RadioBase = {
  variant?: 'basic' | 'boxed' | 'card'
  className?: string
  isDisabled?: boolean
  error?: boolean
  children: React.ReactNode
  value: string
  tooltip?: string
}

const Radio = ({ error = false, isDisabled = false, tooltip, variant = 'basic', ...rest }: RadioBase) => {
  let state = React.useContext(RadioContext)
  const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  let ref = React.useRef(null)
  let { inputProps } = useRadio({ ...rest, isDisabled }, state, ref)
  const inputStyle = cx(
    `focus-visible:outline-none focus:outline-none appearance-none bg-white m-0 w-6 h-6 grid place-content-center left-0 right-0 top-0 bottom-0 rounded-full border-2 border-solid`,
    rest.className,
    {
      'border-gray-universal-700': !error,
      'before:w-4 before:h-4 before:left-[14px] before:top-[14px] before:bg-gray-universal-700 before:rounded-full':
        inputProps.checked,
      'border-red-negative-700 before:bg-red-negative-700': error,

      // hover
      'hover:before:bg-gray-universal-600 hover:border-gray-universal-600 ':
        !isDisabled && inputProps.checked && !error,
      'hover:border-gray-universal-600': !isDisabled && !error,

      // disabled
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  )

  const containerStyle = cx('flex flex-row items-center mt-1 rounded-8', rest.className, {
    'p-0 h-8 left-[20px] top-[20px]': variant === 'basic' && !error,
    'p-0 h-12 py-3 px-4 border-2 border-solid': variant === 'boxed',
    'bg-white': variant !== 'basic',
    'border-[#D6D6D6]': (variant === 'boxed' || variant === 'card') && !error  && !inputProps.checked,
    'border-red-negative-700 rounded-8': (variant === 'card' || variant === 'boxed') && error,
    'flex-col p-6 left-[20px] top-[20px] border-2 border-solid rounded-8':
      variant === 'card',
    'border-gray-universal-700 hover:border-[#858585]':
      (variant === 'boxed' || variant === 'card') && !error && inputProps.checked && !isDisabled,
    'hover:border-[#858585]':
      (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked && !isDisabled,

    'opacity-50 cursor-not-allowed': isDisabled,
  })

  return (
    <label className={containerStyle}>
      {/* TOOLTIP */
        tooltip && (
          <div className="relative">
            {
              isTooltipOpened && <div className="z-10 absolute bottom-5 h-16 w-96 rounded-lg bg-white p-2 drop-shadow-lg">{tooltip}</div>
            }
          </div>
        )
      }
      {variant === 'card' ? (
        <div className={'flex flex-col items-start p-0 gap-4 w-336'}>
          <input {...inputProps} ref={ref} className={inputStyle} />
          <div
            className={'not-italic font-normal text-default leading-8 text-gray-universal-700'}
          >
            {rest.children}
            {
              tooltip && (
                <div className="flex flex-row mt-8">
                  <HelpIcon className="cursor-pointer"
                            onMouseOver={() => setIsTooltipOpened(true)}
                            onMouseLeave={() => setIsTooltipOpened(false)}/>
                </div>
              )
            }
          </div>
        </div>
      ) : (
        <>
          <input {...inputProps} ref={ref} className={inputStyle} />
          <div
            className={'flex not-italic font-normal text-default leading-8 text-form-black-default ml-4'}
          >
            {rest.children}
            {
              tooltip && (
                <div className="flex flex-row items-center ml-4">
                  <HelpIcon className="cursor-pointer"
                            onMouseOver={() => setIsTooltipOpened(true)}
                            onMouseLeave={() => setIsTooltipOpened(false)}/>
                </div>
              )
            }
          </div>
        </>
      )}
    </label>
  )
}

export default Radio
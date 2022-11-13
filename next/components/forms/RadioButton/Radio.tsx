// import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import * as React from 'react'
import { useRadio } from 'react-aria'

// import Tooltip from '../Tooltip'
import { RadioContext } from './RadioGroup'

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
  const state = React.useContext(RadioContext)
  // const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  const ref = React.useRef(null)
  const { inputProps } = useRadio({ ...rest, isDisabled }, state , ref)
  const inputStyle = cx(
    `focus-visible:outline-none focus:outline-none appearance-none bg-white m-0 w-6 h-6 grid place-content-center left-0 right-0 top-0 bottom-0 rounded-full border-2 border-solid`,
    rest.className,
    {
      'border-gray-universal-700': !error,
      'before:w-4 before:h-4 before:bg-gray-universal-700 before:rounded-full':
      inputProps.checked,
      'border-form-alert-error-default before:bg-form-alert-error-default': error,

      // hover
      'group-hover:before:bg-gray-universal-600 group-hover:border-gray-universal-600': !isDisabled && !error,

      // disabled
      'opacity-50 cursor-not-allowed': isDisabled,
    }
  )

  const containerStyle = cx('group flex flex-row items-center mt-1 rounded-8', rest.className, {
    'p-0 h-8': variant === 'basic' && !error,
    'p-0 h-12 py-3 px-4 border-2 border-solid': variant === 'boxed',
    'bg-white': variant !== 'basic',
    'border-[#D6D6D6]': (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked,
    'border-form-alert-error-default rounded-8': (variant === 'card' || variant === 'boxed') && error,
    'flex-col p-6 border-2 border-solid rounded-8 w-[384px]': variant === 'card',
    'border-gray-universal-700 hover:border-gray-500':
      (variant === 'boxed' || variant === 'card') && !error && inputProps.checked && !isDisabled,
    'hover:border-gray-500':
      (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked && !isDisabled,

    'opacity-50 cursor-not-allowed': isDisabled,
  })

  return (
    <label htmlFor={rest.value} className={containerStyle}>
      {variant === 'card' ? (
        <div className="w-full flex flex-col items-start gap-4 p-0">
          <input id={rest.value} {...inputProps} ref={ref} className={inputStyle} />
          <div className="text-default font-normal not-italic leading-8 text-gray-universal-700">
            {rest.children}
          {/*  /!* {tooltip && ( *!/*/}
          {/*  /!*  <div className="mt-8 flex flex-row"> *!/*/}
          {/*  /!*    <HelpIcon *!/*/}
          {/*  /!*      className="cursor-pointer" *!/*/}
          {/*  /!*      onMouseOver={() => setIsTooltipOpened(true)} *!/*/}
          {/*  /!*      onMouseLeave={() => setIsTooltipOpened(false)} *!/*/}
          {/*  /!*    /> *!/*/}
          {/*  /!*  </div> *!/*/}
          {/*  /!* )} *!/*/}
          </div>
        </div>
      ) : (
        <>
          <input id={rest.value} {...inputProps} ref={ref} className={inputStyle} />
          <div className="text-default ml-4 flex font-normal not-italic leading-8 text-form-black-default">
            {rest.children}
            {/* {tooltip && ( */}
            {/*  <div className="ml-4 flex flex-row items-center"> */}
            {/*    <HelpIcon */}
            {/*      className="cursor-pointer" */}
            {/*      onMouseOver={() => setIsTooltipOpened(true)} */}
            {/*      onMouseLeave={() => setIsTooltipOpened(false)} */}
            {/*    /> */}
            {/*  </div> */}
            {/* )} */}
          </div>
        </>
      )}
    </label>
  )
}

export default Radio
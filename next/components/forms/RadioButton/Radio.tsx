import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import * as React from 'react'
import { useRadio } from 'react-aria'

import Tooltip from '../Tooltip'
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

const Radio = ({
  error = false,
  isDisabled = false,
  tooltip,
  variant = 'basic',
  className,
  ...rest
}: RadioBase) => {
  const state = React.useContext(RadioContext)
  const [isTooltipOpened, setIsTooltipOpened] = React.useState<boolean>(false)
  const ref = React.useRef(null)
  const { inputProps } = useRadio({ ...rest, isDisabled }, state, ref)
  const inputStyle = cx(
    'focus-visible:outline-none focus:outline-none appearance-none bg-white m-0 w-6 h-6 grid place-content-center left-0 right-0 top-0 bottom-0 rounded-full border-2 border-solid',
    {
      'border-gray-700': !error,
      'before:w-4 before:h-4 before:bg-gray-700 before:rounded-full': inputProps.checked,
      'border-negative-700 before:bg-negative-700': error,

      // hover
      'group-hover:before:bg-gray-600 group-hover:border-gray-600': !isDisabled && !error,

      // disabled
      'opacity-50 cursor-not-allowed': isDisabled,
    },
  )

  const containerStyle = cx(
    'group flex relative flex-row items-center rounded-lg gap-4 ',
    className,
    {
      'p-0': variant === 'basic' && !error,
      'p-0 py-3 px-4 border-2 border-solid': variant === 'boxed',
      'bg-white': variant !== 'basic',
      'border-gray-200':
        (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked,
      'border-negative-700 rounded-8': (variant === 'card' || variant === 'boxed') && error,
      'flex-col p-6 border-2 border-solid rounded-8': variant === 'card',
      'border-gray-700 hover:border-gray-500':
        (variant === 'boxed' || variant === 'card') && !error && inputProps.checked && !isDisabled,
      'hover:border-gray-500':
        (variant === 'boxed' || variant === 'card') && !error && !inputProps.checked && !isDisabled,

      'opacity-50 cursor-not-allowed': isDisabled,
    },
  )

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
            right={variant === 'basic' ? -13 : 5}
            absolute
          />
        </div>
      )}
      <label htmlFor={rest.value} className={containerStyle}>
        {variant === 'card' ? (
          <div className="w-full flex flex-col items-start gap-4 p-0 ">
            <input id={rest.value} {...inputProps} ref={ref} className={inputStyle} />
            <div className="text-p-md text-gray-700 font-normal not-italic break-all">
              {rest.children}
              {tooltip && (
                <div className="mt-8 flex flex-row">
                  <HelpIcon
                    className="cursor-pointer"
                    onMouseOver={() => setIsTooltipOpened(true)}
                    onMouseLeave={() => setIsTooltipOpened(false)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={cx('flex items-center gap-4 w-full', {})}>
            <input id={rest.value} {...inputProps} ref={ref} className={inputStyle} />
            <div
              className={cx('text-p-md flex font-normal not-italic text-gray-700 break-all', {})}
            >
              {rest.children}
            </div>
            {tooltip && (
              <div className="ml-auto">
                <HelpIcon
                  className="cursor-pointer"
                  onMouseOver={() => setIsTooltipOpened(true)}
                  onMouseLeave={() => setIsTooltipOpened(false)}
                />
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  )
}

export default Radio

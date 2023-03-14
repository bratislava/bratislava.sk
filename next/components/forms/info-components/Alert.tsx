import cx from 'classnames'

import CloseIcon from '../icon-components/CloseIcon'
import ErrorIcon from '../icon-components/ErrorIcon'
import InfoIcon from '../icon-components/InfoIcon'
import SuccessIcon from '../icon-components/SuccessIcon'
import WarningIcon from '../icon-components/WarningIcon'

type AlertButtons = {
  title: string
  handler: () => void
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<AlertButtons>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends AlertButtons[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & {
  [Symbol.iterator]: () => IterableIterator<ArrayItems<T>>
}

type AlertBase = {
  type: 'error' | 'success' | 'info' | 'warning'
  variant?: 'basic' | 'message'
  solid?: boolean
  content?: string
  message: string
  close?: () => void
  buttons?: FixedLengthArray<[AlertButtons, AlertButtons]>
  className?: string
}

const Alert = ({
  solid = false,
  close,
  type,
  variant = 'basic',
  content,
  message,
  className,
  ...rest
}: AlertBase) =>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  {
    const icons = {
      error: <ErrorIcon solid={solid} />,
      success: <SuccessIcon solid={solid} />,
      info: <InfoIcon solid={solid} />,
      warning: <WarningIcon solid={solid} />,
    }

    const alertContainer = cx(
      'flex justify-between max-w-[480px] w-full rounded-lg lg:px-5 px-3',
      className,
      {
        'text-gray-800 flex-col lg:py-4 py-3': variant === 'message',
        'bg-negative-100': type === 'error' && !solid,
        'bg-success-50': type === 'success' && !solid,
        'bg-gray-100': type === 'info' && !solid,
        'bg-warning-50': type === 'warning' && !solid,

        'text-negative-700': type === 'error' && !solid && variant !== 'message',
        'text-success-700': type === 'success' && !solid && variant !== 'message',
        'text-gray-700': type === 'info' && !solid && variant !== 'message',
        'text-warning-700': type === 'warning' && !solid && variant !== 'message',

        'lg:py-4 p-3 items-center gap-3': variant === 'basic',
        'text-gray-0': solid,
        'bg-negative-700': type === 'error' && solid,
        'bg-success-700': type === 'success' && solid,
        'bg-gray-700': type === 'info' && solid,
        'bg-warning-700': type === 'warning' && solid,
      },
    )

    const contentStyle = cx('w-full', {
      'text-16': variant === 'basic',
      'text-16-semibold': variant === 'message',
      'text-gray-0': solid,
      'text-gray-700': !solid,
    })

    const extraButtonStyle = cx('text-16-medium underline underline-offset-4', {
      'text-negative-700': type === 'error' && !solid,
      'text-success-700': type === 'success' && !solid,
      'text-gray-700': type === 'info' && !solid,
      'text-warning-700': type === 'warning' && !solid,
      'text-gray-0': solid,
    })

    return variant === 'basic' ? (
      <div className={alertContainer}>
        <div className="flex items-center gap-[14px]">
          <span className="flex min-w-[22px] justify-center">{icons[type]}</span>
          <div className={contentStyle}>{message}</div>
        </div>
        {close && (
          <span className="flex h-6 w-6 items-center justify-center">
            <CloseIcon onClick={close} solid={solid} type={type} />
          </span>
        )}
      </div>
    ) : (
      <div className={alertContainer}>
        <div className="flex flex-row items-center gap-[14px]">
          <span className="flex min-w-[22px] justify-center">{icons[type]}</span>
          <div className={contentStyle}>{message}</div>
        </div>
        <div
          className={cx('text-p2 mt-2 w-full pl-9 font-normal', {
            'text-gray-0': solid,
            'text-gray-700': !solid,
          })}
        >
          {content}
        </div>
        {rest.buttons ? (
          <div className="lg:mt-5 mt-3 flex w-full gap-5 pl-9">
            <button type="button" className={extraButtonStyle} onClick={rest.buttons[0].handler}>
              {rest.buttons[0].title}
            </button>
            <button type="button" className={extraButtonStyle} onClick={rest.buttons[1].handler}>
              {rest.buttons[1].title}
            </button>
          </div>
        ) : null}
      </div>
    )
  }

export default Alert

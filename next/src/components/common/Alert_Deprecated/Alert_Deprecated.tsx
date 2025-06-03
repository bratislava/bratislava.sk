import cn from '@/src/utils/cn'

import CloseIcon from './CloseIcon'
import ErrorIcon from './ErrorIcon'
import InfoIcon from './InfoIcon'
import SuccessIcon from './SuccessIcon'
import WarningIcon from './WarningIcon'

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
  // eslint-disable-next-line sonarjs/cognitive-complexity
}: AlertBase) => {
  const icons = {
    error: <ErrorIcon solid={solid} />,
    success: <SuccessIcon solid={solid} />,
    info: <InfoIcon solid={solid} />,
    warning: <WarningIcon solid={solid} />,
  }

  const alertContainer = cn(
    'flex w-full max-w-[480px] justify-between rounded-lg px-3 lg:px-5',
    className,
    {
      'flex-col py-3 text-grey-800 lg:py-4': variant === 'message',
      'bg-negative-100': type === 'error' && !solid,
      'bg-success-50': type === 'success' && !solid,
      'bg-grey-100': type === 'info' && !solid,
      'bg-warning-50': type === 'warning' && !solid,

      'text-negative-700': type === 'error' && !solid && variant !== 'message',
      'text-success-700': type === 'success' && !solid && variant !== 'message',
      'text-grey-700': type === 'info' && !solid && variant !== 'message',
      'text-warning-700': type === 'warning' && !solid && variant !== 'message',

      'items-center p-3 lg:py-4': variant === 'basic',
      'text-grey-0': solid,
      'bg-negative-700': type === 'error' && solid,
      'bg-success-700': type === 'success' && solid,
      'bg-grey-700': type === 'info' && solid,
      'bg-warning-700': type === 'warning' && solid,
    },
  )

  const contentStyle = cn('w-full', {
    'text-size-p-default': variant === 'basic',
    'text-size-p-default font-semibold': variant === 'message',
    'text-grey-0': solid,
    'text-grey-700': !solid,
  })

  const extraButtonStyle = cn('text-size-p-default font-medium underline underline-offset-4', {
    'text-negative-700': type === 'error' && !solid,
    'text-success-700': type === 'success' && !solid,
    'text-grey-700': type === 'info' && !solid,
    'text-warning-700': type === 'warning' && !solid,
    'text-grey-0': solid,
  })

  return variant === 'basic' ? (
    <div className={alertContainer}>
      <div className="flex items-center gap-[14px]">
        <span className="flex min-w-[22px] justify-center">{icons[type]}</span>
        <div className={contentStyle}>{message}</div>
      </div>
      {close && (
        <span className="flex size-6 items-center justify-center">
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
        className={cn('mt-2 w-full pl-9 text-size-p-default font-normal', {
          'text-grey-0': solid,
          'text-grey-700': !solid,
        })}
      >
        {content}
      </div>
      {rest.buttons ? (
        <div className="mt-3 flex w-full gap-5 pl-9 lg:mt-5">
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

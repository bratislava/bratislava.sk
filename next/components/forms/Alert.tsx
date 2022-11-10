import cx from 'classnames'

import CloseIcon from './icon-components/CloseIcon'
import ErrorIcon from './icon-components/ErrorIcon'
import InfoIcon from './icon-components/InfoIcon'
import SuccessIcon from './icon-components/SuccessIcon'
import WarningIcon from './icon-components/WarningIcon'

type AlertButtons = {
  title: string
  handler: () => void
}

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<AlertButtons>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends AlertButtons[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

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

const Alert = (
  {
    solid = false,
    close,
    type,
    variant = 'basic',
    content,
    message,
    className,
    ...rest
  }: AlertBase,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const icons = {
    error: <ErrorIcon solid={solid} />,
    success: <SuccessIcon solid={solid} />,
    info: <InfoIcon solid={solid} />,
    warning: <WarningIcon solid={solid} />,
  }

  const alertContainer = cx('flex w-480 rounded-8 px-5', className, {
    'text-gray-800 flex-col py-4': variant === 'message',
    'bg-negative-50': type === 'error' && !solid,
    'bg-success-50': type === 'success' && !solid,
    'bg-gray-100': type === 'info' && !solid,
    'bg-warning-50': type === 'warning' && !solid,

    'text-negative-700': type === 'error' && !solid && variant !== 'message',
    'text-success-700': type === 'success' && !solid && variant !== 'message',
    'text-gray-700': type === 'info' && !solid && variant !== 'message',
    'text-warning-700': type === 'warning' && !solid && variant !== 'message',

    'py-4 gap-3 items-center': variant === 'basic',
    'text-white': solid,
    'bg-negative-700': type === 'error' && solid,
    'bg-success-700': type === 'success' && solid,
    'bg-gray-700': type === 'info' && solid,
    'bg-warning-700': type === 'warning' && solid,
  })

  const contentStyle = cx('w-404', {
    'text-sm font-normal leading-6': variant === 'basic',
    'text-default leading-7 ml-1 font-semibold': variant === 'message',
    'w-368': close,
  })

  const extraButtonStyle = cx('underline font-medium text-base leading-6 not-italic', {
    'text-negative-700': type === 'error' && !solid,
    'text-success-700': type === 'success' && !solid,
    'text-gray-700': type === 'info' && !solid,
    'text-warning-700': type === 'warning' && !solid,
  })

  return variant === 'basic' ? (
    <div className={alertContainer}>
      <span>{icons[type]}</span>
      <div className={contentStyle}>{message}</div>
      {close && <CloseIcon className='ml-1' onClick={close} solid={solid} type={type} />}
    </div>
  ) : (
    <div className={alertContainer}>
      <div className='flex flex-row items-center gap-3'>
        <span>{icons[type]}</span>
        <div className={contentStyle}>{message}</div>
      </div>
      <div className='ml-10 mt-2 w-404 text-base font-normal not-italic leading-6'>{content}</div>
      {rest.buttons ?
        <div className='ml-10 mt-5 flex w-32 gap-5'>
          <button type='button' className={extraButtonStyle} onClick={rest.buttons[0].handler}>{rest.buttons[0].title}</button>
          <button type='button' className={extraButtonStyle} onClick={rest.buttons[1].handler}>{rest.buttons[1].title}</button>
        </div> : null}
    </div>
  )
}

export default Alert

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
type FixedLengthArray<T extends AlertButtons[]> = Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>> & {
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

const Alert = ({ solid = false, close, type, variant = 'basic', content, message, className, ...rest }: AlertBase) =>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  {
    const icons = {
      error: <ErrorIcon solid={solid} />,
      success: <SuccessIcon solid={solid} />,
      info: <InfoIcon solid={solid} />,
      warning: <WarningIcon solid={solid} />,
    }

  const alertContainer = cx('flex w-full sm:w-[480px] rounded-lg px-5', className, {
    'text-form-alert-textColor-default flex-col py-4': variant === 'message',
    'bg-form-alert-error-default-bg': type === 'error' && !solid,
    'bg-form-alert-success-default-bg': type === 'success' && !solid,
    'bg-form-alert-info-default-bg': type === 'info' && !solid,
    'bg-form-alert-warning-default-bg': type === 'warning' && !solid,

      'text-form-alert-error-default': type === 'error' && !solid && variant !== 'message',
      'text-form-alert-success-default': type === 'success' && !solid && variant !== 'message',
      'text-form-alert-info-default': type === 'info' && !solid && variant !== 'message',
      'text-form-alert-warning-default': type === 'warning' && !solid && variant !== 'message',

      'py-4 gap-4 items-center': variant === 'basic',
      'text-gray-universal-0': solid,
      'bg-form-alert-error-default': type === 'error' && solid,
      'bg-form-alert-success-default': type === 'success' && solid,
      'bg-form-alert-info-default': type === 'info' && solid,
      'bg-form-alert-warning-default': type === 'warning' && solid,
    })

    const contentStyle = cx('w-full', {
      'text-16 leading-6': variant === 'basic',
      'text-20-semibold leading-7': variant === 'message',
    })

    const extraButtonStyle = cx('underline text-16-medium leading-6 not-italic', {
      'text-form-alert-error-default': type === 'error' && !solid,
      'text-form-alert-success-default': type === 'success' && !solid,
      'text-form-alert-info-default': type === 'info' && !solid,
      'text-form-alert-warning-default': type === 'warning' && !solid,
    })

  return variant === 'basic' ? (
    <div className={alertContainer}>
      <span>{icons[type]}</span>
      <div className={contentStyle}>{message}</div>
      {close ?
        <div className='w-6 h-6 flex items-center justify-center'>
          <CloseIcon className='' onClick={close} solid={solid} type={type} />
        </div> : null
      }
    </div>
  ) : (
    <div className={alertContainer}>
      <div className='flex flex-row gap-3'>
        <span className='mt-1'>{icons[type]}</span>
        <div className=''>
          <div className={contentStyle}>{message}</div>
          <div className='text-base ml-1 mt-2 md:w-404 font-normal not-italic leading-6'>{content}</div>
          {rest.buttons ?
            <div className='ml-1 mt-5 flex w-32 gap-5'>
              <button type='button' className={extraButtonStyle} onClick={rest.buttons[0].handler}>{rest.buttons[0].title}</button>
              <button type='button' className={extraButtonStyle} onClick={rest.buttons[1].handler}>{rest.buttons[1].title}</button>
            </div> : null}
        </div>
      </div>
    </div>
  )
}

export default Alert

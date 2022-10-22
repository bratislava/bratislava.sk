import cx from 'classnames'
import { MouseEventHandler } from 'react'

import CloseIcon from './icon-components/CloseIcon'
import ErrorIcon from './icon-components/ErrorIcon'
import InfoIcon from './icon-components/InfoIcon'
import SuccessIcon from './icon-components/SuccessIcon'
import WarningIcon from './icon-components/WarningIcon'

type AlertBase = {
  type: 'error' | 'success' | 'info' | 'warning'
  variant?: 'basic' | 'message'
  solid?: boolean
  content?: string
  className?: string
  close?: boolean
  message: string
  onClick?: MouseEventHandler<SVGSVGElement> | undefined
  buttonLabel1?: string
  buttonLabel2?: string
  buttonHandler1?: () => void
  buttonHandler2?: () => void
}

const Alert = (
  {
    solid = false,
    close = false,
    onClick,
    type,
    variant = 'basic',
    content,
    message,
    className,
    buttonLabel1 = '',
    buttonLabel2 = '',
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

  const alertContainer = cx('flex flex-row w-480 rounded-8 px-5', className, {
    'text-form-alert-textColor-default flex-col pt-4 px-5 gap-4': variant === 'message',
    'bg-form-alert-error-default-bg': type === 'error' && !solid,
    'bg-form-alert-success-default-bg': type === 'success' && !solid,
    'bg-form-alert-info-default-bg': type === 'info' && !solid,
    'bg-form-alert-warning-default-bg': type === 'warning' && !solid,

    'text-form-alert-error-default': type === 'error' && !solid && variant !== 'message',
    'text-form-alert-success-default': type === 'success' && !solid && variant !== 'message',
    'text-form-alert-info-default': type === 'info' && !solid && variant !== 'message',
    'text-form-alert-warning-default': type === 'warning' && !solid && variant !== 'message',

    'flex-row py-4 gap-3 place-items-center': variant === 'basic',
    'text-[white]': solid,
    'bg-form-alert-error-default': type === 'error' && solid,
    'bg-form-alert-success-default': type === 'success' && solid,
    'bg-form-alert-info-default': type === 'info' && solid,
    'bg-form-alert-warning-default': type === 'warning' && solid,
  })

  const contentStyle = cx('flex flex-row leading-6 w-404', {
    'text-sm font-normal': variant === 'basic',
    'text-default': variant === 'message',
    'w-368': close,
  })

  const extraButtonStyle = cx('underline font-medium flex items-center font-medium h-6 text-base leading-6 not-italic underline', {
    'text-form-alert-error-default': type === 'error' && !solid,
    'text-form-alert-success-default': type === 'success' && !solid,
    'text-form-alert-info-default': type === 'info' && !solid,
    'text-form-alert-warning-default': type === 'warning' && !solid,
  })
  const extraButtonStyleContainer = cx('', {
    'ml-8 w-32 flex h-6 gap-5 mb-4 mt-3': (rest?.buttonHandler1 && buttonLabel1) || (rest?.buttonHandler2 && buttonLabel2),
  })

  return variant === 'basic' ? (
    <div className={alertContainer}>
      <span>{icons[type]}</span>
      <div className={contentStyle}>{message}</div>
      {close && <CloseIcon onClick={onClick} solid={solid} type={type} />}
    </div>
  ) : (
    <div className={alertContainer}>
      <div className='flex flex-row items-center gap-3'>
        <span>{icons[type]}</span>
        <div className={contentStyle}>{message}</div>
      </div>
      <div
        className='ml-8 w-404 text-base font-normal not-italic leading-6'>{content}</div>
      <div className={extraButtonStyleContainer}>
        {
          rest.buttonHandler1 && buttonLabel1 &&
          <button type='button' className={extraButtonStyle} onClick={rest.buttonHandler1}>{buttonLabel1}</button>
        }
        {
          rest.buttonHandler2 && buttonLabel2 &&
          <button type='button' className={extraButtonStyle} onClick={rest.buttonHandler2}>{buttonLabel2}</button>
        }
      </div>
    </div>
  )
}

export default Alert

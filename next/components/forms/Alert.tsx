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
}

const Alert = ({
  solid = false,
  close = false,
  onClick,
  type,
  variant = 'basic',
  content,
  message,
  className,
}: AlertBase) => {
  const icons = {
    error: <ErrorIcon solid={solid} />,
    success: <SuccessIcon solid={solid} />,
    info: <InfoIcon solid={solid} />,
    warning: <WarningIcon solid={solid} />,
  }

  const alertContainer = cx('flex flex-row w-480 gap-3 rounded-8 py-4 px-5', className, {
    'justify-between': close,
    'place-items-center': variant !== 'message',
    'text-form-alert-textColor-default flex-col': variant === 'message',
    'bg-form-alert-error-default-bg': type === 'error' && !solid,
    'bg-form-alert-success-default-bg': type === 'success' && !solid,
    'bg-form-alert-info-default-bg': type === 'info' && !solid,
    'bg-form-alert-warning-default-bg': type === 'warning' && !solid,

    'text-form-alert-error-default': type === 'error' && !solid && variant !== 'message',
    'text-form-alert-success-default': type === 'success' && !solid && variant !== 'message',
    'text-form-alert-info-default': type === 'info' && !solid && variant !== 'message',
    'text-form-alert-warning-default': type === 'warning' && !solid && variant !== 'message',

    'flex-row': variant === 'basic',
    'text-[white]': solid,
    'bg-form-alert-error-default': type === 'error' && solid,
    'bg-form-alert-success-default': type === 'success' && solid,
    'bg-form-alert-info-default': type === 'info' && solid,
    'bg-form-alert-warning-default': type === 'warning' && solid,
  })

  const contentStyle = cx('flex flex-row leading-6', {
    'text-sm font-normal': variant === 'basic',
    'text-default font-semibold': variant === 'message',
    'w-368': close,
  })
  return variant === 'basic' ? (
    <div className={alertContainer}>
      <span>{icons[type]}</span>
      <div className={contentStyle}>{message}</div>
      {close && <CloseIcon onClick={onClick} solid={solid} type={type} />}
    </div>
  ) : (
    <div className={alertContainer}>
      <div className="flex flex-row items-center gap-3">
        <span>{icons[type]}</span>
        <div className={contentStyle}>{message}</div>
      </div>
      <div className="ml-8 flex w-[calc(100%-45px)] text-justify text-sm font-normal leading-6">{content}</div>
    </div>
  )
}

export default Alert

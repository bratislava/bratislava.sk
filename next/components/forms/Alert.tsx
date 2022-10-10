import * as React from 'react'
import cx from 'classnames'

type AlertBase = {
  type: 'error' | 'success' | 'info' | 'warning'
  variant?: 'basic' | 'message'
  solid?: boolean
  content?: string
  className?: string
  children?: React.ReactElement
  message?: string
}

const Alert = ({ solid = false, type, variant = 'basic', content, children, message, className }: AlertBase) => {

  const icons = {
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C4.48 0 0 4.475 0 10C0 15.525 4.48 20 10 20C15.52 20 20 15.525 20 10C20 4.475 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
          fill={solid ? 'white' : '#D00000'}
        />
      </svg>
    ),
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C4.475 0 0 4.475 0 10C0 15.52 4.475 20 10 20C15.52 20 20 15.52 20 10C20 4.475 15.52 0 10 0ZM8 15L3 10L4.415 8.585L8 12.17L15.585 4.585L17 6L8 15Z"
          fill={solid ? 'white' : '#01843D'}
        />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
          fill={solid ? 'white' : '#333333'}
        />
      </svg>
    ),
    warning: (
      <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z" fill={solid ? 'white' : '#E07B04'} />
      </svg>
    ),
  }

  const alertContainer = cx('flex flex-row w-[440px] items-start gap-3 rounded-8 py-4 px-5', className, {
    'text-[#1F1F1F] flex-col': variant === 'message',
    'bg-form-alert-error-default-bg text-form-alert-error-default': type === 'error' && !solid,
    'bg-form-alert-success-default-bg text-form-alert-success-default': type === 'success' && !solid,
    'bg-form-alert-info-default-bg text-form-alert-info-default': type === 'info' && !solid,
    'bg-form-alert-warning-default-bg text-form-alert-warning-default': type === 'warning' && !solid,

    'flex-row': variant === 'basic',

    'text-[black]': !solid && variant==='message',
    'text-[white]': solid,
    'bg-form-alert-error-default': type === 'error' && solid,
    'bg-form-alert-success-default': type === 'success' && solid,
    'bg-form-alert-info-default': type === 'info' && solid,
    'bg-form-alert-warning-default': type === 'warning' && solid,
  })

  const renderElAlert = () => {
    return React.cloneElement(children)
  }

  const contentStyle = cx('flex flex-row leading-6 font-normal text-sm', {
    'text-sm': variant === 'basic',
    'text-default': variant === 'message',
  })
  return (
    <>
      {variant === 'basic' ? (
        <div className={alertContainer}>
          <span>{icons[type]}</span>
          <div className={contentStyle}>{children ? renderElAlert() : message}</div>
        </div>
      ) : (
        <div className={alertContainer}>
          <div className="flex flex-row gap-3 items-center">
            <span>{icons[type]}</span>
            <div className={contentStyle}>{children ? renderElAlert() : message}</div>
          </div>
          <div className="flex w-[calc(100%-30px)] font-normal text-sm leading-6 ml-7 text-justify">{content}</div>
        </div>
      )}
    </>
  )
}

export default Alert

import cx from 'classnames'
import React from 'react'

import Button from './Button'
import CloseIcon from './icon-components/CloseIcon'
import ErrorIcon from './icon-components/ErrorIcon'
import InfoIcon from './icon-components/InfoIcon'
import SuccessIcon from './icon-components/SuccessIcon'
import WarningIcon from './icon-components/WarningIcon'

type MessageModalBase = {
  type: 'warning' | 'info' | 'error' | 'success'
  children: React.ReactNode
  show: boolean
  title: string
  submitHandler: () => void
  cancelHandler: () => void
  confirmLabel: string
  className?: string
}

const icons = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  success: <SuccessIcon />,
}

const MessageModal = ({
  type,
  children,
  title,
  submitHandler,
  cancelHandler,
  confirmLabel,
  show,
  className,
}: MessageModalBase) => {
  if (!show) {
    return null
  }
  return (
    <div className="fixed inset-1 z-10 flex items-center justify-center" onClick={cancelHandler}>
      <div className={cx('flex flex-col items-end rounded-lg bg-white p-3', className)}>
        <div className="absolute flex h-6 w-6 items-center justify-center">
          <CloseIcon onClick={cancelHandler} type="info" />
        </div>
        <div className="p-3">
          <div className="flex flex-row items-start gap-6 p-0">
            <div
              className={cx('flex relative flex-row items-start gap-2 rounded-full p-4', {
                'bg-gray-100': type === 'info',
                'bg-warning-100': type === 'warning',
                'bg-negative-100': type === 'error',
                'bg-success-100': type === 'success',
              })}
            >
              <div className="flex h-6 w-6 items-center justify-center">
                <span className="">{icons[type]}</span>
              </div>
            </div>
            <div className="flex flex-col items-end w-full gap-6 p-0">
              <div className="flex flex-col items-start p-0">
                <div className="flex h-14 items-center text-h-base font-semibold not-italic">
                  {title}
                </div>
                <div className="text-base font-normal not-italic leading-6">{children}</div>
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-row items-center gap-6 p-0 justify-end mt-6">
            <div
              className="text-base flex cursor-pointer flex-row items-center justify-center gap-2 py-1 px-2 font-semibold not-italic leading-6"
              onClick={cancelHandler}
            >
              Zrušiť
            </div>
            <Button
              onPress={submitHandler}
              variant={type === 'error' ? 'negative' : 'black'}
              text={confirmLabel}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal

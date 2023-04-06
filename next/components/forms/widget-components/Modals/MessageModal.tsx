import cx from 'classnames'
import React from 'react'

import CloseIcon from '../../icon-components/CloseIcon'
import ErrorIcon from '../../icon-components/ErrorIcon'
import InfoIcon from '../../icon-components/InfoIcon'
import SuccessIcon from '../../icon-components/SuccessIcon'
import WarningIcon from '../../icon-components/WarningIcon'
import Button from '../../simple-components/Button'

type MessageModalBase = {
  type: 'warning' | 'info' | 'error' | 'success'
  children: React.ReactNode
  show: boolean
  title: string
  submitHandler: () => void
  cancelHandler: () => void
  confirmLabel?: string
  cancelLabel?: string
  className?: string
  excludeButtons?: boolean
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
  cancelLabel,
  className,
  excludeButtons,
}: MessageModalBase) => {
  // useEffect(() => {
  //   document.body.style.overflow = show ? 'hidden' : 'visible'
  // }, [show])

  if (!show) {
    return null
  }
  return (
    <div
      className="fixed top-0 z-50 flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(var(--color-gray-800), .4)', marginTop: '0' }}
      onClick={cancelHandler}
    >
      <div className={cx('flex flex-col items-end rounded-lg bg-white p-3', className)}>
        <div className="absolute flex h-6 w-6 items-center justify-center">
          <CloseIcon onClick={cancelHandler} type="info" />
        </div>
        <div className="p-3">
          <div className="flex flex-row items-start gap-6 p-0">
            <div
              className={cx('relative flex flex-row items-start gap-2 rounded-full p-4', {
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
            <div className="flex w-full flex-col items-end gap-6 p-0">
              <div className="flex flex-col items-start p-0">
                <div className="flex h-14 items-center text-h-base font-semibold">{title}</div>
                <div className="text-p2">{children}</div>
              </div>
            </div>
          </div>
          {!excludeButtons && (
            <div className="order-1 mt-6 flex flex-row items-center justify-end gap-6 p-0">
              <div
                className="text-p2 flex cursor-pointer flex-row items-center justify-center gap-2 px-2 py-1 font-semibold not-italic"
                onClick={cancelHandler}
              >
                {cancelLabel}
              </div>
              <Button
                onPress={submitHandler}
                variant={type === 'error' ? 'negative' : 'black'}
                size="sm"
              >
                {confirmLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageModal

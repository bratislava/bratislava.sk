import cx from 'classnames'
import { useEffect, useState } from 'react'

import Alert from './Alert'

type SnackbarProps = {
  message: string
  type: 'error' | 'success' | 'info' | 'warning'
  duration?: number
  solid?: boolean
  icon?: boolean
  className?: string
  onClose?: () => void
}
const Snackbar = ({
  message,
  type,
  duration = 4000,
  icon = true,
  solid = false,
  onClose,
  className,
}: SnackbarProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timeout = setTimeout(() => {
      setShow(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timeout)
  }, [duration, onClose])

  return (
    <div
      className={cx(
        'fixed inset-x-0 flex items-center justify-center z-50 bottom-4 left-4 right-4',
        {
          'opacity-100': show,
          'opacity-0': !show,
        },
      )}
    >
      <Alert message={message} type={type} icon={icon} solid={solid} className="sm:w-max w-full" />
    </div>
  )
}

export default Snackbar

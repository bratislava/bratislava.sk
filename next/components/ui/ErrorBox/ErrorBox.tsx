import cx from 'classnames'

export interface ErrorBoxProps {
  className?: string
  error?: Error | string
}

export const ErrorBox = ({ className, error }: ErrorBoxProps) => {
  if (!error) return null

  const message = typeof error === 'string' ? error : error.message
  return (
    <div className={cx(className, 'py-4 px-6 bg-white border border-l-8 border-error rounded-r-lg')}>
      <p className="text-sm text-error">{message}</p>
    </div>
  )
}

export default ErrorBox

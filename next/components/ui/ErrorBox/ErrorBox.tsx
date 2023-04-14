import cx from 'classnames'

export interface ErrorBoxProps {
  className?: string
  error?: Error | string
}

export const ErrorBox = ({ className, error }: ErrorBoxProps) => {
  if (!error) return null

  const message = typeof error === 'string' ? error : error.message
  return (
    <div
      className={cx(className, 'rounded-r-lg border border-l-8 border-error bg-white px-6 py-4')}
    >
      <p className="text-default text-error">{message}</p>
    </div>
  )
}

export default ErrorBox

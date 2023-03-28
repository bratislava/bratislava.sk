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
      className={cx(className, 'rounded-r-lg border border-l-8 border-error bg-white py-4 px-6')}
    >
      <p className="text-p2 text-error">{message}</p>
    </div>
  )
}

export default ErrorBox

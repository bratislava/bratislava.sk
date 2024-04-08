import { twMerge } from 'tailwind-merge'

export type ErrorBoxProps = {
  className?: string
  error?: Error | string
}

const ErrorBox = ({ className, error }: ErrorBoxProps) => {
  if (!error) return null

  const message = typeof error === 'string' ? error : error.message
  return (
    <div
      className={twMerge(
        'rounded-r-lg border border-l-8 border-error bg-white px-6 py-4',
        className,
      )}
    >
      <p className="text-default text-error">{message}</p>
    </div>
  )
}

export default ErrorBox

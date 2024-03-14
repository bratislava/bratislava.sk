import cx from 'classnames'
import { twMerge } from 'tailwind-merge'

type SpinnerBase = {
  size?: 'lg' | 'md' | 'sm'
  className?: string
}

const Spinner = ({ size = 'md', className }: SpinnerBase) => {
  const style = cx('animate-spin rounded-[50%] border-solid border-gray-700 border-t-gray-300', {
    'w-5 h-5 border-2 border-t-2': size === 'sm',
    'w-8 h-8 border-3 border-t-3': size === 'md',
    'w-12 h-12 border-4 border-t-4': size === 'lg',
  })
  return (
    <div
      className={twMerge(
        cx({
          'h-6 w-6 p-0.5': size === 'sm',
          'h-10 w-10 p-1': size === 'md',
          'h-16 w-16 p-2': size === 'lg',
        }),
        className,
      )}
    >
      <div className={style} />
    </div>
  )
}

export default Spinner

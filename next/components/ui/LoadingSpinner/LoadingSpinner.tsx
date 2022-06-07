import cx from 'classnames'

interface IProps {
  className?: string
  text?: string
  size?: 'small' | 'default' | 'medium'
}

export const LoadingSpinner = ({ className, size = 'default', text }: IProps) => (
  <div className={cx('flex flex-col gap-20 items-center text-center', className)}>
    <div
      style={{
        borderTopColor: 'currentColor',
      }}
      className={cx('box-border border-transparent border-solid rounded-full animate-spin', {
        'w-8 h-8 border-2': size === 'small',
        'w-20 h-20 border-4': size === 'medium',
        'w-40 h-40 border-8': size === 'default',
      })}
    />
    {text && <p className="text-primary text-lg font-medium w-52">{text}</p>}
  </div>
)

export default LoadingSpinner

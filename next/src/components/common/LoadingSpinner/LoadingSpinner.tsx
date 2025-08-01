import cn from '@/src/utils/cn'

type LoadingSpinnerProps = {
  className?: string
  text?: string
  size?: 'small' | 'default' | 'medium'
}

const LoadingSpinner = ({ className, size = 'default', text }: LoadingSpinnerProps) => (
  <div className={cn('flex flex-col items-center gap-20 text-center', className)}>
    <div
      style={{
        borderTopColor: 'currentColor',
      }}
      className={cn('box-border animate-spin rounded-full border-solid border-transparent', {
        'h-8 w-8 border': size === 'small',
        'h-20 w-20 border-4': size === 'medium',
        'h-40 w-40 border-8': size === 'default',
      })}
    />

    {text && <p className="w-52 text-h3 font-medium text-category-600">{text}</p>}
  </div>
)

export default LoadingSpinner

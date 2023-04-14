// @ts-strict-ignore
import cx from 'classnames'

interface IProps {
  className?: string
  titleLeft: string
  titleRight: string
  value: boolean
  variant?: 'primary' | 'secondary' | 'gray' | 'transparent'
  onValueChange: (boolean) => void
}

export const SwitchToggle = ({
  className,
  titleLeft,
  titleRight,
  value = false,
  variant = 'transparent',
  onValueChange,
}: IProps) => {
  return (
    <div className={cx(className, 'flex h-full w-full flex-col items-center justify-center')}>
      <div className="flex items-center justify-center">
        <span
          onClick={() => {
            onValueChange(false)
          }}
          className="text-default cursor-pointer font-medium text-font"
        >
          {titleLeft}
        </span>
        <button
          className={cx('mx-3 flex h-5 w-10  items-center rounded-full px-0.5', {
            'justify-end': value,
            'border border-category-600 bg-white': variant === 'transparent',
            'bg-gray-700/75': variant === 'gray' || (variant === 'primary' && !value),
            'bg-category-200': variant === 'secondary' && value,
            'bg-category-600': variant === 'primary' && value,
          })}
          onClick={() => {
            onValueChange(!value)
          }}
        >
          <div
            className={cx('h-3.5 w-3.5 rounded-full shadow-md', {
              'bg-category-600': variant === 'transparent',
              'bg-white': variant === 'primary' || variant === 'secondary' || variant === 'gray',
            })}
          />
        </button>
        <span
          onClick={() => {
            onValueChange(true)
          }}
          className="text-default cursor-pointer text-font"
        >
          {titleRight}
        </span>
      </div>
    </div>
  )
}

export default SwitchToggle

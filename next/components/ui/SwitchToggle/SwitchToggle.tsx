/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'

type TValue = 'left' | 'right'

interface IProps {
  className?: string
  titleLeft: string
  titleRight: string
  value: TValue
  variant?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'transparent'
  onValueChange: (value: TValue) => void
}

export const SwitchToggle = ({ className, titleLeft, titleRight, value = 'left', variant = "transparent", onValueChange }: IProps) => {
  return (
    <div className={cx(className, 'w-full h-full flex flex-col justify-center items-center')}>
      <div className="flex items-center justify-center">
        <span
          onClick={() => {
            onValueChange('left')
          }}
          className="cursor-pointer text-base font-medium text-font"
        >
          {titleLeft}
        </span>
        <button
          className={cx('w-10 h-5 flex items-center  rounded-full mx-3 px-0.5', {
            'justify-end': value === 'right',
            'border border-primary bg-white': variant === 'transparent',
            'bg-gray': variant === 'gray',
            'bg-secondary': variant === 'secondary',
            'bg-primaryDark': variant === 'primary' && value === 'right',
            'bg-transprentGray': variant === 'primary' && value === 'left',
          })}
          onClick={() => {
            onValueChange(value === 'left' ? 'right' : 'left')
          }}
        >
          <div className={cx('w-3.5 h-3.5 rounded-full shadow-md',{
            'bg-primary': variant === 'transparent',
            'bg-white': variant === 'primary' ||  variant === 'secondary' || variant === 'gray',
          })} />
        </button>
        <span
          onClick={() => {
            onValueChange('right')
          }}
          className="cursor-pointer text-base font-medium text-font"
        >
          {titleRight}
        </span>
      </div>
    </div>
  )
}

export default SwitchToggle

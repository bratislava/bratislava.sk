/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'


interface IProps {
  className?: string
  titleLeft: string
  titleRight: string
  value: boolean
  variant?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'transparent'
  onValueChange: (boolean) => void;
}

export const SwitchToggle = ({ className, titleLeft, titleRight, value = false, variant = "transparent", onValueChange }: IProps) => {
  return (
    <div className={cx(className, 'w-full h-full flex flex-col justify-center items-center')}>
      <div className="flex justify-center items-center">
        <span
          onClick={() => {
            onValueChange(false)
          }}
          className="text-base font-medium text-font cursor-pointer"
        >
          {titleLeft}
        </span>
        <button
          className={cx('w-10 h-5 flex items-center  rounded-full mx-3 px-0.5', {
            'justify-end': value,
            'border border-primary bg-white': variant === 'transparent',
            'bg-gray-dark': variant === 'gray' || variant === 'primary' && !value,
            'bg-secondary': variant === 'secondary' && value,
            'bg-primary': variant === 'primary' && value,
          })}
          onClick={() => {
            onValueChange(!value);
          }}
        >
          <div className={cx('w-3.5 h-3.5 rounded-full shadow-md',{
            'bg-primary': variant === 'transparent',
            'bg-white': variant === 'primary' ||  variant === 'secondary' || variant === 'gray',
          })} />
        </button>
        <span
          onClick={() => {
            onValueChange(true)
          }}
          className="text-base font-medium text-font cursor-pointer"
        >
          {titleRight}
        </span>
      </div>
    </div>
  )
}

export default SwitchToggle

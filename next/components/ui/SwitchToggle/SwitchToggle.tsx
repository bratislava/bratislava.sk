/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames'

type TValue = 'left' | 'right'

interface IProps {
  className?: string
  titleLeft: string
  titleRight: string
  value: TValue
  onValueChange: (value: TValue) => void
}

export const SwitchToggle = ({ className, titleLeft, titleRight, value = 'left', onValueChange }: IProps) => {
  return (
    <div className={cx(className, 'w-full h-full flex flex-col justify-center items-center')}>
      <div className="flex justify-center items-center">
        <span
          onClick={() => {
            onValueChange('left')
          }}
          className="text-base font-medium text-font cursor-pointer"
        >
          {titleLeft}
        </span>
        <button
          className={cx('w-10 bg-white h-5 flex items-center border border-primary rounded-full mx-3 px-0.5', {
            'justify-end': value === 'right',
          })}
          onClick={() => {
            onValueChange(value === 'left' ? 'right' : 'left')
          }}
        >
          <div className={cx('w-3.5 h-3.5 bg-primary rounded-full shadow-md')} />
        </button>
        <span
          onClick={() => {
            onValueChange('right')
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

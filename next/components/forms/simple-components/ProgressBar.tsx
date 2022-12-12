import cx from 'classnames'
import { useProgressBar } from 'react-aria'

type ProgressBarBase = {
  type?: 'success' | 'default'
  label: string
  value: number
  minValue?: number
  maxValue?: number
  className?: string
}

const ProgressBar = ({
  type = 'default',
  label,
  value = 0,
  minValue = 0,
  maxValue = 100,
  className,
}: ProgressBarBase) => {
  const { progressBarProps, labelProps } = useProgressBar({
    value,
    minValue,
    maxValue,
    label,
  })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`

  const progressBarStyleContainer = cx(
    'flex flex-row items-center p-0 gap-4 w-full h-6',
    className,
    {},
  )
  return (
    <div className="flex flex-col w-full">
      {label && <span {...labelProps}>{label}</span>}
      <div {...progressBarProps} className={progressBarStyleContainer}>
        <div className={cx('flex-column flex items-center w-full h-2 bg-gray-200 rounded-full')}>
          <div
            style={{ width: barWidth }}
            className={cx('rounded-full h-2', {
              'bg-gray-700': type === 'default',
              'bg-success-700': type === 'success',
            })}
          />
        </div>
        <div className={cx('text-p-base not-italic')}>{value}%</div>
      </div>
    </div>
  )
}

export default ProgressBar

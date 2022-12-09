import cx from 'classnames'
import { useProgressBar } from 'react-aria'
import { v4 as uuidv4 } from 'uuid'

type ProgressBarBase = {
  type?: 'success' | 'default'
  value: number
  minValue?: number
  maxValue?: number
  className?: string
}

const ProgressBar = ({
  type = 'default',
  value = 0,
  minValue = 0,
  maxValue = 100,
  className,
}: ProgressBarBase) => {
  const { progressBarProps } = useProgressBar({ value, minValue, maxValue, label: uuidv4() })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`

  const progressBarStyleContainer = cx(
    'flex flex-row items-center p-0 gap-4 w-full h-6',
    className,
    {},
  )
  return (
    <div {...progressBarProps} className={progressBarStyleContainer}>
      <div className={cx('flex flex-column items-center w-full h-2 bg-gray-200 rounded-full')}>
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
  )
}

export default ProgressBar

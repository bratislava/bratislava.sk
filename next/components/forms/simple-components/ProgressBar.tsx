import cx from 'classnames'
import { useProgressBar } from 'react-aria'
import { v4 as uuidv4 } from 'uuid'

type ProgressBarBase = {
  type?: 'success' | 'default'
  label?: string
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
    label: label ?? uuidv4(),
  })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`

  const progressBarStyleContainer = cx(
    'flex h-6 w-full flex-row items-center gap-4 p-0',
    className,
    {},
  )
  return (
    <div className="flex w-full flex-col">
      {label && <span {...labelProps}>{label}</span>}
      <div {...progressBarProps} className={progressBarStyleContainer}>
        <div className={cx('flex-column flex h-2 w-full items-center rounded-full bg-gray-200')}>
          <div
            style={{ width: barWidth }}
            className={cx('h-2 rounded-full', {
              'bg-gray-700': type === 'default',
              'bg-success-700': type === 'success',
            })}
          />
        </div>
        <div className={cx('text-p2')}>{value}%</div>
      </div>
    </div>
  )
}

export default ProgressBar

import cx from 'classnames'
import {useProgressBar} from 'react-aria'

type ProgressBarBase = {
  type?: 'success' | 'default'
  value: number
  minValue?: number
  maxValue?: number
  className?: string
}

const ProgressBar = ({ type = 'default', value = 0, minValue = 0, maxValue = 100, className }:ProgressBarBase) => {
  const {
    progressBarProps
  } = useProgressBar({value,minValue,maxValue});

  const percentage = (value - minValue) / (maxValue - minValue);
  const barWidth = `${Math.round(percentage * 100)}%`;

  const progressBarStyleContainer = cx('flex flex-row items-center p-0 gap-4 w-full max-w-[500px] h-6', className, {
  })
  return (
    <div {...progressBarProps} className={progressBarStyleContainer}>
      <div className={cx('flex flex-column items-center w-full max-w-[440px] h-2 bg-form-input-default rounded-full')}>
        <div style={{ width: barWidth, height: 10 }} className={cx('rounded-full',{
          'bg-form-black-default': type === 'default',
          'bg-form-alert-success-default': type === 'success'
        })} />
      </div>
      <div className={cx('font-normal text-base leading-6 not-italic')}>{value}%</div>
    </div>
  )
}

export default ProgressBar
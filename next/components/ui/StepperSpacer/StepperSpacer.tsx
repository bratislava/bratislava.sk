import cx from 'classnames'

interface IProps {
  active?: boolean
}

export const StepperSpacer = ({ active }: IProps) => (
  <div className="flex-1 px-2">
    <div
      className={cx('border-b-2 w-20 md:w-32', {
        'border-category-600': active,
        'border-stepper-divider': !active,
      })}
    />
  </div>
)

export default StepperSpacer

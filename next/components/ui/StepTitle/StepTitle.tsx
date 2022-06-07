import { StepperStep } from '../StepperStep/StepperStep'
import cx from 'classnames'

export interface StepTitleProps {
  className?: string
  number?: number
  title: string
}

export const StepTitle = ({ className, number, title }: StepTitleProps) => {
  return (
    <div className={cx('flex items-center', className)}>
      {number !== undefined && (
        <div className="col-3 md:col-1">
          <StepperStep className="h-12.5 w-12.5" number={number} active />
        </div>
      )}
      <p
        className={cx('col-8 md:col-6 text-md md:text-lg text-font font-medium', {
          'pt-1 pb-1': number !== undefined,
        })}
      >
        {title}
      </p>
    </div>
  )
}

export default StepTitle

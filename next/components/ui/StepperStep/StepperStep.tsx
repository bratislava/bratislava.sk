import cx from 'classnames'

import CheckMark from '../../../assets/images/check-mark.svg'

export interface IStepperStepProps {
  className?: string
  title?: string
  number: number
  onClick?: () => void
  active?: boolean
  checked?: boolean
}

export const StepperStep = ({
  title,
  number,
  onClick,
  active,
  checked,
  className,
}: IStepperStepProps) => (
  <button
    className={cx(
      'text-h3 relative flex items-center justify-center rounded-full',
      {
        'bg-category-600 text-white': active,
        'bg-category-200 text-category-600': !active,
        'cursor-default': !onClick,
        'cursor-pointer': !!onClick,
      },
      className,
    )}
    onClick={onClick}
  >
    {checked ? <CheckMark className="w-10" /> : number}
    {title && (
      <p
        className={cx(
          'text-p2 absolute top-full left-1/2 -translate-x-1/2 transform whitespace-pre pt-3 text-center text-category-600',
          { 'cursor-pointer': !!onClick },
        )}
      >
        {title}
      </p>
    )}
  </button>
)

export default StepperStep

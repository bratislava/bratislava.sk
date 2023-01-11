import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import cx from 'classnames'

interface StepperViewRowProps {
  title: string
  order: number
  isCurrent?: boolean
  isFilled?: boolean
  isLast?: boolean
}

const StepperViewRow = ({ title, order, isCurrent, isFilled }: StepperViewRowProps) => {
  const iconClassName = cx(
    'flew-row w-8 h-8 rounded-full flex justify-center items-center border-2',
    {
      'border-gray-700 text-white': isFilled || isCurrent,
      'bg-gray-700': isCurrent,
      'border-gray-300 text-gray-300 bg-transparent': !isFilled && !isCurrent,
    },
  )

  return (
    <div className="p-2 flex flex-row gap-3 items-center">
      <div className={iconClassName}>
        {isCurrent || !isFilled ? (
          order
        ) : (
          <FilledSelectedIcon style={{ transform: 'scale(1.5)' }} />
        )}
      </div>
      <p className="text-p3-medium">{title}</p>
    </div>
  )
}

export default StepperViewRow

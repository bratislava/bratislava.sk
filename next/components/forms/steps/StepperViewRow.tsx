import FilledSelectedIcon from '@assets/images/forms/circle-filled-selected.svg'
import cx from 'classnames'

interface StepperViewRowProps {
  title: string
  order: number
  isCurrent?: boolean
  isFilled?: boolean
  isLast?: boolean
}

const StepperViewRow = ({ title, order, isCurrent, isFilled, isLast }: StepperViewRowProps) => {
  const iconClassName = cx(
    'flew-row w-8 h-8 rounded-full flex justify-center items-center border-2',
    {
      'border-gray-700 text-white': isFilled || isCurrent,
      'bg-gray-700': isCurrent,
      'border-gray-300 text-gray-300 bg-transparent': !isFilled && !isCurrent,
    },
  )

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3 items-center">
        <div className={iconClassName}>
          {isCurrent || !isFilled ? order : <FilledSelectedIcon className="scale-150" />}
        </div>
        <p className="text-p3-medium">{title}</p>
      </div>
      {!isLast && (
        <div className="w-8 h-8 flex flex-row justify-center items-center">
          <div className="w-0.5 h-4 bg-gray-300 py-2" />
        </div>
      )}
    </div>
  )
}

export default StepperViewRow

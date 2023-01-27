import SelectedIcon from '@assets/images/forms/selected.svg'
import cx from 'classnames'

interface StepperViewRowProps {
  title: string
  order: number
  isCurrent?: boolean
  isFilled?: boolean
  isLast?: boolean
  onClick: () => void
}

const StepperViewRow = (props: StepperViewRowProps) => {
  const { title, order, isCurrent, isFilled, isLast, onClick } = props

  const iconClassName = cx(
    'flew-row w-8 h-8 rounded-full flex justify-center items-center border-2',
    {
      'bg-gray-700 border-gray-700 text-white': isFilled || isCurrent,
      'border-gray-300 text-gray-300 bg-transparent': !isFilled && !isCurrent,
    },
  )

  return (
    <div className="flex flex-col select-none">
      <div className="flex flex-row gap-3 items-center cursor-pointer" onClick={onClick}>
        <div className={iconClassName}>
          {isCurrent || !isFilled ? order : <SelectedIcon className="scale-125" />}
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

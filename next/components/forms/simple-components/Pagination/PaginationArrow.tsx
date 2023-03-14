import ChevronRight from '@assets/images/chevron-right.svg'
import ArrowRight from '@assets/images/forms/arrow-right.svg'
import cx from 'classnames'

type PaginationArrowBase = {
  orientation?: 'left' | 'right'
  onPress?: () => void
}

const PaginationArrow = ({ onPress, orientation = 'right' }: PaginationArrowBase) => {
  return (
    <div
      className={cx('group cursor-pointer w-6 h-6 text-gray-700', {
        'ml-0 md:ml-3': orientation === 'right',
        'mr-0 md:mr-3': orientation === 'left',
      })}
    >
      <span className="group-hover:hidden flex justify-center items-center h-full">
        <ChevronRight className={cx({ 'rotate-180': orientation === 'left' })} />
      </span>
      <span className="hidden group-hover:flex justify-center items-center text-gray-700">
        <ArrowRight onClick={onPress} className={cx({ 'rotate-180': orientation === 'left' })} />
      </span>
    </div>
  )
}

export default PaginationArrow

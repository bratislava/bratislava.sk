import cx from 'classnames'

type PaginationButtonBase = {
  variant?: 'category' | 'black'
  pageNumber?: number
  onPress?: () => void
  isActive?: boolean
}

const PaginationButton = ({
  variant = 'black',
  pageNumber,
  onPress,
  isActive,
}: PaginationButtonBase) => {
  return (
    <button
      type="button"
      onClick={onPress}
      className={cx('flex justify-center items-center w-12 h-12 rounded-full', {
        'border-2 text-gray-700 hover:border-gray-700': variant === 'black',
        'border-2 text-gray-700 hover:border-category-600': variant === 'category',
        'bg-gray-700 text-white border-2 border-gray-700': variant === 'black' && isActive,
        'bg-category-600 text-white border-category-600': variant === 'category' && isActive,
      })}
    >
      <span className="text-p2-semibold">{pageNumber}</span>
    </button>
  )
}
export default PaginationButton

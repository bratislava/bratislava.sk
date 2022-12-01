import cx from 'classnames'

export interface TimeCardMobileProps {
  className?: string
  primaryContent: React.ReactNode
  secondaryContent: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  tabIndex: number
}

export const TimeCardMobile = ({
  className,
  primaryContent,
  secondaryContent,
  onClick,
  isActive,
  tabIndex,
}: TimeCardMobileProps) => {
  return (
    <div
      className={cx('w-full text-center rounded-lg text-font font-medium relative bg-white mb-3', className, {
        'cursor-pointer': !!onClick,
      })}
      onClick={onClick}
      onKeyPress={onClick}
      role="checkbox"
      aria-checked={isActive} // TODO: accessibility
      tabIndex={tabIndex}
    >
      <div className="w-full">
        {/* Circle Icon */}
        <div
          className={cx(
            'absolute sm:hidden w-6 h-6 left-7 top-3 rounded-full transform -translate-x-1/2 border-2 border-category-600 bg-white'
          )}
        />
        {isActive && (
          <div className="absolute left-7 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-category-600 sm:hidden" />
        )}
      </div>
      {/* Mobile Design */}
      <div className="flex w-full items-center rounded-lg text-center text-p2 shadow-md sm:hidden">
        <p className="w-3/5 py-3 pl-9">{primaryContent}</p>
        <p className="w-2/5 rounded-r-lg bg-category-200 py-3">{secondaryContent}</p>
      </div>
    </div>
  )
}

export default TimeCardMobile

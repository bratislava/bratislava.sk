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
      className={cx(
        'relative mb-3 w-full rounded-lg bg-white text-center font-medium text-font',
        className,
        {
          'cursor-pointer': !!onClick,
        },
      )}
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
            'absolute left-7 top-3 h-6 w-6 -translate-x-1/2 transform rounded-full border-2 border-category-600 bg-white sm:hidden',
          )}
        />
        {isActive && (
          <div className="absolute left-7 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-category-600 sm:hidden" />
        )}
      </div>
      {/* Mobile Design */}
      <div className="text-p2 flex w-full items-center rounded-lg text-center shadow-md sm:hidden">
        <p className="w-3/5 py-3 pl-9">{primaryContent}</p>
        <p className="w-2/5 rounded-r-lg bg-category-200 py-3">{secondaryContent}</p>
      </div>
    </div>
  )
}

export default TimeCardMobile

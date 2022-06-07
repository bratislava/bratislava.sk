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
      className={cx('w-full text-center rounded-lg text-font font-medium relative bg-input-nav-bg mb-3', className, {
        'cursor-pointer': !!onClick,
      })}
      onClick={onClick}
      onKeyPress={onClick}
      role="checkbox"
      aria-checked={isActive} //TODO: accessibility
      tabIndex={tabIndex}
    >
      <div className="w-full">
        {/* Circle Icon */}
        <div
          className={cx(
            'absolute sm:hidden w-6 h-6 left-7 top-3 rounded-full transform -translate-x-1/2 border-2 border-primary bg-input-nav-bg'
          )}
        />
        {isActive && (
          <div className="absolute sm:hidden w-3 h-3 left-7 top-4.5 rounded-full bg-primary transform -translate-x-1/2" />
        )}
      </div>
      {/* Mobile Design */}
      <div className="flex sm:hidden w-full items-center shadow-md rounded-lg text-center text-sm">
        <p className="w-3/5 pl-9 py-3">{primaryContent}</p>
        <p className="w-2/5 py-3 bg-secondary rounded-r-lg">{secondaryContent}</p>
      </div>
    </div>
  )
}

export default TimeCardMobile

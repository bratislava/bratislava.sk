import cx from 'classnames'

interface TabBarTabProps {
  tabTitle?: string
  className?: string
  onClick?: () => void
  isActive?: boolean
  handleSelect?: (arg0: string) => void
  size?: 'small' | 'normal'
}

export const TabBarTab = ({
  className,
  tabTitle,
  onClick,
  isActive,
  size = 'normal',
  handleSelect,
}: TabBarTabProps) => {
  if (!tabTitle) {
    return null
  }

  return (
    <button
      type="button"
      className={cx(className, 'relative py-2 whitespace-nowrap lg:whitespace-normal', {
        'text-font font-normal': !isActive,
        'font-semibold': isActive,
        'text-h4': size === 'normal',
        'text-p2': size === 'small',
      })}
      onClick={handleSelect ? () => handleSelect(tabTitle) : onClick}
    >
      {tabTitle}
      {isActive && <div className="absolute bottom-0 left-1/2 w-10/12 -translate-x-1/2 border-b-2 border-category-600" />}
    </button>
  )
}

export default TabBarTab

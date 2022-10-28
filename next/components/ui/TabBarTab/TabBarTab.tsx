import cx from 'classnames'

export interface ITabBarTab {
  key: string
  title: string
}

interface TabBarTabProps {
  tab: ITabBarTab
  className?: string
  onClick?: () => void
  isActive?: boolean
  handleSelect?: (arg0: string) => void
  size?:
    | 'small'
    | 'normal'
}

export const TabBarTab = ({ className, tab, onClick, isActive, size = 'normal', handleSelect }: TabBarTabProps) => {
  return (
    <button
      className={cx(className, 'relative py-2 whitespace-nowrap lg:whitespace-normal', {
        'text-font font-normal': !isActive,
        'font-semibold': isActive,
        'text-h4': size === 'normal',
        'text-p2': size === 'small',
      })}
      onClick={handleSelect ? () => handleSelect(tab.title) : onClick}
    >
      {tab.title}
      {isActive && <div className="absolute bottom-0 left-1/2 w-10/12 -translate-x-1/2 border-b-2 border-primary" />}
    </button>
  )
}

export default TabBarTab

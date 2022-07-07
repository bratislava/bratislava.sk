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
}

export const TabBarTab = ({ className, tab, onClick, isActive, handleSelect }: TabBarTabProps) => {
  return (
    <button
      className={cx(className, 'relative py-2 whitespace-nowrap', {
        'text-font': !isActive,
        'font-semibold': isActive,
      })}
      onClick={handleSelect ? () => handleSelect(tab.title) : onClick}
    >
      {tab.title}
      {isActive && (
        <div className="absolute w-10/12 bottom-0 left-1/2 transform -translate-x-1/2 border-primary border-b-2"></div>
      )}
    </button>
  )
}

export default TabBarTab

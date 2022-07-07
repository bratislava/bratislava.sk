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
      className={cx(className, 'relative text-default lg:text-md py-2 whitespace-nowrap', {
        'text-font': !isActive,
        'font-semibold': isActive,
      })}
      onClick={handleSelect ? () => handleSelect(tab.title) : onClick}
    >
      {tab.title}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 w-10/12 -translate-x-1/2 border-b-2 border-primary" />
      )}
    </button>
  )
}

export default TabBarTab

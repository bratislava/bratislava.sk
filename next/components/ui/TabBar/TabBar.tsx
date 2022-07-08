import cx from 'classnames'

import { ITabBarTab, TabBarTab } from '../TabBarTab/TabBarTab'

export interface TabBarProps {
  className?: string
  tabs: ITabBarTab[]
  activeTab?: string
  onSelect?: (tab: string) => void
}

export const TabBar = ({ className, tabs, activeTab, onSelect }: TabBarProps) => (
  <div className={cx('flex space-x-10', className)}>
    {tabs?.map((tab, i) => (
      <TabBarTab
        key={i}
        tab={tab}
        isActive={tab.key === activeTab}
        onClick={() => onSelect?.(tab.key ? tab.key : '')}
      />
    ))}
  </div>
)

export default TabBar

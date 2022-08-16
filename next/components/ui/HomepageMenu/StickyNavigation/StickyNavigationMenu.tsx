import { MenuMainItem } from '@bratislava/ui-bratislava'
import { MenuItem } from '@bratislava/ui-bratislava/HomepageMenu/MenuItem'
import { MenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanel'
import { StickyMenuButton } from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/StickyMenuButton'
import { useStickyNavigationMenu } from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/useStickyNavigationMenu'
import cx from 'classnames'
import React from 'react'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
}

export const StickyNavigationMenu = ({ menuItems = [], className }: IProps) => {
  const { handleClick, visiblePanelId, handleMouseLeave, handleMouseEnter, highlightedMenuItemId } =
    useStickyNavigationMenu()

  return (
    <menu className={cx('fixed z-40 flex w-full justify-evenly bg-white pb-4 drop-shadow-lg', className)}>
      {menuItems.map((item) => (
        <li key={item.id} className="lg:w-[13%]">
          <MenuItem
            buttons={<StickyMenuButton item={item} isVisible={highlightedMenuItemId === item.id} />}
            item={item}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            isPanelVisible={visiblePanelId === item.id}
          >
            <MenuPanel item={item} className="w-full" isStickyMenu />
          </MenuItem>
        </li>
      ))}
    </menu>
  )
}

export default StickyNavigationMenu

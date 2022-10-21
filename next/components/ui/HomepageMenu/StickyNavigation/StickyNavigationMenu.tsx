import { MenuItem } from '@bratislava/ui-bratislava/HomepageMenu/MenuItem'
import { MenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanel'
import { StickyMenuButton } from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/StickyMenuButton'
import { useStickyNavigationMenu } from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/useStickyNavigationMenu'
import { MenuMainItem } from '@bratislava/ui-bratislava/HomepageMenu/types'
import cx from 'classnames'
import React from 'react'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
}

export const StickyNavigationMenu = ({ menuItems = [], className }: IProps) => {
  const { handleClick, visiblePanelId, handleMouseLeave, handleMouseEnter, highlightedMenuItemId, navBarRef } =
    useStickyNavigationMenu()

  return (
    <menu
      className={cx('fixed z-40 flex w-full gap-2 bg-white pb-4 drop-shadow-lg lg:flex lg:flex-row lg:justify-center lg:gap-x-1 lg:gap-y-0', className)}
    >
      {menuItems.map((item) => (
        <li key={item.id} className="lg:min-w-[13%] lg:shrink" ref={navBarRef}>
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

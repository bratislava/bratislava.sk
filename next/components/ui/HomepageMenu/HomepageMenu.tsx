import { MenuItem } from '@bratislava/ui-bratislava/HomepageMenu/MenuItem'
import { MenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanel'
import { useHomepageMenu } from '@bratislava/ui-bratislava/HomepageMenu/useHomepageMenu'
import React from 'react'

import { MenuButton } from '../../atoms/button/MenuButton'
import { MenuIcon } from '../../atoms/icon/IconService'

interface MenuSubSubItem {
  title: string
  url: string
}

export interface MenuSubItem {
  icon?: MenuIcon
  title: string
  moreLinkTitle?: string
  url: string
  subItems: MenuSubSubItem[]
}

export interface MenuMainItem {
  id: string
  icon: MenuIcon
  coloredIcon: MenuIcon
  title: string
  color: string
  colorDark?: string
  subItems?: MenuSubItem[]
}

interface IProps {
  items?: MenuMainItem[]
}

const HomepageMenu = ({ items }: IProps) => {
  const { handleMouseLeave, handleMouseEnter, handleClick, visiblePanelId } = useHomepageMenu()
  return (
    <nav className="mx-auto hidden w-[90%] md:mb-10 md:block" aria-labelledby="menu">
      <menu className="flex w-full flex-col justify-items-center gap-y-8 md:grid md:grid-cols-3 md:gap-y-10 md:gap-x-5 lg:flex lg:flex-row lg:justify-evenly">
        {items?.map((item) => (
          <li key={item.id} className="w-[80%] lg:w-[13%]">
            <MenuItem
              className="transition"
              buttons={
                <MenuButton
                  isActive={visiblePanelId === item.id}
                  iconItems={[{ iconName: item.icon }, { iconName: item.coloredIcon, customHoverColor: item.color }]}
                >
                  {item.title}
                </MenuButton>
              }
              item={item}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              isPanelVisible={visiblePanelId === item.id}
            >
              <MenuPanel item={item} className="delay-400 w-[95%] transition-opacity" isStickyMenu />
            </MenuItem>
          </li>
        ))}
      </menu>
    </nav>
  )
}

export default HomepageMenu

import { MenuItem } from '@bratislava/ui-bratislava/HomepageMenu/MenuItem'
import { MenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanel'
import { MenuMainItem } from '@bratislava/ui-bratislava/HomepageMenu/types'
import { useHomepageMenu } from '@bratislava/ui-bratislava/HomepageMenu/useHomepageMenu'
import React from 'react'

import { MenuButton } from '../../atoms/button/MenuButton'

interface IProps {
  items?: MenuMainItem[]
}

const HomepageMenu = ({ items }: IProps) => {
  const { handleMouseLeave, handleMouseEnter, handleClick, visiblePanelId } = useHomepageMenu()
  return (
    <nav className="ml-10 hidden md:mx-auto md:block md:w-[80%]" aria-labelledby="menu">
      <menu className="flex flex-col justify-items-center gap-y-10 md:grid md:grid-cols-3 md:gap-x-1 lg:flex lg:flex-row lg:justify-center lg:gap-y-0">
        {items?.map((item) => (
          <li key={item.id} className="mx-2 w-full">
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
              <MenuPanel
                item={item}
                className="w-full transition-opacity delay-500 md:w-[90%] lg:min-w-[75%] lg:max-w-[90%]"
              />
            </MenuItem>
          </li>
        ))}
      </menu>
    </nav>
  )
}

export default HomepageMenu

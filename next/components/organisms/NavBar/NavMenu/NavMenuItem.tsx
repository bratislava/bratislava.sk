import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { transformIconToCategory } from '@utils/getHoverColorFromIcon'
import { getColorsVariables } from '@utils/page'
import React from 'react'

import NavMenuContent from './NavMenuContent'
import NavMenuTrigger from './NavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

const NavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)

  const activeColor = `rgb(var(${getColorsVariables(category).c600}))`
  const backgroundColor = `rgb(var(${getColorsVariables(category).c200}))`

  return (
    <NavigationMenu.Item>
      <NavMenuTrigger label={menu.label} color={activeColor} />
      <NavMenuContent
        sections={menu.items}
        colCount={menu.colCount}
        backgroundColor={backgroundColor}
      />
    </NavigationMenu.Item>
  )
}

export default NavMenuItem

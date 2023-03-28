import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { transformIconToCategory } from '@utils/getHoverColorFromIcon'
import { getColorsVariables } from '@utils/page'
import React from 'react'

import MobileNavMenuContent from './MobileNavMenuContent'
import MobileNavMenuTrigger from './MobileNavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

const MobileNavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)

  const activeColor = `rgb(var(${getColorsVariables(category).c600}))`
  const backgroundColor = `rgb(var(${getColorsVariables(category).c200}))`

  return (
    <NavigationMenu.Item>
      <MobileNavMenuTrigger menuItem={menu} />
      <MobileNavMenuContent menuItem={menu} backgroundColor={backgroundColor} />
    </NavigationMenu.Item>
  )
}

export default MobileNavMenuItem

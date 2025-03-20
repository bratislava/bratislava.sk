import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import { getCategoryColorLocalStyle, transformIconToCategory } from '@/utils/colors'

import MobileNavMenuContent from './MobileNavMenuContent'
import MobileNavMenuTrigger from './MobileNavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

const MobileNavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)
  const colorStyle = getCategoryColorLocalStyle({ category })

  return (
    <NavigationMenu.Item>
      <MobileNavMenuTrigger menuItem={menu} />
      <MobileNavMenuContent menuItem={menu} colorStyle={colorStyle} />
    </NavigationMenu.Item>
  )
}

export default MobileNavMenuItem

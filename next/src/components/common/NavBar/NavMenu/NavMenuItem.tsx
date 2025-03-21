import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import { getCategoryColorLocalStyle, transformIconToCategory } from '@/src/utils/colors'

import NavMenuContent from './NavMenuContent'
import NavMenuTrigger from './NavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

const NavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)
  const colorStyle = getCategoryColorLocalStyle({ category })

  return (
    <NavigationMenu.Item>
      <NavMenuTrigger label={menu.label} colorStyle={colorStyle} />
      <NavMenuContent sections={menu.items} colCount={menu.colCount} colorStyle={colorStyle} />
    </NavigationMenu.Item>
  )
}

export default NavMenuItem

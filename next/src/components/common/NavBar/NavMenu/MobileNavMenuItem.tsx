import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import { getCategoryColorLocalStyle, transformIconToCategory } from '@/src/utils/colors'

import MobileNavMenuContent from './MobileNavMenuContent'
import MobileNavMenuTrigger from './MobileNavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-33525&m=dev
 */

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

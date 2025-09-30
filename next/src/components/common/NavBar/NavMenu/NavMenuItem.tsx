import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React from 'react'

import { getCategoryColorLocalStyle, transformIconToCategory } from '@/src/utils/colors'

import NavMenuContent from './NavMenuContent'
import NavMenuTrigger from './NavMenuTrigger'
import { MenuItem } from './navMenuTypes'

type NavItemProps = {
  menu: MenuItem
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-33525&m=dev
 */

const NavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)
  const colorStyle = getCategoryColorLocalStyle({ category })

  return (
    <NavigationMenu.Item className="wrapper-focus-ring rounded-xs">
      <NavMenuTrigger label={menu.label} colorStyle={colorStyle} />
      <NavMenuContent
        sections={menu.items}
        colCount={menu.colCount}
        colorStyle={colorStyle}
        parentLabel={menu.label}
        parentHref={menu.linkHref}
      />
    </NavigationMenu.Item>
  )
}

export default NavMenuItem

import { Enum_Componentmenumenusection_Icon } from '@backend/graphql'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { getCategoryColorLocalStyle, transformIconToCategory } from '@utils/colors'
import React from 'react'

import NavMenuContent from './NavMenuContent'
import NavMenuTrigger from './NavMenuTrigger'
import { MenuItem, MenuSection } from './navMenuTypes'

const mockMenuObj: MenuSection = {
  label: 'Our tools',
  items: [
    {
      label: 'Kviz',
      url: '/zivotne-prostredie-a-vystavba/climathon/kviz',
    },
    {
      label: 'Events',
      url: '/eventy',
    },
    {
      label: 'Projekty',
      url: '/udrzatelne-projekty',
    },
  ],
  icon: Enum_Componentmenumenusection_Icon.ZivotneProstredie_03,
  colSpan: 1,
}

type NavItemProps = {
  menu: MenuItem
}

const NavMenuItem = ({ menu }: NavItemProps) => {
  const category = transformIconToCategory(menu.icon)
  const colorStyle = getCategoryColorLocalStyle({ category })

  return (
    <NavigationMenu.Item>
      <NavMenuTrigger label={menu.label} colorStyle={colorStyle} />
      <NavMenuContent
        sections={menu.icon === 'zp_vystavba_03' ? [...menu.items, mockMenuObj] : menu.items}
        colCount={menu.colCount}
        colorStyle={colorStyle}
      />
    </NavigationMenu.Item>
  )
}

export default NavMenuItem

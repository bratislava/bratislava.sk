import {
  Enum_Componentmenumenuitem_Icon,
  Enum_Componentmenumenusection_Icon,
} from '@bratislava/strapi-sdk-homepage'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import { useNavMenuContext } from './navMenuContext'
import NavMenuItem from './NavMenuItem'

export type MenuLink = {
  label: string
  url: string
}

export type MenuSection = {
  items: MenuLink[]
  colSpan: number
  label?: string
  showMoreLink?: MenuLink
  icon?: Enum_Componentmenumenusection_Icon
}

export type MenuItem = {
  label: string
  colCount: number
  items: MenuSection[]
  icon: Enum_Componentmenumenuitem_Icon
  linkHref: string
}

type NavigationMenuProps = {
  menus: MenuItem[]
}

const NavMenu = ({ menus }: NavigationMenuProps) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const { menuValue, setMenuValue } = useNavMenuContext()

  useEffect(() => {
    setMenuValue('')
  }, [router.asPath, setMenuValue])

  return (
    <NavigationMenu.Root
      value={menuValue}
      onValueChange={setMenuValue}
      aria-label={t('navAriaLabel')}
      // to re-enable pointer events when menu is open and whole page has pointer events disabled
      className="pointer-events-auto"
    >
      <NavigationMenu.List className="shadow-md z-20 bg-white">
        <div className="max-w-screen-lg m-auto w-full grid grid-flow-col grid-cols-6">
          {menus.map((menu, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavMenuItem key={index} menu={menu} />
          ))}
        </div>
      </NavigationMenu.List>

      {/* Viewport represents popup div with links that appears under menu button */}
      <NavigationMenu.Viewport
        // Together with onCLick in NavMenuContent, it closes the menu on click outside of container area
        onClick={() => setMenuValue('')}
        className="z-10 w-full"
      />
    </NavigationMenu.Root>
  )
}

export default NavMenu

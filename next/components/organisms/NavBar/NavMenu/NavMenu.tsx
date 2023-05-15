import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo } from 'react'

import { getParsedMenus } from './getParsedMenus'
import { useNavMenuContext } from './navMenuContext'
import NavMenuItem from './NavMenuItem'

const NavMenu = () => {
  const t = useTranslations('NavMenu')
  const pathname = usePathname()

  const { menu } = useGeneralContext()

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('more'))
  }, [menu, t])

  const { menuValue, setMenuValue } = useNavMenuContext()

  useEffect(() => {
    setMenuValue('')
  }, [pathname, setMenuValue])

  return (
    <NavigationMenu.Root
      value={menuValue}
      onValueChange={setMenuValue}
      aria-label={t('aria.navMenuLabel')}
    >
      <div className="relative z-30 shadow-md">
        <NavigationMenu.List className="m-auto grid w-full max-w-screen-xl grid-flow-col grid-cols-6">
          {menus.map((menuItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavMenuItem key={index} menu={menuItem} />
          ))}
        </NavigationMenu.List>
      </div>

      {/* Viewport represents popup div with links that appears under menu button */}
      <NavigationMenu.Viewport
        // Together with onCLick in NavMenuContent, it closes the menu on click outside of container area
        onClick={() => setMenuValue('')}
        className="absolute z-[29] h-screen w-full"
      />
    </NavigationMenu.Root>
  )
}

export default NavMenu

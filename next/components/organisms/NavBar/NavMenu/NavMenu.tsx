import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useMemo } from 'react'

import { getParsedMenus } from './getParsedMenus'
import { useNavMenuContext } from './navMenuContext'
import NavMenuItem from './NavMenuItem'

const NavMenu = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const { menu } = useGeneralContext()

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('navMenuMore'))
  }, [menu, t])

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
      <NavigationMenu.List className="shadow-md relative z-30">
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
        className="absolute z-[29] w-full"
      />
    </NavigationMenu.Root>
  )
}

export default NavMenu

import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/navMenuTypes'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import { useNavMenuContext } from './navMenuContext'
import NavMenuItem from './NavMenuItem'

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
      <NavigationMenu.List className="shadow-md relative z-30 bg-white">
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
      />
    </NavigationMenu.Root>
  )
}

export default NavMenu

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { useTranslation } from '@/src/utils/useTranslation'

import { getParsedMenus } from './getParsedMenus'
import { useNavMenuContext } from './navMenuContext'
import NavMenuItem from './NavMenuItem'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-33525&m=dev
 */

const NavMenu = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const { menu } = useGeneralContext()

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('NavMenu.more'))
  }, [menu, t])

  const { menuValue, setMenuValue } = useNavMenuContext()

  useEffect(() => {
    setMenuValue('')
  }, [pathname, setMenuValue])

  return (
    <NavigationMenu.Root
      value={menuValue}
      onValueChange={setMenuValue}
      aria-label={t('NavMenu.aria.navMenuLabel')}
    >
      <div className="relative z-30 mx-auto border-b px-4 lg:px-8">
        <NavigationMenu.List className="flex flex-wrap gap-4 py-4">
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
        className="absolute z-29 h-screen w-full"
      />
    </NavigationMenu.Root>
  )
}

export default NavMenu

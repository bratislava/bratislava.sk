import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useMemo } from 'react'
import { useEventListener, useScrollLock, useWindowSize } from 'usehooks-ts'

import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'
import NavBarHorizontalDivider from '@/src/components/common/NavBar/NavMenu/NavBarHorizontalDivider'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

import { getParsedMenus } from './getParsedMenus'
import MobileNavMenuItem from './MobileNavMenuItem'
import { useNavMenuContext } from './navMenuContext'

const MobileNavMenu = () => {
  const { t } = useTranslation()
  const { height } = useWindowSize()
  const heightWithoutHeader = `calc(${height}px - 14*4px)`

  const { menu: generalMenu, general } = useGeneralContext()
  const { header } = general ?? {}
  const { links, accountLink } = header ?? {}
  const linksOnMobile = links?.filter(isDefined).filter((link) => link.showOnMobile)

  const menus = useMemo(() => {
    return getParsedMenus(generalMenu, t('NavMenu.more'))
  }, [generalMenu, t])

  const { menuValue, setMenuValue, isMobileMenuOpen, setMobileMenuOpen } = useNavMenuContext()

  useScrollLock()

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMobileMenuOpen(false)
    }
  })

  return (
    <div
      className={cn(
        'fixed top-14 left-0 z-28 flex w-screen flex-col gap-4 overflow-y-scroll bg-white px-4 py-6 lg:hidden',
        {
          'animate-fade-in': isMobileMenuOpen,
          'animate-fade-out': !isMobileMenuOpen,
        },
      )}
      style={{ height: heightWithoutHeader }}
    >
      <NavigationMenu.Root
        value={menuValue}
        onValueChange={setMenuValue}
        aria-label={t('NavMenu.aria.navMenuLabel')}
      >
        <NavigationMenu.List className="flex flex-col gap-2">
          {menus.map((menu, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MobileNavMenuItem key={index} menu={menu} />
          ))}

          {accountLink && (
            <>
              <NavBarHorizontalDivider />
              <li className="my-1 flex justify-center md:justify-start">
                <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    size="small"
                    variant="solid"
                    fullWidthMobile
                    data-cy="mobile-account-button"
                    {...getLinkProps(accountLink)}
                  />
                </NavigationMenu.Link>
              </li>
            </>
          )}

          {linksOnMobile?.length && <NavBarHorizontalDivider />}

          {linksOnMobile?.map((link, linkIndex) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={linkIndex} className="relative flex items-center gap-2">
                <div aria-hidden>
                  <Pictogram iconName={link.icon} />
                </div>
                <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
                  <MLink variant="underlined" stretched {...getLinkProps(link)} />
                </NavigationMenu.Link>
              </li>
            )
          })}
        </NavigationMenu.List>

        {/* Viewport represents popup div with links that appears under menu button */}
        <NavigationMenu.Viewport
          className="fixed top-14 left-0 z-29 w-screen overflow-y-scroll data-[state=closed]:animate-exit-to-right data-[state=open]:animate-enter-from-right"
          style={{ height: `calc(${height}px - 14*4px)` }}
        />
      </NavigationMenu.Root>
    </div>
  )
}

export default MobileNavMenu

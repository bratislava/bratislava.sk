import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import React, { useMemo } from 'react'
import { useEventListener, useLockedBody, useWindowSize } from 'usehooks-ts'

import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'
import NavBarHorizontalDivider from '@/src/components/common/NavBar/NavMenu/NavBarHorizontalDivider'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import cn from '@/src/utils/cn'
import { getCommonLinkProps } from '@/src/utils/getCommonLinkProps'
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
  const { header } = general?.data?.attributes ?? {}
  const { links, accountLink } = header ?? {}
  const linksOnMobile = links?.filter(isDefined).filter((link) => link.showOnMobile)

  const menus = useMemo(() => {
    return getParsedMenus(generalMenu, t('NavMenu.more'))
  }, [generalMenu, t])

  const { menuValue, setMenuValue, isMobileMenuOpen, setMobileMenuOpen } = useNavMenuContext()

  useLockedBody(isMobileMenuOpen, 'root')

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMobileMenuOpen(false)
    }
  })

  return (
    <div
      className={cn(
        'fixed left-0 top-14 z-[28] flex w-screen flex-col gap-4 overflow-y-scroll bg-white px-4 py-6 lg:hidden',
        {
          'animate-fadeIn': isMobileMenuOpen,
          'animate-fadeOut': !isMobileMenuOpen,
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
                    variant="category-solid"
                    fullWidthMobile
                    data-cy="mobile-account-button"
                    {...getCommonLinkProps(accountLink)}
                  />
                </NavigationMenu.Link>
              </li>
            </>
          )}

          {linksOnMobile?.length && <NavBarHorizontalDivider />}

          {linksOnMobile?.map((link, linkIndex) => {
            // TODO better approach to links
            const pageSlug = link.page?.data?.attributes?.slug
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={linkIndex} className="relative flex items-center gap-2">
                <div aria-hidden>
                  <Pictogram iconName={link.icon} />
                </div>
                <NavigationMenu.Link asChild onClick={() => setMobileMenuOpen(false)}>
                  <MLink
                    href={pageSlug ? `/${pageSlug}` : (link.url ?? '#')}
                    target={link.url ? '_blank' : undefined}
                    variant="underlined"
                    stretched
                  >
                    {link.label}
                  </MLink>
                </NavigationMenu.Link>
              </li>
            )
          })}
        </NavigationMenu.List>

        {/* Viewport represents popup div with links that appears under menu button */}
        <NavigationMenu.Viewport
          className="fixed left-0 top-14 z-[29] w-screen overflow-y-scroll data-[state=closed]:animate-exitToRight data-[state=open]:animate-enterFromRight"
          style={{ height: `calc(${height}px - 14*4px)` }}
        />
      </NavigationMenu.Root>
    </div>
  )
}

export default MobileNavMenu

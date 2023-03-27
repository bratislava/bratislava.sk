import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { Icon } from '../../../atoms/icon/Icon'
import Button from '../../../forms/simple-components/Button'
import MLink from '../../../forms/simple-components/MLink'
import { getParsedMenus } from './getParsedMenus'
import HorizontalDivider from './HorizontalDivider'
import MobileNavMenuItem from './MobileNavMenuItem'
import { useNavMenuContext } from './navMenuContext'

const MobileNavMenu = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { height } = useWindowSize()
  const heightWithoutHeader = `calc(${height}px - 14*4px)`

  const { menu: generalMenu, general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { links, accountLink } = header ?? {}

  const menus = useMemo(() => {
    return getParsedMenus(generalMenu, t('navMenuMore'))
  }, [generalMenu, t])

  const { menuValue, setMenuValue } = useNavMenuContext()

  return (
    <div
      className="gap-4 fixed top-14 left-0 w-screen overflow-y-scroll bg-white lg:hidden flex flex-col px-4 py-6 z-[28]"
      style={{ height: heightWithoutHeader }}
    >
      <NavigationMenu.Root
        value={menuValue}
        onValueChange={setMenuValue}
        aria-label={t('navAriaLabel')}
      >
        <NavigationMenu.List className="flex flex-col gap-2">
          {menus.map((menu, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MobileNavMenuItem key={index} menu={menu} />
          ))}

          <HorizontalDivider />

          {links
            ?.filter(isDefined)
            .filter((link) => link.showOnMobile)
            .map((link) => {
              return (
                <li className="relative flex items-center gap-2">
                  <div aria-hidden>
                    <Icon iconName={link.icon} />
                  </div>
                  <NavigationMenu.Link asChild>
                    <MLink
                      href={link.page?.data?.attributes?.slug ?? link.url ?? ''}
                      target={link.page?.data?.attributes?.slug ? '_blank' : undefined}
                      variant="navBarHeader"
                      stretched
                    >
                      {link.label}
                    </MLink>
                  </NavigationMenu.Link>
                </li>
              )
            })}

          {accountLink && (
            <>
              <HorizontalDivider />
              <li className="mt-2 flex justify-center">
                <NavigationMenu.Link asChild>
                  <Button
                    size="sm"
                    onPress={() => router.push(accountLink.url ?? '')}
                    variant="negative"
                    text={accountLink.label}
                    className="mb-30"
                  />
                </NavigationMenu.Link>
              </li>
            </>
          )}
        </NavigationMenu.List>

        {/* Viewport represents popup div with links that appears under menu button */}
        <NavigationMenu.Viewport
          className="fixed top-14 left-0 w-screen overflow-y-scroll z-[29]"
          style={{ height: `calc(${height}px - 14*4px)` }}
        />
      </NavigationMenu.Root>
    </div>
  )
}

export default MobileNavMenu

import { HelpIcon, LogoutIcon, ProfileIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { MenuItemBase } from '@components/forms/simple-components/MenuDropdown/MenuDropdown'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import useCityAccount from '@utils/useCityAccount'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import NavBarHorizontalDivider from '../NavMenu/NavBarHorizontalDivider'
import { ROUTES } from '../UserProfilePhoto'

interface INavBarAuthHeaderMobileProps {
  onCloseMenu: () => void
}

export const handleOnKeyPress = (
  event: React.KeyboardEvent,
  callback?: () => void,
  key = 'Enter',
) => {
  if (event.key === key) {
    callback?.()
  }
}

const Item = ({
  menuItem,
  onClick,
  onCloseMenu,
}: {
  menuItem: MenuItemBase
  onClick: () => void
  onCloseMenu: () => void
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => handleOnKeyPress(event, onClick)}
      className="relative flex items-center gap-2"
    >
      <div>{menuItem.icon}</div>

      <NavigationMenu.Link asChild onClick={onCloseMenu}>
        <span>{menuItem?.title}</span>
      </NavigationMenu.Link>
    </div>
  )
}

const NavBarAuthHeaderMobile = ({ onCloseMenu }: INavBarAuthHeaderMobileProps) => {
  const t = useTranslations()
  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { accountLink } = header ?? {}

  const { data, signOut } = useCityAccount()

  const menuItems: MenuItemBase[] = [
    {
      id: 1,
      title: t('menu_profile_link'),
      icon: <ProfileIcon className="h-5 w-5" />,
      url: ROUTES.USER_PROFILE,
    },
    {
      id: 2,
      title: t('menu_help_link'),
      icon: <HelpIcon className="h-5 w-5" />,
      url: ROUTES.HELP,
    },
    {
      id: 3,
      title: t('menu_logout_link'),
      icon: <LogoutIcon className="h-5 w-5 text-negative-700" />,
      onPress: signOut,
      itemClassName: 'bg-negative-50',
    },
  ]

  return data ? (
    menuItems.map((sectionItem) => {
      // TODO clean up this logic & move menu items closer to where they are used
      if (sectionItem.onPress) {
        return (
          <Item
            key={sectionItem.id}
            menuItem={sectionItem}
            onClick={() => {
              sectionItem.onPress()
              onCloseMenu()
            }}
            onCloseMenu={onCloseMenu}
          />
        )
      }
      return sectionItem.url ? (
        <Item menuItem={sectionItem} onClick={onCloseMenu} onCloseMenu={onCloseMenu} />
      ) : null
    })
  ) : accountLink ? (
    <>
      <NavBarHorizontalDivider />

      <li className="my-1 flex justify-center md:justify-start">
        <NavigationMenu.Link asChild onClick={onCloseMenu}>
          <Button
            size="sm"
            variant="category"
            fullWidthMobile
            {...getCommonLinkProps(accountLink)}
          />
        </NavigationMenu.Link>
      </li>
    </>
  ) : null
}

export default NavBarAuthHeaderMobile

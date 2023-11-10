import { HelpIcon, LogoutIcon, ProfileIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import { MenuItemBase } from '@components/forms/simple-components/MenuDropdown/MenuDropdown'
import MLink from '@components/forms/simple-components/MLink'
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

interface IItemProps extends MenuItemBase {
  onCloseMenu: () => void
  onPress?: () => void
}

const Item = ({ icon, title, url, onPress, onCloseMenu }: IItemProps) => {
  const onClick = () => {
    onPress?.()
    onCloseMenu()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => handleOnKeyPress(event, onClick)}
      className="relative flex items-center gap-2"
    >
      <div className="flex h-12 w-12 items-center justify-center">{icon}</div>

      <NavigationMenu.Link asChild onClick={onCloseMenu}>
        <MLink href={url ?? '#'} target={url ? '_blank' : undefined} variant="underlined" stretched>
          {title}
        </MLink>
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
      icon: <ProfileIcon className="h-8 w-8" />,
      url: ROUTES.USER_PROFILE,
    },
    {
      id: 2,
      title: t('menu_help_link'),
      icon: <HelpIcon className="h-8 w-8" />,
      url: ROUTES.HELP,
    },
    {
      id: 3,
      title: t('menu_logout_link'),
      icon: <LogoutIcon className="h-8 w-8 text-negative-700" />,
      onPress: signOut,
      itemClassName: 'bg-negative-50',
    },
  ]

  return data || accountLink ? (
    <>
      <NavBarHorizontalDivider />

      {data ? (
        menuItems.map((sectionItem) => (
          <Item key={sectionItem.id} {...sectionItem} onCloseMenu={onCloseMenu} />
        ))
      ) : (
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
      )}
    </>
  ) : null
}

export default NavBarAuthHeaderMobile

import { HelpIcon, LogoutIcon, ProfileIcon } from '@assets/ui-icons'
import { MenuItemBase } from '@components/forms/simple-components/MenuDropdown/MenuDropdown'
import cx from 'classnames'
import { useTranslations } from 'next-intl'

const ROUTES = {
  USER_PROFILE: `${process.env.NEXT_PUBLIC_KONTO_URL}/moj-profil`,
  HELP: `${process.env.NEXT_PUBLIC_KONTO_URL}/pomoc`,
}

interface IUseProfileMenuProps {
  signOut: () => void
  iconClassName?: string
}

export const useProfileMenuItems = ({
  signOut,
  iconClassName = 'h-5 w-5',
}: IUseProfileMenuProps): MenuItemBase[] => {
  const t = useTranslations()

  const menuItems: MenuItemBase[] = [
    {
      id: 1,
      title: t('menu_profile_link'),
      icon: <ProfileIcon className={iconClassName} />,
      url: ROUTES.USER_PROFILE,
    },
    {
      id: 2,
      title: t('menu_help_link'),
      icon: <HelpIcon className={iconClassName} />,
      url: ROUTES.HELP,
    },
    {
      id: 3,
      title: t('menu_logout_link'),
      icon: <LogoutIcon className={cx(iconClassName, 'text-negative-700')} />,
      onPress: signOut,
      itemClassName: 'bg-negative-50',
    },
  ]
  return menuItems
}

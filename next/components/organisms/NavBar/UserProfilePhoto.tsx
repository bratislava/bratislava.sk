import { ChevronDownSmallIcon, HelpIcon, LogoutIcon, ProfileIcon } from '@assets/ui-icons'
import MenuDropdown, {
  MenuItemBase,
} from '@components/forms/simple-components/MenuDropdown/MenuDropDown'
import { UserData } from 'backend/dtos/userDto'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface UserProfilePhotoProps {
  userData: UserData
  isMenuOpen: boolean
}

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

const Avatar = ({ userData }: { userData?: UserData | null }) => {
  return (
    <div className="relative flex flex-row items-start gap-2 rounded-full bg-main-100 p-2">
      <div className="flex h-6 w-6 items-center justify-center font-semibold text-main-700">
        <span className="uppercase">
          {userData && userData.given_name && userData.family_name ? (
            userData.given_name[0] + userData.family_name[0]
          ) : (
            <ProfileIcon className="h-6 w-6 text-main-700" />
          )}
        </span>
      </div>
    </div>
  )
}

const ROUTES = {
  USER_PROFILE: `${process.env.NEXT_PUBLIC_KONTO_URL}/moj-profil`,
  HELP: `${process.env.NEXT_PUBLIC_KONTO_URL}/pomoc`,
}

const UserProfilePhoto = ({ userData, isMenuOpen }: UserProfilePhotoProps) => {
  return (
    <div className="flex items-center font-semibold text-font/75">
      <Avatar userData={userData} />
      <div className="ml-3 font-light text-gray-700 lg:font-semibold">{userData?.given_name}</div>
      <ChevronDownSmallIcon
        className={`ml-1 hidden h-5 w-5 mix-blend-normal lg:flex ${
          isMenuOpen ? '-rotate-180' : ''
        }`}
      />
    </div>
  )
}

interface Props {
  userData: UserData
  signOut: () => void
}

const ProfileMenu = ({ userData, signOut }: Props) => {
  const t = useTranslations()
  const [isMenuOpen, setIsMenuOpen] = useState()

  const menuItems: MenuItemBase[] = [
    {
      id: 1,
      title: t('menu_profile_link'),
      icon: <ProfileIcon className="h-5 w-5" />,
      url: ROUTES.USER_PROFILE,
    },
    // TODO this is duplicated today in mobile menu, we need a flag or two different lists for mobile & desktop
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

  return (
    <>
      <Divider />

      <MenuDropdown
        setIsOpen={setIsMenuOpen}
        buttonTrigger={<UserProfilePhoto userData={userData} isMenuOpen={isMenuOpen} />}
        itemVariant="header"
        items={menuItems}
      />

      <Divider />
    </>
  )
}

export default ProfileMenu

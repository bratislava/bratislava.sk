import { ChevronDownSmallIcon, ProfileIcon } from '@assets/ui-icons'
import MenuDropdown from '@components/forms/simple-components/MenuDropdown/MenuDropdown'
import { useProfileMenuItems } from '@utils/useProfileMenuItems'
import { CityAccountUser } from 'backend/dtos/user.dto'
import { useState } from 'react'

interface IUserProfilePhotoProps {
  userData: CityAccountUser
  isMenuOpen: boolean
}

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

const Avatar = ({ userData }: { userData?: CityAccountUser | null }) => {
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

const UserProfilePhoto = ({ userData, isMenuOpen }: IUserProfilePhotoProps) => {
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

interface IProfileMenuProps {
  userData: CityAccountUser
  signOut: () => void
}

const ProfileMenu = ({ userData, signOut }: IProfileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const menuItems = useProfileMenuItems({ signOut })

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

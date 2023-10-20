import { ChevronDownSmallIcon, ProfileIcon } from '@assets/ui-icons'
import { UserData } from 'backend/dtos/userDto'

interface UserProfilePhotoProps {
  userData: UserData
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

const UserProfilePhoto = ({ userData }: UserProfilePhotoProps) => {
  return (
    <>
      <Divider />

      <div className="flex items-center font-semibold text-font/75">
        <Avatar userData={userData} />
        <div className="ml-3 font-light text-gray-700 lg:font-semibold">{userData?.given_name}</div>
        <ChevronDownSmallIcon
          className={`ml-1 hidden h-5 w-5 mix-blend-normal lg:flex ${false ? '-rotate-180' : ''}`}
        />
      </div>

      <Divider />
    </>
  )
}

export default UserProfilePhoto

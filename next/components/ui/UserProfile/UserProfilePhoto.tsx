import { UserData } from '@utils/useAccount'
import cx from 'classnames'

interface UserProfilePhotoProps {
  userData: UserData
}

const UserProfilePhoto = ({ userData }: UserProfilePhotoProps) => {
  const { given_name, family_name, email } = userData
  const initialLetters =
    given_name || family_name
      ? (given_name ? given_name.slice(0, 1) : '') + (family_name ? family_name.slice(0, 1) : '')
      : email
      ? email.slice(0, 1)
      : ''

  return (
    <div
      className={cx(
        'min-w-24 w-24 h-24 rounded-full flex flex-col justify-center items-center bg-main-100 text-main-700',
        'md:min-w-[168px] md:w-[168px] md:h-[168px]',
      )}
    >
      <span className="text-p1-semibold md:text-h2">{initialLetters.toUpperCase()}</span>
    </div>
  )
}

export default UserProfilePhoto

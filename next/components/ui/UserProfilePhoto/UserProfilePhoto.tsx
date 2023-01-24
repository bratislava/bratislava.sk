import cx from 'classnames'

interface UserProfilePhotoProps {}

const UserProfilePhoto = () => {
  return (
    <div
      className={cx(
        'w-24 h-24 rounded-full flex flex-col justify-center items-center bg-main-100 text-main-700',
        'xs:w-[168px] xs:h-[168px]',
      )}
    >
      <span className="text-p1-semibold xs:text-h2">MM</span>
    </div>
  )
}

export default UserProfilePhoto

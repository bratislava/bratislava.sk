import UserProfileDetailEdit from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailEdit'
import UserProfileDetailsButtons from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailsButtons'
import UserProfileDetailView from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailView'
import UserProfilePhoto from '@bratislava/ui-bratislava/UserProfile/UserProfilePhoto'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfile/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfile/UserProfileSectionHeader'
import { UserData } from '@utils/useAccount'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

interface UserProfileDetailProps {
  userData?: UserData | null
  temporaryUserData?: UserData | null
  isEditing?: boolean
  onChangeIsEditing: (isEditing: boolean) => void
  onChangeTemporary: (temporaryUserData: UserData) => void
  onCancelEditing: () => void
  onSubmitEditing: () => void
}

const UserProfileDetails = (props: UserProfileDetailProps) => {
  const {
    userData,
    temporaryUserData,
    isEditing,
    onChangeIsEditing,
    onChangeTemporary,
    onCancelEditing,
    onSubmitEditing,
  } = props
  const { t } = useTranslation('account')
  return (
    <div
      className={cx('', 'xs:static xs:z-0', { 'absolute top-0 left-0 right-0 z-50': isEditing })}
    >
      <UserProfileSection>
        <UserProfileSectionHeader
          title={t('profile_detail.title')}
          text={t('profile_detail.text')}
          isEditing={isEditing}
          underline
        >
          <UserProfileDetailsButtons
            isEditing={isEditing}
            onChangeIsEditing={onChangeIsEditing}
            onCancelEditing={onCancelEditing}
            onSubmitEditing={onSubmitEditing}
          />
        </UserProfileSectionHeader>
        <div className={cx('flex p-4 flex-col gap-8', 'xs:p-8 xs:flex-row xs:gap-16 xs:flex-wrap')}>
          <UserProfilePhoto userData={userData ?? {}} />
          {isEditing ? (
            <UserProfileDetailEdit
              temporaryUserData={temporaryUserData ?? {}}
              onChangeTemporary={onChangeTemporary}
            />
          ) : (
            <UserProfileDetailView userData={userData ?? {}} />
          )}
        </div>
      </UserProfileSection>
    </div>
  )
}

export default UserProfileDetails

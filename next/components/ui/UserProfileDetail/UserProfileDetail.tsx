import EditIcon from '@assets/images/forms/edit_white.svg'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfileSection/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfileSectionHeader/UserProfileSectionHeader'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'

interface UserProfileDetailProps {
  isEditing?: boolean
  onChangeIsEditing: (isEditing: boolean) => void
}

const UserProfileDetails = (props: UserProfileDetailProps) => {
  const { isEditing, onChangeIsEditing } = props
  const { t } = useTranslation('account')
  return (
    <UserProfileSection>
      <UserProfileSectionHeader title={t('profile_detail.title')} text={t('profile_detail.text')}>
        <div>
          {isEditing ? (
            <Button
              variant="black"
              size="sm"
              text={t('profile_detail.save_edit_button')}
              onPress={() => onChangeIsEditing(false)}
            />
          ) : (
            <Button
              variant="black"
              startIcon={<EditIcon />}
              size="sm"
              text={t('profile_detail.start_edit_button')}
              onPress={() => onChangeIsEditing(true)}
            />
          )}
        </div>
      </UserProfileSectionHeader>
    </UserProfileSection>
  )
}

export default UserProfileDetails

import EditIcon from '@assets/images/forms/edit_icon.svg'
import WhiteEditIcon from '@assets/images/forms/edit_white.svg'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfileSection/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfileSectionHeader/UserProfileSectionHeader'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'

interface ButtonSectionProps {
  isEditing?: boolean
  onChangeIsEditing: (isEditing: boolean) => void
}

const ButtonSection = ({ isEditing, onChangeIsEditing }: ButtonSectionProps) => {
  const { t } = useTranslation('account')
  return (
    <div className="width-fit">
      {isEditing ? (
        <div className="flex flex-row gap-5 items-center">
          <Button
            variant="plain-black"
            size="sm"
            text={t('profile_detail.stop_edit_button')}
            onPress={() => onChangeIsEditing(false)}
          />
          <Button
            variant="black"
            size="sm"
            text={t('profile_detail.save_edit_button')}
            onPress={() => onChangeIsEditing(false)}
          />
        </div>
      ) : (
        <div className="width-fit">
          <Button
            variant="black"
            startIcon={<WhiteEditIcon />}
            size="sm"
            text={t('profile_detail.start_edit_button')}
            className="hidden xs:block"
            onPress={() => onChangeIsEditing(true)}
          />
          <EditIcon
            className="block xs:hidden cursor-pointer"
            onClick={() => onChangeIsEditing(true)}
          />
        </div>
      )}
    </div>
  )
}

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
        <ButtonSection isEditing={isEditing} onChangeIsEditing={onChangeIsEditing} />
      </UserProfileSectionHeader>
    </UserProfileSection>
  )
}

export default UserProfileDetails

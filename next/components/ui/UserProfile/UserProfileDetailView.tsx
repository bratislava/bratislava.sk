import UserProfileDetailViewRow from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailViewRow'
import { UserData } from '@utils/useAccount'
import { useTranslation } from 'next-i18next'

interface UserProfileDetailViewProps {
  userData: UserData
}

const UserProfileDetailView = ({ userData }: UserProfileDetailViewProps) => {
  const { t } = useTranslation('account')
  const { given_name, family_name, email, phone_number, address } = userData
  const fullName = `${given_name ?? ''} ${family_name ?? ''}`

  return (
    <div className="flex flex-col grow gap-6">
      <UserProfileDetailViewRow label={t('profile_detail.titles_before_name')} />
      <UserProfileDetailViewRow label={t('profile_detail.full_name')} value={fullName} />
      <UserProfileDetailViewRow label={t('profile_detail.titles_after_name')} />
      <UserProfileDetailViewRow label={t('profile_detail.email')} value={email} />
      <UserProfileDetailViewRow label={t('profile_detail.phone_number')} value={phone_number} />
      <UserProfileDetailViewRow label={t('profile_detail.address')} value={address?.formatted} />
    </div>
  )
}

export default UserProfileDetailView

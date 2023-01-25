import UserProfileConsents, {
  Consent,
} from '@bratislava/ui-bratislava/UserProfileConsents/UserProfileConsents'
import UserProfileDetail from '@bratislava/ui-bratislava/UserProfileDetail/UserProfileDetail'
import UserProfilePassword from '@bratislava/ui-bratislava/UserProfilePassword/UserProfilePassword'
import useAccount from '@utils/useAccount'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const UserProfileView = () => {
  const { t } = useTranslation('account')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { userData } = useAccount()
  console.log('USER', userData)

  // TODO: handle change of consents in backend DB
  const [allConsents, setAllConsents] = useState<Consent[]>([
    {
      id: 'personal_data',
      title: t('consents.personal_data.title'),
      text: t('consents.personal_data.text'),
      isDisabled: true,
      isSelected: true,
    },
    {
      id: 'receive_information',
      title: t('consents.receive_information.title'),
      text: t('consents.receive_information.text'),
      isDisabled: false,
      isSelected: true,
    },
  ])

  // TODO: redirect to change password
  return (
    <section className="flex flex-col gap-2 xs:gap-0 h-full xs:bg-white">
      <UserProfileDetail
        userData={userData}
        isEditing={isEditing}
        onChangeIsEditing={setIsEditing}
      />
      <UserProfilePassword />
      <UserProfileConsents allConsents={allConsents} onChange={setAllConsents} />
    </section>
  )
}

export default UserProfileView

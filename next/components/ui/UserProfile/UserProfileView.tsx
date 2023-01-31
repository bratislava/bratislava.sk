import UserProfileConsents, {
  Consent,
} from '@bratislava/ui-bratislava/UserProfile/UserProfileConsents'
import UserProfileDetail from '@bratislava/ui-bratislava/UserProfile/UserProfileDetail'
import UserProfilePassword from '@bratislava/ui-bratislava/UserProfile/UserProfilePassword'
import useAccount from '@utils/useAccount'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

const UserProfileView = () => {
  const { t } = useTranslation('account')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const {
    userData,
    updateUserData,
    temporaryUserData,
    setTemporaryUserData,
    resetTemporaryUserData,
    error,
  } = useAccount()

  useEffect(() => console.log('USER DATA', userData), [userData])
  console.log('ERROR', error)
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

  const handleOnCancelEditing = () => {
    setIsEditing(false)
    resetTemporaryUserData()
  }

  const handleOnSubmitEditing = () => {
    if (temporaryUserData) {
      updateUserData(temporaryUserData).then(() => setIsEditing(false))
    } else {
      setIsEditing(false)
    }
  }

  // TODO: redirect to change password
  return (
    <section className="flex flex-col gap-2 xs:gap-0 h-full xs:bg-white">
      <UserProfileDetail
        userData={userData}
        temporaryUserData={temporaryUserData}
        isEditing={isEditing}
        onChangeIsEditing={setIsEditing}
        onChangeTemporary={setTemporaryUserData}
        onCancelEditing={handleOnCancelEditing}
        onSubmitEditing={handleOnSubmitEditing}
      />
      <UserProfilePassword />
      <UserProfileConsents allConsents={allConsents} onChange={setAllConsents} />
    </section>
  )
}

export default UserProfileView

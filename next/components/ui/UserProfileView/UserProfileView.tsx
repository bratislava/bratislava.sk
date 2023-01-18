import UserProfileConsents from '@bratislava/ui-bratislava/UserProfileConsents/UserProfileConsents'
import UserProfilePassword from '@bratislava/ui-bratislava/UserProfilePassword/UserProfilePassword'
import useAccount from '@utils/useAccount'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const UserProfileView = () => {
  const { t } = useTranslation('account')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  // TODO: handle change of consents
  return (
    <section className="flex flex-col gap-2 xs:gap-0 h-full">
      <div className="bg-white">Kravina</div>
      <UserProfilePassword />
      <UserProfileConsents />
    </section>
  )
}

export default UserProfileView

import UserProfileConsents from '@bratislava/ui-bratislava/UserProfileConsents/UserProfileConsents'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

const UserProfileView = () => {
  const { t } = useTranslation('account')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <section className="flex flex-col gap-2 xs:gap-0 h-full">
      <div className="bg-white">Kravina</div>
      <div className="bg-white">kravina</div>
      <UserProfileConsents />
    </section>
  )
}

export default UserProfileView

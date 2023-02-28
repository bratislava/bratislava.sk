import UserProfileConsents, {
  Consent,
} from '@bratislava/ui-bratislava/UserProfile/UserProfileConsents'
import UserProfileDetail from '@bratislava/ui-bratislava/UserProfile/UserProfileDetail'
import UserProfilePassword from '@bratislava/ui-bratislava/UserProfile/UserProfilePassword'
import useAccount from '@utils/useAccount'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import AccountMarkdown from '../../forms/segments/AccountMarkdown/AccountMarkdown'
import MessageModal from '../../forms/widget-components/Modals/MessageModal'

const UserProfileView = () => {
  const { t } = useTranslation('account')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isAlertOpened, setIsAlertOpened] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [isEmailModalOpened, setIsEmailModalOpened] = useState<boolean>(false)
  const {
    userData,
    updateUserData,
    temporaryUserData,
    setTemporaryUserData,
    resetTemporaryUserData,
    error,
  } = useAccount()

  useEffect(() => {
    setAlertType(error ? 'error' : 'success')
  }, [error])

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
      updateUserData(temporaryUserData).then(() => {
        setIsEditing(false)
        setIsAlertOpened(true)
        setTimeout(() => setIsAlertOpened(false), 3000)
      })
    } else {
      setIsEditing(false)
      setIsAlertOpened(true)
      setTimeout(() => setIsAlertOpened(false), 3000)
    }
  }

  // TODO: redirect to change password
  return (
    <section className="flex flex-col gap-2 sm:gap-0 h-full sm:bg-white">
      <UserProfileDetail
        userData={userData}
        temporaryUserData={temporaryUserData}
        isEditing={isEditing}
        isAlertOpened={isAlertOpened}
        alertType={alertType}
        onChangeIsEditing={setIsEditing}
        onChangeTemporary={setTemporaryUserData}
        onCancelEditing={handleOnCancelEditing}
        onSubmitEditing={handleOnSubmitEditing}
        onOpenEmailModal={() => setIsEmailModalOpened(true)}
      />
      <UserProfilePassword />
      <UserProfileConsents allConsents={allConsents} onChange={setAllConsents} />
      <MessageModal
        show={isEmailModalOpened}
        excludeButtons
        className="w-[700px] m-5"
        type="warning"
        cancelHandler={() => {
          setIsEmailModalOpened(false)
        }}
        submitHandler={() => {
          setIsEmailModalOpened(false)
        }}
        title={t('profile_detail.modal_title')}
      >
        <AccountMarkdown content={t('profile_detail.modal_message')} variant="sm" />
        <p className="mt-6">{t('profile_detail.modal_thanks')}</p>
      </MessageModal>
    </section>
  )
}

export default UserProfileView

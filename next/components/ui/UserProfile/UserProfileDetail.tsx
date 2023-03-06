import UserProfileDetailEdit from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailEdit'
import UserProfileDetailsButtons from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailsButtons'
import UserProfileDetailView from '@bratislava/ui-bratislava/UserProfile/UserProfileDetailView'
import UserProfilePhoto from '@bratislava/ui-bratislava/UserProfile/UserProfilePhoto'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfile/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfile/UserProfileSectionHeader'
import { UserData } from '@utils/useAccount'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { MutableRefObject, useId, useRef } from 'react'

import Alert from '../../forms/info-components/Alert'

interface UserProfileDetailProps {
  userData?: UserData | null
  isEditing?: boolean
  alertType: 'success' | 'error'
  isAlertOpened: boolean
  onChangeIsEditing: (isEditing: boolean) => void
  onCancelEditing: () => void
  onSubmit: (newUseData: UserData) => void
  onOpenEmailModal: () => void
}

const UserProfileDetails = (props: UserProfileDetailProps) => {
  const {
    userData,
    isEditing,
    isAlertOpened,
    alertType,
    onChangeIsEditing,
    onCancelEditing,
    onSubmit,
    onOpenEmailModal,
  } = props
  const { t } = useTranslation('account')
  const formId = `form-${useId()}`

  return (
    <div className={cx('flex flex-col', 'sm:static sm:z-0', { 'fixed inset-0 z-50': isEditing })}>
      <UserProfileSection>
        <UserProfileSectionHeader
          title={t('profile_detail.title')}
          text={t('profile_detail.text')}
          isEditing={isEditing}
          underline
        >
          <UserProfileDetailsButtons
            formId={formId}
            isEditing={isEditing}
            onChangeIsEditing={onChangeIsEditing}
            onCancelEditing={onCancelEditing}
          />
        </UserProfileSectionHeader>
        <div className="flex flex-col">
          {isAlertOpened && (
            <div className="flex flex-row p-2">
              <Alert
                className="max-w-none grow"
                type={alertType}
                message={t(`profile_detail.${alertType}_alert`)}
              />
            </div>
          )}
          <div
            className={cx('flex p-4 flex-col gap-8', 'sm:p-8 sm:flex-row sm:gap-16 sm:flex-wrap')}
          >
            <UserProfilePhoto userData={userData ?? {}} />
            {isEditing ? (
              <UserProfileDetailEdit
                formId={formId}
                userData={userData ?? {}}
                onOpenEmailModal={onOpenEmailModal}
                onSubmit={onSubmit}
              />
            ) : (
              <UserProfileDetailView userData={userData ?? {}} />
            )}
          </div>
        </div>
      </UserProfileSection>
    </div>
  )
}

export default UserProfileDetails

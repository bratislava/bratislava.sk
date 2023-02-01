import LockIcon from '@assets/images/forms/lock-white.svg'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfile/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfile/UserProfileSectionHeader'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Button from '../../forms/simple-components/Button'

const UserProfilePassword = () => {
  const { t } = useTranslation('account')
  const { push } = useRouter()
  return (
    <UserProfileSection>
      <UserProfileSectionHeader
        title={t('password_change.title')}
        text={t('password_change.text')}
        isMobileColumn
      >
        <Button
          variant="black"
          startIcon={<LockIcon />}
          size="sm"
          text={t('password_change.button')}
          onPress={() => (window.location.href = '/password-change')}
        />
      </UserProfileSectionHeader>
    </UserProfileSection>
  )
}

export default UserProfilePassword

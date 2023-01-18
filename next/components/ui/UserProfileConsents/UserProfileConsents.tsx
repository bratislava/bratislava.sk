import UserConsent from '@bratislava/ui-bratislava/UserConsent/UserConsent'
import UserProfileSection from '@bratislava/ui-bratislava/UserProfileSection/UserProfileSection'
import UserProfileSectionHeader from '@bratislava/ui-bratislava/UserProfileSectionHeader/UserProfileSectionHeader'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

export interface Consent {
  title: string
  text: string
  isDisabled: boolean
}

const UserProfileConsents = () => {
  const { t } = useTranslation('account')

  const allConsents = [
    {
      title: t('consents.personal_data.title'),
      text: t('consents.personal_data.text'),
      isDisabled: true,
    },
    {
      title: t('consents.receive_information.title'),
      text: t('consents.receive_information.text'),
      isDisabled: false,
    },
  ]

  return (
    <UserProfileSection>
      <UserProfileSectionHeader title={t('consents.title')} text={t('consents.text')} />
      {/* <div className={cx('w-full rounded-b-lg border-gray-200')}> */}
      {/*  {allConsents.map((consent: Consent, key: number) => ( */}
      {/*    <UserConsent */}
      {/*      key={key} */}
      {/*      consent={consent} */}
      {/*      isLast={key === allConsents.length - 1} */}
      {/*      onChange={(isSelected) => console.log(key, ':', isSelected)} */}
      {/*    /> */}
      {/*  ))} */}
      {/* </div> */}
    </UserProfileSection>
  )
}

export default UserProfileConsents

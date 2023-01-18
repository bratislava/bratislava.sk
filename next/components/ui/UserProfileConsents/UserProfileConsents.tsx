import UserConsent from '@bratislava/ui-bratislava/UserConsent/UserConsent'
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
    <div className={cx('bg-white flex flex-col items-center', 'xs:pb-8 xs:pt-3 xs:px-8')}>
      <div
        className={cx(
          'w-full rounded-t-lg border-b-2 border-gray-200 p-4',
          'xs:border-2 xs:max-w-4xl xs:px-8 xs:py-6',
        )}
      >
        <h5 className={cx('text-h5-bold', 'xs:text-h4-bold')}>{t('consents.title')}</h5>
        <p className="text-p2-normal">{t('consents.text')}</p>
      </div>
      <div
        className={cx(
          'w-full rounded-b-lg border-gray-200 px-4',
          'xs:border-2 xs:border-t-0 xs:max-w-4xl xs:px-8',
        )}
      >
        {allConsents.map((consent: Consent, key: number) => (
          <UserConsent
            key={key}
            consent={consent}
            isLast={key === allConsents.length - 1}
            onChange={(isSelected) => console.log(key, ':', isSelected)}
          />
        ))}
      </div>
    </div>
  )
}

export default UserProfileConsents

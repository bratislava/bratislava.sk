import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import { useTranslation } from 'next-i18next'

const IntroSection = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_intro')} />
      <div>IntroSection</div>
    </div>
  )
}

export default IntroSection

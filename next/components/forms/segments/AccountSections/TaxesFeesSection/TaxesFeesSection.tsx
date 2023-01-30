import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import { useTranslation } from 'next-i18next'

const TaxesFeesSection = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_payment')} />
      <div>TaxesFeesSection</div>
    </div>
  )
}

export default TaxesFeesSection

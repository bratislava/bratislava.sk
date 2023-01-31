import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import { useTranslation } from 'next-i18next'

const MunicipalServicesSection = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_services')} />
      <div>MunicipalServicesSection</div>
    </div>
  )
}

export default MunicipalServicesSection

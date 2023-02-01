import TaxFeeSectionHeader from 'components/forms/segments/AccountSectionHeader/TaxFeeSectionHeader'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import ContactInformationSection from './ContactInformation'

type TaxAndFeeMainContentBase = {
  children: ReactNode
}

const TaxAndFeeMainContent = ({ children }: TaxAndFeeMainContentBase) => {
  return (
    <div className="flex flex-col items-center sm:gap-12 gap-6 sm:px-28 p-4 sm:py-12">
      {children}
    </div>
  )
}
const TaxFeeSection = (props: any) => {
  const { t } = useTranslation('account')

  return (
    <div className="flex flex-col">
      <TaxFeeSectionHeader title="" />
      <TaxAndFeeMainContent>
        <ContactInformationSection />
      </TaxAndFeeMainContent>
    </div>
  )
}

export default TaxFeeSection

import TaxFeeSectionHeader from 'components/forms/segments/AccountSectionHeader/TaxFeeSectionHeader'
import { ReactNode } from 'react'

import ContactInformationSection from './ContactInformation'
import PaymentData from './PaymentData'
import TaxDetails from './TaxDetails'
import TaxFooter from './TaxFooter'

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
  return (
    <div className="flex flex-col">
      <TaxFeeSectionHeader title="" />
      <TaxAndFeeMainContent>
        <ContactInformationSection />
        <TaxDetails />
        <PaymentData />
        <TaxFooter />
      </TaxAndFeeMainContent>
    </div>
  )
}

export default TaxFeeSection

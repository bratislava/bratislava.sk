import TaxFeeSectionHeader from 'components/forms/segments/AccountSectionHeader/TaxFeeSectionHeader'
import { ReactNode } from 'react'

import ContactInformationSection from './ContactInformation'
import TaxDetails from './TaxDetails'

type TaxAndFeeMainContentBase = {
  children: ReactNode
}

const TaxAndFeeMainContent = ({ children }: TaxAndFeeMainContentBase) => {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg m-auto gap-12 py-12">
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
      </TaxAndFeeMainContent>
    </div>
  )
}

export default TaxFeeSection

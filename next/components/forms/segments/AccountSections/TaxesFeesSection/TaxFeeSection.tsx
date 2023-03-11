import cx from 'classnames'
import TaxFeeSectionHeader from 'components/forms/segments/AccountSectionHeader/TaxFeeSectionHeader'
import { ReactNode, useState } from 'react'

import ContactInformationSection from './ContactInformation'
import PaymentData from './PaymentData'
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
  const [who, setWho] = useState<'splatkar' | 'not_splatkar'>('splatkar')

  // Temporary switcher for presentation
  const switcher = (): ReactNode => {
    const array: { id: 'splatkar' | 'not_splatkar'; title: string }[] = [
      {
        id: 'splatkar',
        title: 'Splátkar',
      },
      {
        id: 'not_splatkar',
        title: 'Nesplátkar',
      },
    ]

    return (
      <div className="flex flex-col w-full max-w-screen-lg m-auto mt-8 px-4 lg:px-0 mb-10">
        <span className="text-p2-semibold mb-2">Temporary switcher</span>
        <div className="flex">
          {array.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setWho(item.id)}
              className={cx('w-max h-6 flex justify-center items-center px-4 py-4 cursor-pointer', {
                'bg-gray-200': who !== item.id,
                'bg-gray-700 text-gray-100': who === item.id,
              })}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <TaxFeeSectionHeader who={who} title="" />
      <TaxAndFeeMainContent>
        <ContactInformationSection who={who} />
        <TaxDetails who={who} />
        <PaymentData who={who} />
      </TaxAndFeeMainContent>
      {switcher()}
    </div>
  )
}

export default TaxFeeSection

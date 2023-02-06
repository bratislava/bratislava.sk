import cx from 'classnames'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import TaxesFeesCard from 'components/forms/segments/AccountSections/TaxesFeesSection/TaxesFeesCard'
import TaxesFeesErrorCard from 'components/forms/segments/AccountSections/TaxesFeesSection/TaxesFeesErrorCard'
import TaxesFeesWaitingCard from 'components/forms/segments/AccountSections/TaxesFeesSection/TaxesFeesWaitingCard'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'

export type TaxesCardBase = {
  title: string
  yearPay: number
  createDate: string
  currentPaid: number
  finishPrice: number
  paidDate?: string
  status: 'negative' | 'warning' | 'success'
}

const cards: TaxesCardBase[] = [
  {
    title: 'Daň z danoveho uradu',
    yearPay: 2023,
    createDate: '21. april 2023',
    currentPaid: 0,
    finishPrice: 58,
    status: 'negative',
    paidDate: '21. apríl 2023',
  },
  {
    title: 'Daň z nehnuteľností',
    yearPay: 2023,
    createDate: '18. april 2023',
    currentPaid: 19.33,
    finishPrice: 58,
    status: 'warning',
    paidDate: '18. apríl 2023',
  },
  {
    title: 'Daň za zivnost',
    yearPay: 2023,
    createDate: '16. april 2023',
    currentPaid: 0,
    finishPrice: 58,
    status: 'success',
    paidDate: '16. apríl 2023',
  },
]

const TaxesFeesSection = () => {
  const [isOn, setIsOn] = useState<'default' | 'waiting' | 'error'>('default')
  const { t } = useTranslation('account')

  // Temporary switcher for presentation
  const switcher = (): ReactNode => {
    const array: { id: 'default' | 'waiting' | 'error'; title: string }[] = [
      {
        id: 'default',
        title: 'Default',
      },
      {
        id: 'waiting',
        title: 'Waiting',
      },
      {
        id: 'error',
        title: 'Error',
      },
    ]

    return (
      <div className="flex flex-col w-full max-w-screen-1.5lg m-auto mt-8 px-4 lg:px-0">
        <span className="text-p2-semibold mb-2">Temporary switcher</span>
        <div className="flex">
          {array.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setIsOn(item.id)}
              className={cx('w-max h-6 flex justify-center items-center px-4 py-4 cursor-pointer', {
                'bg-gray-200': isOn !== item.id,
                'bg-gray-700 text-gray-100': isOn === item.id,
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
      <AccountSectionHeader title={t('account_section_payment')} />
      {isOn === 'default' && (
        <div className="w-full max-w-screen-1.5lg m-auto">
          <ul className="my-2 lg:my-8 px-4 sm:px-6 1.5lg:px-0">
            {cards.map((card, i) => (
              <li className="mb-2 lg:mb-6" key={i}>
                <TaxesFeesCard
                  title={card.title}
                  yearPay={card.yearPay}
                  createDate={card.createDate}
                  currentPaid={card.currentPaid}
                  finishPrice={card.finishPrice}
                  status={card.status}
                  paidDate={card.paidDate}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOn === 'waiting' && <TaxesFeesWaitingCard />}
      {isOn === 'error' && <TaxesFeesErrorCard />}
      {switcher()}
    </div>
  )
}

export default TaxesFeesSection

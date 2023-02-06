import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import TaxesFeesCard from 'components/forms/segments/AccountSections/TaxesFeesSection/TaxesFeesCard'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_payment')} />
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
    </div>
  )
}

export default TaxesFeesSection

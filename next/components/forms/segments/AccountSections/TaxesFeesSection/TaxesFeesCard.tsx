import ChevronRightIcon from '@assets/images/forms/chevron-right.svg'
import ExclamationIcon from '@assets/images/forms/exclamation-icon.svg'
import SuccessIcon from '@assets/images/forms/success.svg'
import TimeIcon from '@assets/images/forms/warning-time-icon.svg'
import cx from 'classnames'
import { TaxesCardBase } from 'components/forms/segments/AccountSections/TaxesFeesSection/TaxesFeesSection'
import Link from 'next/link'
import { ReactNode } from 'react'

const TaxesFeesCard = (props: TaxesCardBase) => {
  const { title, yearPay, createDate, currentPaid, finishPrice, paidDate = '', status } = props

  const statusHandler = (): ReactNode => {
    const statusStyle: string = cx('text-16-semibold w-max ml-2', {
      'text-negative-700': status === 'negative',
      'text-warning-700': status === 'warning',
      'text-success-700': status === 'success',
    })
    switch (status) {
      case 'negative':
        return (
          <>
            <ExclamationIcon />
            <span className={statusStyle}>Neuhradená</span>
          </>
        )
      case 'warning':
        return (
          <>
            <TimeIcon />
            <span className={statusStyle}>Čiastočne uhradená</span>
          </>
        )
      case 'success':
        return (
          <>
            <SuccessIcon />
            <span className={statusStyle}>Uhradená</span>
          </>
        )
      default:
        break
    }
  }

  const priceFormat = (price: number): string => {
    return Number.isInteger(price) ? `${price},00€` : `${price}€`.replace('.', ',')
  }

  return (
    <div className="rounded-lg bg-white w-full h-[104px] flex items-center justify-between border-2 border-gray-200">
      <div className="flex items-center justify-between w-full">
        <div className="w-full flex flex-col pl-6">
          <span className="text-20-semibold leading-7 mb-1">{title}</span>
          <span className="text-p3">{`za rok ${yearPay}`}</span>
        </div>
        <div className="w-full justify-end flex items-center">
          <div className="flex flex-col px-10 w-full">
            <span className="text-16-semibold mb-1">Vytvorená</span>
            <span className="w-max">{createDate}</span>
          </div>
          <div className="flex flex-col px-10 border-x-2">
            <span className="text-16-semibold mb-1">Suma</span>
            {status === 'warning' && currentPaid ? (
              <span className="w-max flex items-center">{`${priceFormat(
                currentPaid,
              )} / ${priceFormat(finishPrice)}`}</span>
            ) : (
              <span>{priceFormat(finishPrice)}</span>
            )}
          </div>
          <div className="flex flex-col items-center px-10">
            <div className="flex">{statusHandler()}</div>
            {status !== 'negative' && paidDate && <span className="">{paidDate}</span>}
          </div>
        </div>
      </div>
      <div className="cursor-pointer w-16 min-w-[64px] h-full  border-l-2">
        <Link href="/account/taxes-and-fees#">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="w-full h-full items-center flex justify-center">
            <ChevronRightIcon />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default TaxesFeesCard

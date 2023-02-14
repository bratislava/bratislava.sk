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
    const statusStyle: string = cx('text-p3-semibold lg:text-16-semibold w-max ml-0 lg:ml-2', {
      'text-negative-700': status === 'negative',
      'text-warning-700': status === 'warning',
      'text-success-700': status === 'success',
    })
    const statusNode = (icon: ReactNode, statusTitle: string): ReactNode => {
      return (
        <>
          <span className="h-6 w-6 hidden lg:flex justify-center items-center">{icon}</span>
          <span className={statusStyle}>{statusTitle}</span>
        </>
      )
    }

    switch (status) {
      case 'negative':
        return statusNode(<ExclamationIcon />, 'Neuhradená')
      case 'warning':
        return statusNode(<TimeIcon />, 'Čiastočne uhradená')
      case 'success':
        return statusNode(<SuccessIcon width={18} height={13} viewBox="0 0 24 19" />, 'Uhradená')

      default:
        break
    }
  }

  const priceFormat = (price: number): string => {
    return Number.isInteger(price) ? `${price},00€` : `${price}€`.replace('.', ',')
  }

  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-card"
        className="rounded-lg bg-white w-full h-[104px] lg:flex hidden items-center justify-between border-2 border-gray-200"
      >
        <div className="flex items-center justify-between w-full">
          <div className="w-full flex flex-col pl-6">
            <span className="text-20-semibold mb-1">{title}</span>
            <span className="text-p3">{`za rok ${yearPay}`}</span>
          </div>
          <div className="w-full justify-end flex items-center">
            <div className="flex flex-col px-10">
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
        <div className="cursor-pointer w-16 min-w-[64px] h-full border-l-2">
          <Link href="/account/taxes-and-fees/1">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="w-full h-full items-center flex justify-center">
              <ChevronRightIcon />
            </a>
          </Link>
        </div>
      </div>
      {/* Mobile */}
      <div
        id="mobile-card"
        className="bg-white w-full h-24 flex lg:hidden items-center justify-between border-b-2 border-gray-200"
      >
        <Link href="/account/taxes-and-fees/1">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="w-full h-full items-center flex justify-center">
            <div className="w-full flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-p2-semibold leading-5 mb-1">{`${title} za rok ${yearPay}`}</span>
                <div className="flex items-center flex-wrap">
                  {status === 'warning' && currentPaid ? (
                    <span className="text-p3 w-max flex items-center">{`${priceFormat(
                      currentPaid,
                    )} / ${priceFormat(finishPrice)}`}</span>
                  ) : (
                    <span className="text-p3">{priceFormat(finishPrice)}</span>
                  )}
                  <div className="flex items-center">
                    <span className="rounded-full w-1 h-1 bg-gray-700 mx-3" />
                    <div className="flex">{statusHandler()}</div>
                  </div>
                </div>
              </div>
              <span className="h-5 w-5 flex justify-center items-center">
                <ChevronRightIcon />
              </span>
            </div>
          </a>
        </Link>
      </div>
    </>
  )
}

export default TaxesFeesCard

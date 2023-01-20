import ChevronRightIcon from '@assets/images/forms/chevron-right.svg'
import ExclamationIcon from '@assets/images/forms/exclamation-icon.svg'
import SuccessIcon from '@assets/images/forms/success.svg'
import TimeIcon from '@assets/images/forms/warning-time-icon.svg'
import { ReactNode } from 'react'

type TaxesCardBase = {
  title: string
  yearPay: number
  createDate: string
  currentPaid: number
  finishPrice: number
  paidDate?: string
  status: 'negative' | 'warning' | 'success'
}

const TaxesCard = (props: TaxesCardBase) => {
  const { title, yearPay, createDate, currentPaid, finishPrice, paidDate = '', status } = props

  const statusHandler = (): ReactNode => {
    switch (status) {
      case 'negative':
        return (
          <>
            <ExclamationIcon />
            <span className="text-16-semibold ml-2 text-negative-700">Neuhradená</span>
          </>
        )
      case 'warning':
        return (
          <>
            <TimeIcon />
            <span className="text-16-semibold ml-2 text-warning-700">Čiastočne uhradená</span>
          </>
        )
      case 'success':
        return (
          <>
            <SuccessIcon />
            <span className="text-16-semibold ml-2 text-success-700">Uhradená</span>
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
      <div className="max-w-xl w-full flex justify-between px-6">
        <div className="flex flex-col">
          <div className="text-20-semibold leading-7 mb-1">{title}</div>
          <div className="text-p3">{`za rok ${yearPay}`}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-16-semibold mb-1">Vytvorená</div>
          <div className="">{createDate}</div>
        </div>
      </div>
      <div className="flex flex-col px-10 border-x-2">
        <div className="text-16-semibold mb-1">Suma</div>
        {status === 'warning' && currentPaid ? (
          <div className="w-max flex items-center">{`${priceFormat(currentPaid)} / ${priceFormat(
            finishPrice,
          )}`}</div>
        ) : (
          <div>{priceFormat(finishPrice)}</div>
        )}
      </div>
      <div className="flex flex-col items-center min-w-[230px]">
        <div className="flex">{statusHandler()}</div>
        {status !== 'negative' && paidDate && <div className="">{paidDate}</div>}
      </div>
      <div className="cursor-pointer w-32 h-full items-center flex justify-center border-l-2">
        <ChevronRightIcon />
      </div>
    </div>
  )
}

export default TaxesCard

import FileDownload from '@assets/images/account/file_download.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import ChevronLeft from '@assets/images/chevron-left-2.svg'
import ExclamationIcon from '@assets/images/forms/exclamation-icon.svg'
import SuccessIcon from '@assets/images/forms/success.svg'
import TimeIcon from '@assets/images/forms/warning-time-icon.svg'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import Button from '../../simple-components/Button'

type AccountSectionHeaderBase = {
  title: string
  status?: string
  who?: string
}

const statusHandler = (status: 'negative' | 'warning' | 'success'): ReactNode => {
  const statusStyle: string = cx('lg:text-p2-semibold text-p3-semibold', {
    'text-negative-700': status === 'negative',
    'text-warning-700': status === 'warning',
    'text-success-700': status === 'success',
  })
  const statusNode = (icon: ReactNode, statusTitle: string): ReactNode => {
    return (
      <>
        <span className="h-6 w-6 flex justify-center items-center">{icon}</span>
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
      return statusNode(<SuccessIcon width={18} height={24} viewBox="0 0 24 18" />, 'Uhradená')

    default:
      return null
  }
}

const TaxFeeSectionHeader = (props: AccountSectionHeaderBase) => {
  const { t } = useTranslation('account')
  const router = useRouter()
  return (
    <div className="lg:px-0 bg-gray-50 h-full mt-16 lg:mt-28 px-4">
      <div className="flex flex-col py-6 gap-4 max-w-screen-lg m-auto">
        <div className="flex items-center gap-0.5 cursor-pointer">
          <div className="w-5 h-5 flex justify-center items-center">
            <ChevronLeft />
          </div>
          <button
            type="button"
            className="text-p3-medium underline-offset-2 underline"
            onClick={() => router.push('/account/taxes-and-fees')}
          >
            {t('back_to_list')}
          </button>
        </div>
        <div className="flex flex-col items-start gap-2 w-full h-full">
          <div className="flex flex-col items-start gap-4 h-full w-full">
            <div className="flex flex-row items-center gap-4 w-full">
              <div className="text-h1 grow">Daň z nehnuteľností za rok 2023</div>

              <Button
                startIcon={<PaymentIcon className="w-5 h-5" />}
                variant="black"
                text={t('pay_tax')}
                size="sm"
                className="md:block hidden"
              />
              <Button
                startIcon={<FileDownload />}
                variant="black-outline"
                text={t('download_pdf')}
                size="sm"
                className="md:block hidden"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start md:gap-4 gap-1">
              <div className="flex gap-2">
                <div className="lg:text-p2-semibold text-p3-semibold">{t('tax_created')}</div>
                <div className="lg:text-p2 text-p3">20. apríla 2023</div>
              </div>
              <div className="w-1.5 h-1.5 bg-black rounded-full md:block hidden" />
              <div className="lg:text-p2-bold text-p3">
                {props.who === 'splatkar' ? '29,66€ / 89,00 €' : '58,00 €'}
              </div>
              <div className="w-1.5 h-1.5 bg-black rounded-full md:block hidden" />
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cx('flex items-center gap-2', {
                      'gap-1': props?.status === 'unpaid',
                    })}
                  >
                    {props.who === 'splatkar' ? statusHandler('warning') : statusHandler('success')}
                  </div>
                  <div className="lg:text-p2 text-p3">24. apríla 2023</div>
                </div>
              </div>
            </div>

            {/* for mobile version */}
            <div className="w-full md:hidden block">
              <div className="flex flex-col gap-3">
                <Button
                  startIcon={<PaymentIcon className="w-5 h-5" />}
                  variant="black"
                  text={t('pay_tax')}
                  size="sm"
                  className="min-w-full"
                />
                <Button
                  startIcon={<FileDownload />}
                  variant="black-outline"
                  text={t('download_pdf')}
                  size="sm"
                  className="min-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxFeeSectionHeader

import FileDownload from '@assets/images/account/file_download.svg'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Button from '../../../simple-components/Button'
import ClipboardCopy from '../../../simple-components/ClipboardCopy'
import TaxFooter from './TaxFooter'

const PaymentData = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col items-start lg:gap-6 gap-3 w-full lg:px-0 px-4">
      <div className="text-h3">{t('payment_data')}</div>
      <div className="flex-col-reverse flex md:flex-row lg:gap-8 gap-6 w-full">
        <div className="flex-col flex md:w-[488px] w-full sm:px-6 sm:py-5 p-0 gap-5 sm:border-2 border-0 border-solid border-gray-200 rounded-lg">
          <div className="text-p2">{t('use_one_of_ibans_to_pay')}</div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-1 isolate self-stretch">
              <div className="text-p2">{t('bank_info.slovak_sporitelna')}</div>
              <div className="flex w-full">
                <div className="text-16-semibold grow">{t('bank_info.slovak_sporitelna_iban')}</div>
                <div className="w-6 h-6 cursor-pointer sm:block hidden">
                  <ClipboardCopy copyText={t('bank_info.slovak_sporitelna_iban')} />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 sm:block hidden" />
            <div className="flex flex-col items-start gap-1 isolate self-stretch">
              <div className="text-p2">{t('bank_info.csob')}</div>
              <div className="flex w-full">
                <div className="text-16-semibold grow">{t('bank_info.csob_iban')}</div>
                <div className="w-6 h-6 cursor-pointer sm:block hidden">
                  <ClipboardCopy copyText={t('bank_info.csob_iban')} />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 sm:block hidden" />
            <div className="flex flex-col items-start gap-2">
              <div className="flex lg:flex-row flex-col items-start lg:gap-6 self-stretch">
                <div className="text-16-semibold">{t('constant_symbol')}</div>
                <div className="text-16">{t('constant_symbol_number')}</div>
              </div>
              <div className="flex lg:flex-row flex-col items-start lg:gap-6 self-stretch">
                <div className="text-16-semibold">{t('variable_symbol')}</div>
                <div className="text-16">{t('variable_symbol_number')}</div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 sm:block hidden" />
            <div className="flex flex-col items-start w-full gap-2">
              <div className="text-16-semibold">{t('tax_due')}</div>
              <div className="text-16">
                <div className="inline-block">{t('tax_payable_within')}</div>{' '}
                <div className="text-16-semibold inline">{t('validity_decision')}</div>
              </div>
            </div>
          </div>
          <div className="sm:hidden block h-0.5 w-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4 grow">
          <div className="lg:items-center items-start flex lg:flex-row flex-col lg:px-6 lg:py-8 p-4 gap-6 bg-main-200 rounded-lg w-full">
            <div className="flex-col flex items-start gap-2 grow">
              <div className="text-h4">{t('card_payment')}</div>
              <div className="text-16">{t('you_will_be_redirected_to_the_payment_gateway')}</div>
            </div>
            {/* Desktop 'To pay' button */}
            <Button
              variant="category"
              size="lg"
              text={t('pay_tax')}
              className="lg:block hidden min-w-max"
            />

            {/* Mobile 'To pay' button */}
            <Button
              variant="category"
              size="sm"
              text={t('pay_tax')}
              className="lg:hidden block min-w-full"
            />
          </div>
          <div className="flex lg:flex-row flex-col lg:p-6 p-4 gap-4 border-2 border-solid border-gray-200 rounded-lg self-stretch grow">
            <div className="flex flex-col w-full justify-between items-start gap-2 grow self-stretch">
              <div className="flex flex-col items-start gap-2">
                <div className="text-h4">{t('qr_code')}</div>
                <div className="text-16">{t('use_your_banking_app_to_load')}</div>
              </div>
              {/* Desktop 'download' button */}
              <Button
                startIcon={<FileDownload />}
                variant="black-outline"
                text={t('download_image')}
                size="sm"
                className="lg:block hidden"
              />
            </div>
            <div className="flex sm:max-w-[256px] sm:max-h-[256px] max-w-full max-h-max items-center justify-center bg-[red] aspect-square">
              qr code
            </div>

            {/* Mobile 'download' button */}
            <Button
              startIcon={<FileDownload />}
              variant="black-outline"
              text={t('download_image')}
              size="sm"
              className="lg:hidden block min-w-full"
            />
          </div>
        </div>
      </div>
      <TaxFooter />
    </div>
  )
}

export default PaymentData

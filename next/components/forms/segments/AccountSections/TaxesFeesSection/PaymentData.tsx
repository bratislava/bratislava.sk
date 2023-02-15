import FileDownload from '@assets/images/account/file_download.svg'
import ContentCopy from '@assets/images/content_copy.svg'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Button from '../../../simple-components/Button'

const PaymentData = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col items-start lg:gap-6 gap-3 w-full">
      <div className="text-h3">{t('payment_data')}</div>
      <div className="flex-col-reverse flex lg:flex-row gap-8 w-full">
        <div className="flex-col flex  px-6 py-5 gap-5 border-2 border-solid border-gray-200 rounded-lg">
          <div className="text-p2">{t('use_one_of_ibans_to_pay')}</div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-1 isolate self-stretch">
              <div className="text-p2">Slovenská sporiteľňa, a.s.</div>
              <div className="flex w-full">
                <div className="text-16-semibold grow">SK75 0900 0000 0053 5353 5353</div>
                <div className="w-6 h-6 cursor-pointer lg:block hidden">
                  <ContentCopy />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 lg:block hidden" />
            <div className="flex flex-col items-start gap-1 isolate self-stretch">
              <div className="text-p2">ČSOB, a.s.</div>
              <div className="flex w-full">
                <div className="text-16-semibold grow">SK31 7500 0000 0000 2574 7653</div>
                <div className="w-6 h-6 cursor-pointer lg:block hidden">
                  <ContentCopy />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 lg:block hidden" />
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-start gap-6 self-stretch">
                <div className="text-16-semibold">{t('constant_symbol')}</div>
                <div className="text-16">8147</div>
              </div>
              <div className="flex items-start gap-6 self-stretch">
                <div className="text-16-semibold">{t('variable_symbol')}</div>
                <div className="text-16">312006100</div>
              </div>
            </div>
            <div className="bg-gray-200 w-full h-0.5 lg:block hidden" />
            <div className="flex flex-col items-start gap-2">
              <div className="text-16-semibold">{t('tax_due')}</div>
              <div className="text-16">
                Daň je splatná v termíne do 15 dní odo dňa právoplatnosti rozhodnutia.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 grow">
          {/* items-center flex px-6 py-8 gap-6 bg-main-200 rounded-lg self-stretch */}
          <div className="lg:items-center items-start flex xl:flex-row flex-col px-6 py-8 gap-6 bg-main-200 rounded-lg w-full">
            <div className="flex-col flex items-start gap-2 grow">
              <div className="text-h4">{t('card_payment')}</div>
              <div className="text-16">{t('you_will_be_redirected_to_the_payment_gateway')}</div>
            </div>
            {/* Desktop 'To pay' button */}
            <Button variant="category" text={t('pay_tax')} className="xl:block hidden min-w-max" />

            {/* Mobile 'To pay' button */}
            <Button variant="category" text={t('pay_tax')} className="xl:hidden block min-w-full" />
          </div>
          <div className="flex xl:flex-row flex-col p-6 gap-12 border-2 border-solid border-gray-200 rounded-lg self-stretch grow">
            <div className="flex flex-col justify-between items-start gap-2 grow">
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
                className="xl:block hidden"
              />
            </div>
            <div className="flex max-w-[256px] max-h-[256px] items-center justify-center bg-[red] aspect-square">
              qr code
            </div>

            {/* Mobile 'download' button */}
            <Button
              startIcon={<FileDownload />}
              variant="black-outline"
              text={t('download_image')}
              size="sm"
              className="xl:hidden block"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentData

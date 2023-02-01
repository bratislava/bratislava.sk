import { useTranslation } from 'next-i18next'
import React from 'react'

import Accordion from '../../../simple-components/Accordion'

const TaxDetails = () => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col items-start sm:gap-6 gap-3 w-full">
      <div className="sm:text-h-lg text-h-base font-semibold">{t('tax_liability_breakdown')}</div>
      <div className="gap-4 flex flex-col w-full">
        <Accordion size="md" title="Daň z pozemkov" secondTitle="0 €" content="Lorem ipsum" />
        <Accordion size="md" title="Daň zo stavby" secondTitle="0 €" content="Lorem ipsum" />
        <Accordion size="md" title="Daň z bytov" secondTitle="58 €" content="Lorem ipsum" />
      </div>
      <div className="rounded-lg flex flex-col items-start px-8 py-6 bg-gray-50 w-full sm:gap-6 gap-4">
        <div className="flex flex-col items-start sm:gap-5 gap-3 w-full">
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="grow sm:text-h-base text-h-sm">Daň z pozemkov</div>
            <div className="sm:text-h-base text-h-sm">0,00 €</div>
          </div>
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="grow sm:text-h-base text-h-sm">Daň zo stavieb</div>
            <div className="sm:text-h-base text-h-sm">0,00 €</div>
          </div>
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="grow sm:text-h-base text-h-sm">Daň z bytov</div>
            <div className="sm:text-h-base text-h-sm">58,00 €</div>
          </div>
        </div>
        <div className="bg-gray-200 h-0.5 w-full" />
        <div className="flex sm:flex-row flex-col sm:gap-6 gap-2 w-full">
          <div className="font-semibold sm:text-h-md text-p-base grow">
            Daň z nehnuteľností celkom
          </div>
          <div className="font-semibold sm:text-h-md text-p-base">58,00 €</div>
        </div>
      </div>
    </div>
  )
}

export default TaxDetails

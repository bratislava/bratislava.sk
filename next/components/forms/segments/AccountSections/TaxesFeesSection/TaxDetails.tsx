import { useTranslation } from 'next-i18next'
import React from 'react'

import AccordionTableContent from '../../../simple-components/AccordionTableContent'

const TaxDetails = () => {
  const { t } = useTranslation('account')

  return (
    <div className="flex flex-col items-start lg:gap-6 gap-3 w-full lg:px-0 px-4">
      <div className="text-h3">{t('tax_liability_breakdown')}</div>
      <div className="gap-4 flex flex-col w-full">
        <AccordionTableContent
          size="md"
          dataType="ground"
          title={t('land_tax')}
          secondTitle="0 €"
          data={[]}
        />
        <AccordionTableContent
          size="md"
          dataType="construction"
          title={t('construction_tax')}
          secondTitle="0 €"
          data={[]}
        />
        <AccordionTableContent
          size="md"
          dataType="apartment"
          title={t('apartments_tax')}
          secondTitle="58 €"
          data={[]}
        />
      </div>
      <div className="rounded-lg flex flex-col items-start lg:px-8 lg:py-6 p-4 bg-gray-50 w-full lg:gap-6 gap-4">
        <div className="flex flex-col items-start lg:gap-5 gap-3 w-full">
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="text-p1 grow">{t('land_tax')}</div>
            <div className="text-p1">0,00 €</div>
          </div>
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="text-p1 grow">{t('tax_constructions')}</div>
            <div className="text-p1">0,00 €</div>
          </div>
          <div className="flex flex-row items-start gap-6 w-full">
            <div className="text-p1 grow">{t('apartments_tax')}</div>
            <div className="text-p1">58,00 €</div>
          </div>
        </div>
        <div className="bg-gray-200 h-0.5 w-full" />
        <div className="flex xs:flex-row flex-col lg:gap-6 gap-2 w-full">
          <div className="text-h4 grow xs:w-min w-full">Daň z nehnuteľností celkom</div>
          <div className="text-h4 w-max">58,00 €</div>
        </div>
      </div>
    </div>
  )
}

export default TaxDetails

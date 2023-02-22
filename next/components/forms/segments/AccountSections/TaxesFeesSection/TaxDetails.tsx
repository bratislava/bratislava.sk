import { useTranslation } from 'next-i18next'
import React from 'react'

import Accordion from '../../../simple-components/Accordion'
import AccordionTableContent from '../../../simple-components/AccordionTableContent'

const TaxDetails = () => {
  const { t } = useTranslation('account')
  const tableContent = `
  | Predmet dane | Základ dane v m<sup>2</sup> | Daň v EUR |
  | -------- | - | - |
  | <div class='h-0 font-semibold'>Byt</div><br/>(§ 14 zákona) | 58,00 |  58,00 |
  | <div class='h-0 font-semibold'>Nebytový priestor</div><br/>(§ 14 zákona) | 0,00 | 0,00 |
  
  <div class='flex mt-3 lg:bg-gray-0 bg-gray-100 lg:p-0 p-4 rounded-lg'>
    <div class='text-h4-bold grow'>Celkom</div>
    <div class='text-h4-bold'>58,00 €</div> 
  </div>
  `

  return (
    <div className="flex flex-col items-start lg:gap-6 gap-3 w-full 1.5lg:px-0 px-4">
      <div className="text-h3">{t('tax_liability_breakdown')}</div>
      <div className="gap-4 flex flex-col w-full">
        <Accordion size="md" title={t('land_tax')} secondTitle="0 €" content="Lorem ipsum" />
        <Accordion
          size="md"
          title={t('construction_tax')}
          secondTitle="0 €"
          content="Lorem ipsum"
        />
        <AccordionTableContent
          size="md"
          title={t('apartments_tax')}
          secondTitle="58 €"
          content={tableContent}
        />
      </div>
      <div className="rounded-lg flex flex-col items-start px-8 py-6 bg-gray-50 w-full lg:gap-6 gap-4">
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
        <div className="flex lg:flex-row flex-col lg:gap-6 gap-2 w-full">
          <div className="text-h4 grow">Daň z nehnuteľností celkom</div>
          <div className="text-h4">58,00 €</div>
        </div>
      </div>
    </div>
  )
}

export default TaxDetails

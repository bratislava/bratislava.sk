import { useTranslation } from 'next-i18next'

import SummaryRow from '../../../steps/Summary/SummaryRow'

const ContactInformationSection = (props: any) => {
  const { t } = useTranslation('account')
  return (
    <div className="flex flex-col items-start sm:gap-8 gap-1 w-full">
      <div className="flex flex-col w-full items-start gap-2">
        <div className="text-h-lg font-semibold">Osobné informácie</div>
        <div className="flex flex-col w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Meno a priezvisko',
              value: 'Michal Mrkvička',
              schemaPath: '',
              isError: false,
            }}
          />
          <SummaryRow
            size="small"
            data={{
              label: 'Adresa trvalého pobytu',
              value: 'Námestie hraničiarov 12/A, 811 01 Bratislava',
              schemaPath: '',
              isError: false,
            }}
          />
          <SummaryRow
            size="small"
            data={{
              label: 'Korešpondenčná adresa',
              value: 'Námestie hraničiarov 12/A, 811 01 Bratislava',
              schemaPath: '',
              isError: false,
            }}
          />
          <SummaryRow
            size="small"
            data={{
              label: 'Osobný identifikátor daňovníka',
              value: '111 222',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-start gap-2">
        <div className="text-h-lg font-semibold">Vybavuje</div>
        <div className="flex flex-col w-full">
          <SummaryRow
            size="small"
            data={{
              label: 'Meno a priezvisko',
              value: 'Meno Správcu/Správkyne',
              schemaPath: '',
              isError: false,
            }}
          />
          <SummaryRow
            size="small"
            data={{
              label: 'Kontakt',
              value: '+421 2/553 559 38, meno.priezvisko@bratislava.sk',
              schemaPath: '',
              isError: false,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactInformationSection

/* eslint-disable react/button-has-type */
import { Accordion as AccordionBa } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

import ChevronDown from '../../../../assets/images/chevron-down.svg'
import ChevronRight from '../../../../assets/images/chevron-right.svg'
import AccordionItem from '../../../atoms/AccordionItem'

// interface IProps {
//   className?: string
// }

const TABS = [
  { key: '0', title: 'Zmeny a doplnky 01' },
  { key: '1', title: 'Zmeny a doplnky 02' },
]

const CONTENT = [
  <div className="space-y-10">
    <div>
      Dokumentácia <b>Územný plán hlavného mesta SR Bratislavy, zmeny a doplnky 02 </b>sa týka vymedzenia funkčných
      plôch, zmien funkčného využitia zo zastaviteľných plôch na plochy zelene, stanovenia kódov miery využitia územia
      pri znížení intenzity využitia, resp. zmien zo stabilizovaného územia na rozvojové plochy, zmien kódov využitia
      rozvojových území, ďalej zmien v riešení dopravného vybavenia, technického vybavenia a súvisiacich zmien vo
      verejnoprospešných stavbách.
    </div>
    <div>
      Zapracované sú tiež legislatívne zmeny v oblasti ochrany pamiatok, ochrany prírody, tvorby krajiny a územného
      systému ekologickej stability (ÚSES), ktoré medzičasom vstúpili do platnosti. Zmeny a doplnky reflektujú kladne
      prerokované podrobnejšie územnoplánovacie podklady a dokumenty, komplexne posúdené z hľadiska urbanistickej
      koncepcie rozvoja mesta a jeho ťažiskových rozvojových smerov.
    </div>
  </div>,

  <div>
    <div>
      Ďalšie úpravy odstraňujú formálne a vecné nedostatky a technické chyby územného plánu, zistené v procese jeho
      uplatňovania v praxi a prinášajú niektoré metodické zmeny dokumentu.
    </div>
    <div>
      Zmeny a doplnky 02 boli schválené uznesením Mestského zastupiteľstva hlavného mesta SR Bratislavy č. 400/2011 dňa
      15. 12. 2011. Záväzná časť bola vyhlásená Všeobecne záväzným nariadením hlavného mesta SR Bratislavy č. 17/2011 zo
      dňa 15. 12. 2011, ktoré nadobudlo účinnosť dňom 01. 02. 2012.
    </div>
  </div>,
]

const Accordion = () => {
  const [activeSection, setActiveSection] = React.useState('0')
  return (
    <AccordionBa
      sectionClassName="px-8 max-w-6xl w-full"
      tabs={TABS.map((tab, index) => ({
        key: index.toString(),
        title: (
          <button
            onClick={() => setActiveSection?.(tab.key)}
            className={cx(
              'flex justify-between w-full items-center py-7 shadow rounded-lg px-10 font-medium text-h2',
              { 'bg-category-100': tab.key === activeSection },
              { 'bg-white': tab.key !== activeSection }
            )}
          >
            <span>{tab.title}</span>
            <span>{tab.key === activeSection ? <ChevronDown /> : <ChevronRight />}</span>
          </button>
        ),
      }))}
      tabsVariant="custom"
      contents={[
        <AccordionItem className="mb-2" leftColumn={CONTENT[0]} rightColumn={CONTENT[1]} />,
        <AccordionItem leftColumn={CONTENT[0]} rightColumn={CONTENT[1]} />,
      ]}
      activeSection={activeSection}
      onSelect={(d) => setActiveSection(d)}
    />
  )
}

export default Accordion

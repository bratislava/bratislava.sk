import { DaneAPoplatky } from '@assets/images'
import Archiv from '@assets/images/archiv.svg'
import Hospodarenie from '@assets/images/hospodarenie.svg'
import Ostatne from '@assets/images/ostatne.svg'
import PomenovanieUlic from '@assets/images/pomenovanieUlic.svg'
import PoriadokACistota from '@assets/images/poriadokACistota.svg'
import SocialnaPomocASkolstvo from '@assets/images/socialnaPomocASkolstvo.svg'
import UzemnePlanovanie from '@assets/images/uzemnePlanovanie.svg'
import { FunctionComponent, SVGProps } from 'react'

interface DocumentListCategorysType {
  key: string
  value: string
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
}

export const findIconByRegulationCategory = (category: string) => {
  const icons = {
    daneAPoplatky: UzemnePlanovanie,
    pomenovanieUlic: UzemnePlanovanie,
    hospodarenie: UzemnePlanovanie,
    uzemnePlanovanie: UzemnePlanovanie,
    poriadokACistota: UzemnePlanovanie,
    socialnaPomocASkolstvo: UzemnePlanovanie,
    ostatne: UzemnePlanovanie,
    archiv: UzemnePlanovanie,
  }

  return icons.uzemnePlanovanie
}

// export const findIconByPageColor = (pageColor: Enum_Pagecategory_Color) => {
//   const icons = {
//     red: { default: PageRedIcon, small: PageRedIconSmall },
//     blue: { default: PageBlueIcon, small: PageBlueIconSmall },
//     green: { default: PageGreenIcon, small: PageGreenIconSmall },
//     yellow: { default: PageYellowIcon, small: PageYellowIconSmall },
//     purple: { default: PagePurpleIcon, small: PagePurpleIconSmall },
//     brown: { default: PageBrownIcon, small: PageBrownIconSmall },
//   }

//   return icons[pageColor] ?? icons.red
// }

const DocumentListCategorys: DocumentListCategorysType[] = [
  {
    key: 'daneAPoplatky',
    value: 'Dane a poplatky',
    icon: DaneAPoplatky,
  },
  {
    key: 'pomenovanieUlic',
    value: 'Pomenovanie ulíc',
    icon: PomenovanieUlic,
  },
  {
    key: 'hospodarenie',
    value: 'Hospodárenie',
    icon: Hospodarenie,
  },
  {
    key: 'uzemnePlanovanie',
    value: 'Územné plánovanie',
    icon: UzemnePlanovanie,
  },
  {
    key: 'poriadokACistota',
    value: 'Poriadok a čistota',
    icon: PoriadokACistota,
  },
  {
    key: 'socialnaPomocASkolstvo',
    value: 'Sociálna pomoc a školstvo',
    icon: SocialnaPomocASkolstvo,
  },
  {
    key: 'ostatne',
    value: 'Ostatné',
    icon: Ostatne,
  },
  {
    key: 'archiv',
    value: 'Archív',
    icon: Archiv,
  },
]

const DocumentListCategorysMap: Map<DocumentListCategorysType['key'], DocumentListCategorysType> =
  new Map()

DocumentListCategorys.forEach((doc) => {
  DocumentListCategorysMap.set(doc.key, doc)
})

export default DocumentListCategorysMap

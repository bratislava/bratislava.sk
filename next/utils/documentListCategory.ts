import DaneAPoplatky from '../components/assets/images/daneAPoplatky.svg';
import PomenovanieUlic from '../components/assets/images/pomenovanieUlic.svg';
import Hospodarenie from '../components/assets/images/hospodarenie.svg';
import UzemnePlanovanie from '../components/assets/images/uzemnePlanovanie.svg';
import PoriadokACistota from '../components/assets/images/poriadokACistota.svg';
import SocialnaPomocASkolstvo from '../components/assets/images/socialnaPomocASkolstvo.svg';
import Ostatne from '../components/assets/images/ostatne.svg';
import Archiv from '../components/assets/images/archiv.svg';

interface DocumentListCategorysType {
  key: string;
  value: string;
  icon: string;
}

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
];

const DocumentListCategorysMap = new Map();

DocumentListCategorys.map((doc) => {
  DocumentListCategorysMap.set(doc.key, doc);
});

export default DocumentListCategorysMap;

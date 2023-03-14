import BasketIcon from '@assets/images/account/municipal-services/basket-icon.svg'
import ChristmasTreeIcon from '@assets/images/account/municipal-services/christmas-tree-icon.svg'
import CityTreeIcon from '@assets/images/account/municipal-services/city-tree-icon.svg'
import ExcavationsIcon from '@assets/images/account/municipal-services/excavations-icon.svg'
import FrontGardensIcon from '@assets/images/account/municipal-services/front-gardens-icon.svg'
import GardensIcon from '@assets/images/account/municipal-services/gardens-icon.svg'
import LibraryIcon from '@assets/images/account/municipal-services/library-icon.svg'
import MariniumIcon from '@assets/images/account/municipal-services/marinium-icon.svg'
import MosquitoIcon from '@assets/images/account/municipal-services/mosquito-icon.svg'
import ParkingIcon from '@assets/images/account/municipal-services/parking-icon.svg'
import SecurityIcon from '@assets/images/account/municipal-services/security-icon.svg'
import SewerageIcon from '@assets/images/account/municipal-services/sewerage-icon.svg'
import TaxesIcon from '@assets/images/account/municipal-services/taxes-icon.svg'
import TheatreIcon from '@assets/images/account/municipal-services/theatre-icon.svg'
import TowIcon from '@assets/images/account/municipal-services/tow-icon.svg'
import TransportIcon from '@assets/images/account/municipal-services/transport-icon.svg'
import TreeIcon from '@assets/images/account/municipal-services/tree-icon.svg'
import ZooIcon from '@assets/images/account/municipal-services/zoo-icon.svg'
import MunicipalServicesSectionHeader from 'components/forms/segments/AccountSectionHeader/MunicipalServicesSectionHeader'
import Pagination, {
  PaginationOption,
} from 'components/forms/simple-components/Pagination/Pagination'
import ServiceCard from 'components/forms/simple-components/ServiceCard'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'
import { SelectOption } from '../../../widget-components/SelectField/SelectField'

const ALL_CATEGORY = 'Všetky kategórie'
const TAXES_CATEGORY = 'Dane'
const CULTURE_CATEGORY = 'Kultúra a voľný čas'
const TRANSPORT_CATEGORY = 'Mestská hromadná doprava (MHD)'
const SECURITY_CATEGORY = 'Nahlásiť problém'
const ENVIROMENTS_CATEGORY = 'Nebytové priestory'
const BASKET_CATEGORY = 'Odpady'
const PARKING_CATEGORY = 'Parkovanie'
const MARINIUM_CATEGORY = 'Pohrebníctvo (Marianum)'
const ENTERTAINMENT_CATEGORY = 'Rýchle zásahy'
const CONSTRUCTION_CATEGORY = 'Výstavba'
const JOIN_CATEGORY = 'Zapojiť sa'
const GREEN_CATEGORY = 'Zeleň'

const enumOptions: SelectOption[] = [
  { const: 'ALL_CATEGORY', title: ALL_CATEGORY, description: '' },
  { const: 'TAXES_CATEGORY', title: TAXES_CATEGORY, description: '' },
  { const: 'CULTURE_CATEGORY', title: CULTURE_CATEGORY, description: '' },
  { const: 'TRANSPORT_CATEGORY', title: TRANSPORT_CATEGORY, description: '' },
  { const: 'SECURITY_CATEGORY', title: SECURITY_CATEGORY, description: '' },
  { const: 'ENVIROMENTS_CATEGORY', title: ENVIROMENTS_CATEGORY, description: '' },
  { const: 'BASKET_CATEGORY', title: BASKET_CATEGORY, description: '' },
  { const: 'PARKING_CATEGORY', title: PARKING_CATEGORY, description: '' },
  { const: 'MARINIUM_CATEGORY', title: MARINIUM_CATEGORY, description: '' },
  { const: 'ENTERTAINMENT_CATEGORY', title: ENTERTAINMENT_CATEGORY, description: '' },
  { const: 'CONSTRUCTION_CATEGORY', title: CONSTRUCTION_CATEGORY, description: '' },
  { const: 'JOIN_CATEGORY', title: JOIN_CATEGORY, description: '' },
  { const: 'GREEN_CATEGORY', title: GREEN_CATEGORY, description: '' },
]

const MunicipalServicesSection = () => {
  const { t } = useTranslation('account')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectorValue, setSelectorValue] = useState<SelectOption[]>(enumOptions.slice(0, 1))
  const selectorValuesArr: string = selectorValue[0]?.title
  const ITEMS_PER_PAGE = 20

  type ServiceCardBase = {
    title: string
    description: string
    buttonText: string
    className?: string
    icon: ReactNode
    href?: string
    category: string[]
    onPress?: () => void
  }
  const serviceCards: ServiceCardBase[] = [
    {
      title: t('account_section_services.cards.1.title'),
      description: t('account_section_services.cards.1.description'),
      buttonText: t('account_section_services.cards.1.buttonText'),
      icon: <TaxesIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [TAXES_CATEGORY],
      href: '/account/taxes-and-fees',
    },
    {
      title: t('account_section_services.cards.2.title'),
      description: t('account_section_services.cards.2.description'),
      buttonText: t('account_section_services.cards.2.buttonText'),
      icon: <TransportIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [TRANSPORT_CATEGORY],
      href: 'https://eshop.dopravnakarta.sk/DPB/Karta',
    },
    {
      title: t('account_section_services.cards.3.title'),
      description: t('account_section_services.cards.3.description'),
      buttonText: t('account_section_services.cards.3.buttonText'),
      icon: <ParkingIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [PARKING_CATEGORY],
      href: 'https://paas.sk/formular/',
    },
    {
      title: t('account_section_services.cards.4.title'),
      description: t('account_section_services.cards.4.description'),
      buttonText: t('account_section_services.cards.4.buttonText'),
      icon: <ParkingIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [PARKING_CATEGORY],
      href: 'https://api.parkdots.com/auth/realms/parkingrealm/protocol/openid-connect/registrations?client_id=parkingclient&redirect_uri=https%3A%2F%2Fpermits.parkdots.com%2Fwizard%2Fuser%3FprojectId%3D08b21098-3df8-4a0f-9e5c-75a21711aef7&state=f7127136-6bbf-4325-b603-5623cd086c3f&response_mode=fragment&response_type=code&scope=openid&nonce=33fa1798-098a-4ed6-89d8-7dc464bf5e30&kc_locale=sk',
    },
    {
      title: t('account_section_services.cards.5.title'),
      description: t('account_section_services.cards.5.description'),
      buttonText: t('account_section_services.cards.5.buttonText'),
      icon: <LibraryIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [CULTURE_CATEGORY],
      href: 'https://mestskakniznica.sk/sluzby/citanie/ako-sa-prihlasit-do-kniznice',
    },
    {
      title: t('account_section_services.cards.6.title'),
      description: t('account_section_services.cards.6.description'),
      buttonText: t('account_section_services.cards.6.buttonText'),
      icon: <TowIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [PARKING_CATEGORY],
      href: 'https://mepasys.sk/odtiahli-ma/',
    },
    {
      title: t('account_section_services.cards.7.title'),
      description: t('account_section_services.cards.7.description'),
      buttonText: t('account_section_services.cards.7.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [JOIN_CATEGORY],
      href: 'https://mib.sk/mesto-pre-deti',
    },
    {
      title: t('account_section_services.cards.8.title'),
      description: t('account_section_services.cards.8.description'),
      buttonText: t('account_section_services.cards.8.buttonText'),
      icon: <TreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [GREEN_CATEGORY],
      href: 'https://10000stromov.sk/',
    },
    {
      title: t('account_section_services.cards.9.title'),
      description: t('account_section_services.cards.9.description'),
      buttonText: t('account_section_services.cards.9.buttonText'),
      icon: <GardensIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [GREEN_CATEGORY, CULTURE_CATEGORY, JOIN_CATEGORY],
      href: 'https://bratislavskisusedia.sk/temy/komunitne-zahrady',
    },
    {
      title: t('account_section_services.cards.10.title'),
      description: t('account_section_services.cards.10.description'),
      buttonText: t('account_section_services.cards.10.buttonText'),
      icon: <TheatreIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [CULTURE_CATEGORY],
      href: 'https://vstupenky.dpoh.sk/',
    },
    {
      title: t('account_section_services.cards.11.title'),
      description: t('account_section_services.cards.11.description'),
      buttonText: t('account_section_services.cards.11.buttonText'),
      icon: <ExcavationsIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [SECURITY_CATEGORY],
      href: '',
    },
    {
      title: t('account_section_services.cards.12.title'),
      description: t('account_section_services.cards.12.description'),
      buttonText: t('account_section_services.cards.12.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [ENTERTAINMENT_CATEGORY],
      href: 'https://bratislava.sk/rychle-zasahy',
    },
    {
      title: t('account_section_services.cards.13.title'),
      description: t('account_section_services.cards.13.description'),
      buttonText: t('account_section_services.cards.13.buttonText'),
      icon: <ZooIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [CULTURE_CATEGORY],
      href: 'https://www.zoobratislava.sk/vstupenky-online/',
    },
    {
      title: t('account_section_services.cards.14.title'),
      description: t('account_section_services.cards.14.description'),
      buttonText: t('account_section_services.cards.14.buttonText'),
      icon: <MosquitoIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [JOIN_CATEGORY],
      href: 'https://lovcikomarov.sk/',
    },
    {
      title: t('account_section_services.cards.15.title'),
      description: t('account_section_services.cards.15.description'),
      buttonText: t('account_section_services.cards.15.buttonText'),
      icon: <TreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [GREEN_CATEGORY],
      href: 'https://10000stromov.sk/zapojit-sa',
    },
    {
      title: t('account_section_services.cards.16.title'),
      description: t('account_section_services.cards.16.description'),
      buttonText: t('account_section_services.cards.16.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [MARINIUM_CATEGORY],
      href: 'https://marianum.sk/sluzby/hrobove-miesto/pridelenie-alebo-rezervacia-hroboveho-miesta',
    },
    {
      title: t('account_section_services.cards.17.title'),
      description: t('account_section_services.cards.17.description'),
      buttonText: t('account_section_services.cards.17.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [JOIN_CATEGORY],
      href: 'https://www.detiprebratislavu.sk/prihlasit-projekt/',
    },
    {
      title: t('account_section_services.cards.18.title'),
      description: t('account_section_services.cards.18.description'),
      buttonText: t('account_section_services.cards.18.buttonText'),
      icon: <ChristmasTreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/stromceky/',
    },
    {
      title: t('account_section_services.cards.19.title'),
      description: t('account_section_services.cards.19.description'),
      buttonText: t('account_section_services.cards.19.buttonText'),
      icon: <FrontGardensIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [GREEN_CATEGORY],
      href: 'https://bratislavskisusedia.sk/temy/predzahradky',
    },
    {
      title: t('account_section_services.cards.20.title'),
      description: t('account_section_services.cards.20.description'),
      buttonText: t('account_section_services.cards.20.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/evidencia-neodvezeneho-odpadu/',
    },
    {
      title: t('account_section_services.cards.21.title'),
      description: t('account_section_services.cards.21.description'),
      buttonText: t('account_section_services.cards.21.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/odvozovy-den-triedeneho-odpadu-vrecovy-zber/',
    },
    {
      title: t('account_section_services.cards.22.title'),
      description: t('account_section_services.cards.22.description'),
      buttonText: t('account_section_services.cards.22.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/odvozovy-den-bro/',
    },
    {
      title: t('account_section_services.cards.23.title'),
      description: t('account_section_services.cards.23.description'),
      buttonText: t('account_section_services.cards.23.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/odv_zko/',
    },
    {
      title: t('account_section_services.cards.24.title'),
      description: t('account_section_services.cards.24.description'),
      buttonText: t('account_section_services.cards.24.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/odvozovy-den-k-bro/',
    },
    {
      title: t('account_section_services.cards.25.title'),
      description: t('account_section_services.cards.25.description'),
      buttonText: t('account_section_services.cards.25.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [MARINIUM_CATEGORY],
      href: 'https://marianum.sk/aktuality/zoznam-obradov',
    },
    {
      title: t('account_section_services.cards.26.title'),
      description: t('account_section_services.cards.26.description'),
      buttonText: t('account_section_services.cards.26.buttonText'),
      icon: <CityTreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [ENVIROMENTS_CATEGORY],
      href: 'https://cdn-api.bratislava.sk/static-pages/non-residential-premises-map/index.html?lang=sk',
    },
    {
      title: t('account_section_services.cards.27.title'),
      description: t('account_section_services.cards.27.description'),
      buttonText: t('account_section_services.cards.27.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [MARINIUM_CATEGORY],
      href: 'https://marianum.sk/sluzby/hrobove-miesto/vyhladavanie-hrobovych-miest',
    },
    {
      title: t('account_section_services.cards.28.title'),
      description: t('account_section_services.cards.28.description'),
      buttonText: t('account_section_services.cards.28.buttonText'),
      icon: <SewerageIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [CONSTRUCTION_CATEGORY],
      href: 'https://www.bvsas.sk/domacnosti/nove-pripojenie/',
    },
    {
      title: t('account_section_services.cards.29.title'),
      description: t('account_section_services.cards.29.description'),
      buttonText: t('account_section_services.cards.29.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: 'https://www.olo.sk/ponuka-sluzieb/objednavka-sluzieb-pre-obyvatelov/',
    },
    {
      title: t('account_section_services.cards.30.title'),
      description: t('account_section_services.cards.30.description'),
      buttonText: t('account_section_services.cards.30.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: '',
    },
    {
      title: t('account_section_services.cards.31.title'),
      description: t('account_section_services.cards.31.description'),
      buttonText: t('account_section_services.cards.31.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      category: [BASKET_CATEGORY],
      href: '',
    },
  ]

  const filteredServiceCards = serviceCards.filter((card) =>
    selectorValuesArr?.includes(ALL_CATEGORY) ? true : card.category.includes(selectorValuesArr),
  )

  const paginationOption: PaginationOption = {
    itemsPerPage: 1,
    listLength: filteredServiceCards.length,
  }

  return (
    <div className="flex flex-col">
      <MunicipalServicesSectionHeader
        enumOptions={enumOptions}
        setSelectorValue={setSelectorValue}
        selectorValue={selectorValue}
        setCurrentPage={setCurrentPage}
        title={t('account_section_services.navigation')}
      />
      <div className="w-full max-w-screen-lg mx-auto py-4 lg:py-8">
        <div className="flex flex-wrap gap-3 sm:gap-6 md:gap-8 px-4 lg:px-0">
          {filteredServiceCards
            .filter(
              (_, i) =>
                i + 1 <= currentPage * paginationOption.itemsPerPage &&
                i + 1 > (currentPage - 1) * paginationOption.itemsPerPage,
            )
            .map((card, i) => (
              <ServiceCard
                key={i}
                className={card.className}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                icon={card.icon}
                href={card.href}
                onPress={card.onPress}
              />
            ))}
        </div>
        <div className="my-4 lg:my-8">
          <Pagination
            paginationOption={paginationOption}
            currentPage={currentPage}
            pageHandler={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default MunicipalServicesSection

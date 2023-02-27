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
import { Pagination } from '@bratislava/ui-bratislava/index'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import ServiceCard from 'components/forms/simple-components/ServiceCard'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'

const MunicipalServicesSection = () => {
  const { t } = useTranslation('account')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ITEMS_PER_PAGE = 20

  type ServiceCardBase = {
    title: string
    description: string
    buttonText: string
    className?: string
    icon: ReactNode
    href?: string
    onPress?: () => void
  }

  const serviceCards: ServiceCardBase[] = [
    {
      title: t('account_section_services.cards.1.title'),
      description: t('account_section_services.cards.1.description'),
      buttonText: t('account_section_services.cards.1.buttonText'),
      icon: <TaxesIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.2.title'),
      description: t('account_section_services.cards.2.description'),
      buttonText: t('account_section_services.cards.2.buttonText'),
      icon: <TransportIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.3.title'),
      description: t('account_section_services.cards.3.description'),
      buttonText: t('account_section_services.cards.3.buttonText'),
      icon: <ParkingIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.4.title'),
      description: t('account_section_services.cards.4.description'),
      buttonText: t('account_section_services.cards.4.buttonText'),
      icon: <ParkingIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.5.title'),
      description: t('account_section_services.cards.5.description'),
      buttonText: t('account_section_services.cards.5.buttonText'),
      icon: <LibraryIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.6.title'),
      description: t('account_section_services.cards.6.description'),
      buttonText: t('account_section_services.cards.6.buttonText'),
      icon: <TowIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.7.title'),
      description: t('account_section_services.cards.7.description'),
      buttonText: t('account_section_services.cards.7.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.8.title'),
      description: t('account_section_services.cards.8.description'),
      buttonText: t('account_section_services.cards.8.buttonText'),
      icon: <TreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.9.title'),
      description: t('account_section_services.cards.9.description'),
      buttonText: t('account_section_services.cards.9.buttonText'),
      icon: <GardensIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.10.title'),
      description: t('account_section_services.cards.10.description'),
      buttonText: t('account_section_services.cards.10.buttonText'),
      icon: <TheatreIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.11.title'),
      description: t('account_section_services.cards.11.description'),
      buttonText: t('account_section_services.cards.11.buttonText'),
      icon: <ExcavationsIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.12.title'),
      description: t('account_section_services.cards.12.description'),
      buttonText: t('account_section_services.cards.12.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.13.title'),
      description: t('account_section_services.cards.13.description'),
      buttonText: t('account_section_services.cards.13.buttonText'),
      icon: <ZooIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.14.title'),
      description: t('account_section_services.cards.14.description'),
      buttonText: t('account_section_services.cards.14.buttonText'),
      icon: <MosquitoIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.15.title'),
      description: t('account_section_services.cards.15.description'),
      buttonText: t('account_section_services.cards.15.buttonText'),
      icon: <TreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.16.title'),
      description: t('account_section_services.cards.16.description'),
      buttonText: t('account_section_services.cards.16.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.17.title'),
      description: t('account_section_services.cards.17.description'),
      buttonText: t('account_section_services.cards.17.buttonText'),
      icon: <SecurityIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.18.title'),
      description: t('account_section_services.cards.18.description'),
      buttonText: t('account_section_services.cards.18.buttonText'),
      icon: <ChristmasTreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.19.title'),
      description: t('account_section_services.cards.19.description'),
      buttonText: t('account_section_services.cards.19.buttonText'),
      icon: <FrontGardensIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.20.title'),
      description: t('account_section_services.cards.20.description'),
      buttonText: t('account_section_services.cards.20.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.21.title'),
      description: t('account_section_services.cards.21.description'),
      buttonText: t('account_section_services.cards.21.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.22.title'),
      description: t('account_section_services.cards.22.description'),
      buttonText: t('account_section_services.cards.22.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.23.title'),
      description: t('account_section_services.cards.23.description'),
      buttonText: t('account_section_services.cards.23.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.24.title'),
      description: t('account_section_services.cards.24.description'),
      buttonText: t('account_section_services.cards.24.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.25.title'),
      description: t('account_section_services.cards.25.description'),
      buttonText: t('account_section_services.cards.25.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.26.title'),
      description: t('account_section_services.cards.26.description'),
      buttonText: t('account_section_services.cards.26.buttonText'),
      icon: <CityTreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.27.title'),
      description: t('account_section_services.cards.27.description'),
      buttonText: t('account_section_services.cards.27.buttonText'),
      icon: <MariniumIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.28.title'),
      description: t('account_section_services.cards.28.description'),
      buttonText: t('account_section_services.cards.28.buttonText'),
      icon: <SewerageIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.29.title'),
      description: t('account_section_services.cards.29.description'),
      buttonText: t('account_section_services.cards.29.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.30.title'),
      description: t('account_section_services.cards.30.description'),
      buttonText: t('account_section_services.cards.30.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
    {
      title: t('account_section_services.cards.31.title'),
      description: t('account_section_services.cards.31.description'),
      buttonText: t('account_section_services.cards.31.buttonText'),
      icon: <BasketIcon className="w-10 h-10 lg:w-12 lg:h-12" />,
      href: '',
    },
  ]
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_services.navigation')} />
      <div className="w-full max-w-screen-1.5lg mx-auto py-4 lg:py-8">
        <div className="sm:grid-cols-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 place-content-center justify-items-center">
          {serviceCards
            .filter(
              (_, i) =>
                i + 1 <= currentPage * ITEMS_PER_PAGE && i + 1 > (currentPage - 1) * ITEMS_PER_PAGE,
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
            totalPages={Math.round(serviceCards.length / ITEMS_PER_PAGE)}
            totalCount={serviceCards.length}
            currentPage={currentPage}
            pageHandler={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default MunicipalServicesSection

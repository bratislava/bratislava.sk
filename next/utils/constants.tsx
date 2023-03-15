import LightBulb from '@assets/images/bulb.svg'
import EServices from '@assets/images/EServices.svg'
import Phone from '@assets/images/phone-nav.svg'
import Tourist from '@assets/images/Tourist-icon.svg'

interface HamburgerSubLoginItem {
  icon?: React.ReactNode
  title: string
  url: string
}

export const contactUrls = {
  sk: '/uradne-a-navstevne-hodiny',
  en: '/visiting-and-office-hours',
}

export const contactsData = {
  // TODO replace by contact icon
  icon: <Phone />,
  title: 'contacts',
}

export const eServicesData = {
  icon: <EServices />,
  title: 'eservices',
  url: 'https://esluzby.bratislava.sk',
}

export const MOCK_HAMBURGER_MENU_ITEMS: {
  sk: HamburgerSubLoginItem[]
  en: HamburgerSubLoginItem[]
} = {
  sk: [
    {
      ...contactsData,
      url: contactUrls.sk,
    },
    {
      ...eServicesData,
    },
    {
      icon: <LightBulb />,
      title: 'fromUkraine',
      url: '/братислава-для-украiни',
    },
    {
      icon: <Tourist />,
      title: 'tourist',
      url: 'https://www.visitbratislava.com',
    },
    // {
    //   icon: <SpeakerSmall />,
    //   title: 'Čítačka',
    //   url: '#',
    // },
    // {
    //   icon: <TextSize />,
    //   title: 'Veľkosť písma',
    //   url: '#',
    // },
  ],
  en: [
    {
      ...contactsData,
      url: contactUrls.en,
    },
    {
      ...eServicesData,
    },
    {
      icon: <LightBulb />,
      title: 'fromUkraine',
      url: '/братислава-для-украiни',
    },
    {
      icon: <Tourist />,
      title: 'tourist',
      url: 'https://www.visitbratislava.com',
    },
    // {
    //   icon: <SpeakerSmall />,
    //   title: 'Čítačka',
    //   url: '#',
    // },
    // {
    //   icon: <TextSize />,
    //   title: 'Veľkosť písma',
    //   url: '#',
    // },
  ],
}

export const ROUTES = {
  HOME: '/',
  ACCOUNT: '/account',
  REGISTER: '/register',
  LOGIN: '/login',
  FORGOTTEN_PASSWORD: '/forgotten-password',
}

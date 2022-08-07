import LightBulb from '@assets/images/bulb.svg'
import Covid from '@assets/images/covid.svg'
import EServices from '@assets/images/EServices.svg'
import Tourist from '@assets/images/Tourist-icon.svg'

export const dateFormat = 'DD.MM.YYYY'
export const minKeywordLength = 2
export const paginationObj = {
  defaultPage: 1,
  maxLimit: 100,
}
export const articleLimits = {
  minLimit: 3,
  maxLimit: 100,
}
interface HamburgerSubLoginItem {
  icon?: React.ReactNode
  title: string
  url: string
}

export const covidUrls = {
  sk: '/informacie-a-odporucania-k-ochoreniu-covid-19',
  en: '/covid-19',
}

export const covidData = {
  icon: <Covid />,
  title: 'covid',
}

export const eServicesData = {
  icon: <EServices />,
  title: 'eservices',
  url: 'https://esluzby.bratislava.sk',
}

export const MOCK_HAMBURGER_MENU_ITEMS: { sk: HamburgerSubLoginItem[]; en: HamburgerSubLoginItem[] } = {
  sk: [
    {
      ...covidData,
      url: covidUrls.sk,
    },
    {
      ...eServicesData,
    },
    {
      icon: <LightBulb />,
      title: 'fromUkraine',
      url: '/kultura-a-komunity/komunity/братислава-для-украіни',
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
      ...covidData,
      url: covidUrls.en,
    },
    {
      ...eServicesData,
    },
    {
      icon: <LightBulb />,
      title: 'fromUkraine',
      url: '/kultura-a-komunity/komunity/братислава-для-украіни',
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

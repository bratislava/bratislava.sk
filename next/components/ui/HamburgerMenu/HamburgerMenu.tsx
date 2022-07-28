import { ArrowRight } from '@assets/images'
import LightBulb from '@assets/images/bulb.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import EServices from '@assets/images/EServices.svg'
import Tourist from '@assets/images/Tourist-icon.svg'
import { covidData } from '@utils/constants'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu'
import {getIcon, MenuMainItem} from '../HomepageMenu/HomepageMenu';
import {Link} from '../Link/Link'

interface IProps {
  hamburgerMenuItems?: MenuMainItem[]
  className?: string
  lang?: 'en' | 'sk'
  closeMenu: () => void
}

interface HamburgerSubLoginItem {
  icon?: React.ReactNode
  title: string
  url: string
}

const MOCK_HAMBURGER_MENU_ITEMS: HamburgerSubLoginItem[] = [
  {
    icon: <EServices />,
    title: 'E-služby',
    url: 'https://esluzby.bratislava.sk',
  },
  {
    icon: <LightBulb />,
    title: 'Я з України',
    url: '/kultura-a-komunity/komunity/братислава-для-украіни',
  },
  {
    icon: <Tourist />,
    title: 'Som turista',
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
]

export const HamburgerMenu = ({ hamburgerMenuItems = [], className, lang, closeMenu }: IProps) => {
  const [subMenu, setSubMenu] = useState<MenuMainItem>()
  const { t } = useTranslation()
  console.log(lang)

  if (subMenu) {
    return <HamburgerSubMenu item={subMenu} onClose={() => setSubMenu(null)} closeParentMenu={closeMenu} />
  }

  return (
    <div
      className={cx('fixed top-[64px] left-0 w-screen overflow-y-scroll lg:hidden flex flex-col')}
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div className={cx('flex-1 flex flex-col bg-secondary px-7.5 pb-11', className)}>
        {/* Main Hamburger Menu */}
        <div className="flex flex-col gap-y-8 border-b-2 border-tertiary py-8">
          {hamburgerMenuItems.map((item) => {
            const IconComponent = getIcon(item.icon)
            return (
              <button
                onClick={() => setSubMenu(item)}
                className="flex appearance-none items-center gap-x-7 text-left"
                key={item.title}
                type='button'
              >
                <IconComponent className="h-10 w-10" />
                <p className="w-36 text-base font-medium">{item.title}</p>
                <ChevronRight />
              </button>
            )
          })}
        </div>
        <div className="hidden items-center justify-between py-8 lg:flex">
          <Link className="text-base font-medium" variant="plain" href="#">
            {t('login')}
          </Link>
        </div>
        <div className="flex flex-col gap-y-3.5 pt-8 ">
          {covidData[lang].url && (
            <Link
              variant="plain"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              iconPosition="right"
              href={covidData[lang].url}
              key={covidData.title}
              className="mt-3"
            >
              <div className="flex items-center gap-x-3">
                <covidData.Icon />
                <span className="text-base font-medium">{covidData.title}</span>
              </div>
            </Link>
          )}
          {MOCK_HAMBURGER_MENU_ITEMS.map((item, index) => (
            <Link
              variant="plain"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              iconPosition="right"
              href={item.url}
              key={item.title}
              className={cx({ 'mt-3': index % 2 === 0 })}
            >
              <button className="flex items-center gap-x-3" onClick={() => closeMenu()} type="button">
                {item?.icon}
                <span className="text-base font-medium">{item.title}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu

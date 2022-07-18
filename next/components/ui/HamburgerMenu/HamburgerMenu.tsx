import { ArrowRight } from '@assets/images'
import cx from 'classnames'
import React, { useState } from 'react'

import ChevronRight from '@assets/images/chevron-right.svg'
import EServices from '@assets/images/EServices.svg'
import LightBulb from '@assets/images/bulb.svg'
import SpeakerSmall from '@assets/images/speaker-small.svg'
import TextSize from '@assets/images/text-size.svg'
import Tourist from '@assets/images/Tourist-icon.svg'
import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu'
import Covid from '@assets/images/covid.svg'


import { getIcon, Link, MenuMainItem } from '../index'

interface IProps {
  hamburgerMenuItems?: MenuMainItem[]
  className?: string
  isHamburgerMenu?: boolean
  setHamburgerMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

interface HamburgerSubLoginItem {
  icon?: React.ReactNode
  title: string
  url: string
}

// TODO: add urls and all items
const MOCK_HAMBURGER_MENU_ITEMS: HamburgerSubLoginItem[] = [
  {
    icon: <EServices />,
    title: 'E-služby',
    url: '#',
  },
  {
    icon: <Covid />,
    title: 'Covid-19',
    url: '#',
  },
  {
    icon: <LightBulb />,
    title: 'Я з України',
    url: '/kultura-a-komunity/komunity/братислава-для-украіни',
  },
  {
    icon: <Tourist />,
    title: 'Som turista',
    url: '#',
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

export const HamburgerMenu = ({ hamburgerMenuItems = [], className }: IProps) => {
  const [subMenu, setSubMenu] = useState<MenuMainItem>()

  if (subMenu) {
    return <HamburgerSubMenu item={subMenu} onClose={() => setSubMenu(null)} />
  }

  return (
    <div
      className={cx('fixed top-[64px] left-0 w-screen overflow-y-scroll md:hidden flex flex-col')}
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div className={cx('flex-1 flex flex-col bg-secondary px-7.5 pb-11', className)}>
        {/* Main Hamburger Menu */}
        <div className="flex flex-col gap-y-8 border-b-2 border-primary py-8">
          {hamburgerMenuItems.map((item) => {
            const IconComponent = getIcon(item.icon)
            return (
              <button
                onClick={() => setSubMenu(item)}
                className="flex appearance-none items-center gap-x-7 text-left"
                key={item.title}
              >
                <IconComponent className="h-10 w-10" />
                <p className="w-36 text-base font-medium">{item.title}</p>
                <ChevronRight />
              </button>
            )
          })}
        </div>
        <div className="items-center justify-between py-8 hidden lg:flex">
          <Link className="text-base font-medium" variant="plain" href="#">
            Prihlásenie
          </Link>
        </div>
        <div className="flex flex-col gap-y-3.5 pt-8 ">
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
              <div className="flex items-center gap-x-3">
                {item.icon && item.icon}
                <span className="text-base font-medium">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu

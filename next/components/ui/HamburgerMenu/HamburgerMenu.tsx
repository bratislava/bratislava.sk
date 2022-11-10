// @ts-strict-ignore
import { ArrowRight } from '@assets/images'
import ChevronRight from '@assets/images/chevron-right.svg'
import { MOCK_HAMBURGER_MENU_ITEMS } from '@utils/constants'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { Icon } from '../../atoms/icon/Icon'
import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu'
import { MenuMainItem } from '../index'
import { Link } from '../Link/Link'

interface IProps {
  hamburgerMenuItems?: MenuMainItem[]
  className?: string
  lang?: 'en' | 'sk'
  closeMenu: () => void
}

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
        <div className="border-tertiary flex flex-col gap-y-8 border-b-2 py-8">
          {hamburgerMenuItems.map((item) => {
            return (
              <button
                onClick={() => setSubMenu(item)}
                className="flex appearance-none items-center gap-x-7 text-left"
                key={item.title}
                type="button"
              >
                <Icon iconName={item.icon} />
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
          {MOCK_HAMBURGER_MENU_ITEMS[lang].map((item, index) => (
            <Link
              variant="plain"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
              iconPosition="right"
              href={item.url}
              key={t(item.title)}
              className={cx({ 'mt-3': index % 3 === 0 })}
            >
              <button className="flex items-center gap-x-3" onClick={() => closeMenu()} type="button">
                {item?.icon}
                <span className="text-base font-medium">{t(item.title)}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu

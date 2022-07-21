import ChevronDown from '@assets/images/chevron-down-small.svg'
import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronUp from '@assets/images/chevron-up-small.svg'
import CloseFilled from '@assets/images/close-filled.svg'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { getIcon, MenuMainItem } from '../HomepageMenu/HomepageMenu';
import { Link } from '../Link/Link';

interface IProps {
  className?: string
  item: MenuMainItem
  onClose?: () => void
  variant?: 'default' | 'homepage'
}

const HamburgerSubMenu = ({ className, item, onClose, variant }: IProps) => {
  const [expanded, setExpanded] = useState<number[]>([])
  const ColoredIconComponent = getIcon(item.coloredIcon)

  const { t } = useTranslation()

  return (
    <div
      style={{ backgroundColor: item.color, height: 'calc(100vh - 55px)' }}
      className={cx(
        'fixed top-[64px] left-0 w-screen md:hidden flex flex-col z-40',
        // 'absolute top-0 h-full w-screen flex-1',
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* SubItems Menu Topper */}
        <div
          className="flex-0 mx-6 flex gap-x-6 py-6"
          style={{
            background: item.color,
            borderBottomColor: item.colorDark,
            borderBottomWidth: 2,
          }}
        >
          {variant === 'homepage' ? (
            <div className="flex items-center">
              {ColoredIconComponent && <ColoredIconComponent className="mr-6 h-12 w-12" />}
              <span className="text-left text-base font-semibold">{item.title}</span>
            </div>
          ) : (
            <button className="flex items-center" onClick={onClose}>
              <ChevronLeft className="mr-8" />
              {ColoredIconComponent && <ColoredIconComponent className="mr-6 h-12 w-12" />}
              <span className="text-left text-base font-semibold">{item.title}</span>
            </button>
          )}
        </div>
        {/* Item's SubMenu */}
        <div
          className={cx('flex-1 min-h-0 overflow-scroll flex flex-col space-y-5 lg:space-y-10 p-6', {
            'pb-36': variant === 'homepage',
          })}
        >
          {item.subItems?.map((subItem, i) => {
            const isExpanded = expanded.includes(i)
            const IconComponent = getIcon(subItem.icon)
            return (
              <React.Fragment key={subItem.title}>
                <div className="flex items-center gap-x-5">
                  <IconComponent className="h-10 w-10" />
                  <p className="text-default font-semibold">{subItem.title}</p>
                </div>
                <div className="flex flex-col gap-y-2 pb-4">
                  <div className="flex flex-col gap-y-2">
                    {subItem.subItems
                      .map((subSubItem) => (
                        <Link key={subSubItem.title} href={subSubItem.url} variant="plain">
                          {subSubItem.title}
                        </Link>
                      ))
                      .slice(0, isExpanded ? subItem.subItems.length : 3)}
                  </div>
                  {subItem.subItems.length > 2 && (
                      <button
                        onClick={() => setExpanded((v) => (isExpanded ? v.filter((n) => n !== i) : [...v, i]))}
                        className="flex items-center gap-x-4"
                        type="button"
                      >
                        {isExpanded ? (
                          <>
                            <p className="text-base font-semibold underline">{t('showLess')}</p>
                            <ChevronUp />
                          </>
                        ) : (
                          <>
                            <p className="text-base font-semibold underline">{t('showMore')}</p>
                            <ChevronDown />
                          </>
                        )}
                      </button>
                  )}
                  {i === item.subItems.length - 1 ? <div className="h-20" /> : null}
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
      {/* Bottom's Sticky */}
      <div
        style={{
          background: `linear-gradient(transparent -100%, ${item.color} 80%)`,
        }}
        className="absolute bottom-0 flex h-32 w-screen flex-col items-center"
      >
        <CloseFilled className="cursor-pointer" onClick={onClose} style={{ color: item.colorDark }} />
        <div className="mt-4 text-center text-base font-semibold text-font">{t('closeMenu')}</div>
      </div>
    </div>
  )
}

export default HamburgerSubMenu

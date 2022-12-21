// @ts-strict-ignore
import { ChevronRight } from '@assets/images'
import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronUp from '@assets/images/chevron-up-small.svg'
import CloseFilled from '@assets/images/close-filled.svg'
import cx from 'classnames'
import UnstyledLink from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import { Icon } from '../../atoms/icon/Icon'
import { MenuMainItem } from '../HomepageMenu/HomepageMenu'
import { Link } from '../Link/Link'

interface IProps {
  className?: string
  item: MenuMainItem
  onClose?: () => void
  closeParentMenu: () => void
  variant?: 'default' | 'homepage'
}

const HamburgerSubMenu = ({ className, item, onClose, variant, closeParentMenu }: IProps) => {
  const [expanded] = useState<number[]>([])

  const { t } = useTranslation()

  return (
    <div
      style={{ backgroundColor: item.color, height: 'calc(100vh - 55px)' }}
      className={cx(
        'fixed top-16 left-0 w-screen lg:hidden flex flex-col z-40',
        // 'absolute top-0 h-full w-screen flex-1',
        className,
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
              <Icon iconName={item.coloredIcon} />
              <span className="text-p2-semibold text-left">{item.title}</span>
            </div>
          ) : (
            <button type="button" className="flex items-center" onClick={onClose}>
              <ChevronLeft className="mr-8" />
              <Icon iconName={item.coloredIcon} />
              <span className="text-p2-semibold text-left">{item.title}</span>
            </button>
          )}
        </div>
        {/* Item's SubMenu */}
        <div
          className={cx(
            'flex-1 min-h-0 overflow-scroll flex flex-col space-y-5 lg:space-y-10 p-6',
            {
              'pb-36': variant === 'homepage',
            },
          )}
        >
          {item.subItems?.map((subItem, i) => {
            const isExpanded = expanded.includes(i)
            return (
              <React.Fragment key={subItem.title}>
                <div className="flex items-center gap-x-5">
                  <Icon iconName={subItem.icon} />
                  <p className="text-p1-semibold">{subItem.title}</p>
                </div>
                <div className="flex flex-col gap-y-2 pb-4">
                  <div className="flex flex-col gap-y-2">
                    {subItem.subItems
                      .map((subSubItem) => (
                        <Link key={subSubItem.title} href={subSubItem.url} variant="plain">
                          <button onClick={() => closeParentMenu()} type="button">
                            {subSubItem.title}
                          </button>
                        </Link>
                      ))
                      .slice(0, isExpanded ? subItem.subItems.length : 3)}
                  </div>
                  {/* TODO change approach to where we store all subItems in strapi & can therefore show them right away,
                   /* today, the state is that strapi hosts just the first 3 items and the rest are on the subpage
                   /* therefore, expanding the list is disabled, and the button behaves as a link to root page instead */}
                  {subItem.subItems.length > 2 && (
                    <UnstyledLink href={subItem.url}>
                      <button
                        // onClick={() => setExpanded((v) => (isExpanded ? v.filter((n) => n !== i) : [...v, i]))}
                        onClick={() => closeParentMenu()}
                        className="flex items-center gap-x-4"
                        type="button"
                      >
                        {isExpanded ? (
                          <>
                            <p className="text-p2-semibold underline">{t('showLess')}</p>
                            <ChevronUp />
                          </>
                        ) : (
                          <>
                            <p className="text-p2-semibold underline">{t('showMore')}</p>
                            {/* <ChevronDown /> */}
                            <ChevronRight />
                          </>
                        )}
                      </button>
                    </UnstyledLink>
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
        <CloseFilled
          className="cursor-pointer"
          onClick={onClose}
          style={{ color: item.colorDark }}
        />
        <div className="text-p2-semibold mt-4 text-center text-font">{t('closeMenu')}</div>
      </div>
    </div>
  )
}

export default HamburgerSubMenu

import { ArrowRight, ChevronDownSmall, ChevronRight } from '@assets/images'
import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import React, { useRef, useState } from 'react'
import { useOutsideClick } from 'rooks'

import { Icon } from '../../atoms/icon/Icon'
import { MenuMainItem, Panel, Waves } from '../index'
import { isItExternal } from './external-link'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
  active?: string
}

interface MenuCellProps {
  item: MenuMainItem
  isActive: boolean
}

const MenuCell = ({ item, isActive }: MenuCellProps) => (
  <div className="flex h-[106px] w-40 flex-col items-center">
    <StickyMenuTopper
      style={{ color: item.colorDark }}
      className={cx('absolute top-0 transition opacity-0 group-hover:opacity-100 w-30', {
        'opacity-100': isActive,
      })}
    />
    <p
      className={cx(
        'font-medium text-base mt-5 transition group-hover:font-bold text-center whitespace-pre',
        {
          'font-bold': isActive,
        },
      )}
    >
      {item.title}
    </p>
    <ChevronDownSmall
      className={cx('mt-3 group-hover:hidden', {
        hidden: isActive,
      })}
    />
    <ChevronDownSmall
      style={{ color: item.colorDark }}
      className={cx('mt-3 group-hover:block', {
        hidden: !isActive,
        block: isActive,
      })}
    />
  </div>
)

interface MenuPanelProps {
  item: MenuMainItem
}

const MenuPanel = ({ item }: MenuPanelProps) => {
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = React.useState(-1)
  const { Link: UILink } = useUIContext()

  return (
    <div className="bg-gray-900/50 z-30 h-screen fixed top-[106px] inset-x-0 w-full transition delay-500 duration-300 ease-in-out text-left">
      <div className="cursor-default grid absolute top-0 inset-x-0 z-30 w-full pb-20 bg-transparent">
        <Panel style={{ backgroundColor: item.color }} className="px-6 py-10 rounded-none">
          <div className="m-auto grid w-full max-w-screen-1.5lg grid-cols-3 gap-10">
            {/* SUB-ITEMS */}
            {item.subItems?.map((subItem, j) => {
              return (
                <div key={j}>
                  <button type="button" className="flex">
                    <UILink
                      href={isItExternal(subItem.url)}
                      className="text-p1 flex items-center text-left hover:underline"
                    >
                      <div className="flex shrink-0 grow-0 items-center justify-center">
                        <Icon iconName={subItem.icon} />
                      </div>
                      <div className="ml-4 flex-1 font-semibold">{subItem.title}</div>
                    </UILink>
                  </button>
                  <ul className="mt-8 space-y-3">
                    {subItem.subItems?.map((subSubItem, k) => (
                      <li key={k}>
                        <button type="button" className="flex">
                          <UILink
                            href={isItExternal(subSubItem.url)}
                            className="text-left hover:underline"
                          >
                            {subSubItem.title}
                          </UILink>
                        </button>
                      </li>
                    ))}
                    {subItem.url && subItem.subItems.length > 2 ? (
                      <li className="font-semibold">
                        <button
                          type="button"
                          onMouseEnter={() => setMoreLinkHoverIdx(j)}
                          onMouseLeave={() => setMoreLinkHoverIdx(-1)}
                          className="font-semibold"
                        >
                          <UILink href={isItExternal(subItem.url)}>
                            <div className="flex items-center gap-x-6">
                              <span className="py-0.5 underline">{subItem.moreLinkTitle}</span>
                              {moreLinkHoverIdx === j ? <ArrowRight /> : <ChevronRight />}
                            </div>
                          </UILink>
                        </button>
                      </li>
                    ) : null}
                  </ul>
                </div>
              )
            })}
          </div>
        </Panel>
        <Waves
          className="absolute bottom-0 z-40 overflow-hidden bg-transparent"
          wavePosition="bottom"
          backgroundColor="transparent"
          waveColor={item.color}
          isRich
        />
      </div>
    </div>
  )
}

export const BAStickyMenu = ({ className, menuItems }: IProps) => {
  const clickOutsideRef = useRef<HTMLButtonElement | null>(null)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null)
  const handleOutsideClick = () => setActiveMenuId(null)
  useOutsideClick(clickOutsideRef, handleOutsideClick)

  const handleButtonClick = (buttonId: number): void => {
    if (activeMenuId === buttonId) {
      setActiveMenuId(null)
      return
    }
    setActiveMenuId(buttonId)
  }

  return (
    <menu
      className={cx('flex max-w-screen-1.5lg m-auto w-full justify-between', className)}
      ref={clickOutsideRef}
    >
      {menuItems.map((item, i) => (
        <div key={i}>
          <button
            value={i}
            type="button"
            className="group flex-1 cursor-pointer"
            onClick={() => handleButtonClick(i)}
          >
            <MenuCell item={item} isActive={i === activeMenuId} />
          </button>
          {activeMenuId === i && <MenuPanel item={item} />}
        </div>
      ))}
    </menu>
  )
}

export default BAStickyMenu

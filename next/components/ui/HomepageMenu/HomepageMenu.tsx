// @ts-strict-ignore
import { ArrowRight } from '@assets/images'
import ChevronRight from '@assets/images/chevron-right.svg'
import CloseFilled from '@assets/images/close-filled.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { MenuDesktopLayout } from '@bratislava/ui-bratislava/HomepageMenu/MenuDesktopLayout'
import { MenuMobileLayout } from '@bratislava/ui-bratislava/HomepageMenu/MenuMobileLayout'
import cx from 'classnames'
import { useRef, useState } from 'react'
import { useOutsideClick } from 'rooks'

import { MenuButton } from '../../atoms/button/MenuButton'
import { Icon } from '../../atoms/icon/Icon'
import { MenuIcon } from '../../atoms/icon/IconService'
import { Panel } from '../Panel/Panel'

interface MenuSubSubItem {
  title: string
  url: string
}

interface MenuSubItem {
  icon?: MenuIcon
  title: string
  moreLinkTitle?: string
  url: string
  subItems: MenuSubSubItem[]
}

export interface MenuMainItem {
  id: string
  icon: MenuIcon
  coloredIcon: MenuIcon
  title: string
  color: string
  colorDark?: string
  subItems?: MenuSubItem[]
}

interface IProps {
  items?: MenuMainItem[]
}

// TODO: Named Group for Link Dalsie (change icon)
const HomepageMenu = ({ items }: IProps) => {
  const { Link: UILink } = useUIContext()
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = useState(-1)
  const [activeId, setActiveId] = useState<string | null>(null)

  const ref = useRef()
  useOutsideClick(ref, () => setActiveId(null))

  return (
    <>
      <MenuMobileLayout items={items} />
      <MenuDesktopLayout>
        {items?.map((item, index) => (
          <div data-hover-id={index} key={index} className="group">
            <button
              type="button"
              className="relative z-10 flex cursor-pointer items-center gap-x-7 text-left text-default md:py-5 lg:z-30 lg:h-36 lg:w-40 lg:flex-col lg:justify-center lg:gap-x-0 lg:gap-y-4 lg:py-0 lg:text-center"
              onClick={() => {
                setActiveId(item.id)
              }}
            >
              <Panel
                className={cx('absolute w-full h-full rounded-b-none z-50', {
                  block: activeId === item.id,
                  hidden: activeId !== item.id,
                })}
                style={{
                  backgroundColor: item.color,
                  zIndex: -1,
                }}
              />
              <MenuButton
                isActive={activeId === item.id}
                title={item.title}
                iconItems={[
                  { icon: item.icon, title: item.title },
                  { icon: item.coloredIcon, title: item.title, customHoverColor: item.color },
                ]}
              />
            </button>

            <div ref={ref}>
              <Panel
                overflowVisible
                data-hover-id={index}
                style={{ backgroundColor: item.color }}
                className={cx('absolute left-0 right-0 z-20 w-full px-6 py-10 grid-cols-3 gap-10', {
                  grid: activeId === item.id,
                  hidden: activeId !== item.id,
                  'rounded-tl-none': index === 0,
                  'rounded-tr-none': index === items.length - 1,
                })}
              >
                {/* SUB-ITEMS */}
                {item.subItems?.map((subItem, j) => {
                  return (
                    <div key={j}>
                      <div className="flex items-center text-[20px]">
                        <div className="flex shrink-0 grow-0 items-center justify-center">
                          <Icon iconName={subItem.icon} />
                        </div>
                        <UILink href={subItem.url} className="flex items-center text-[20px] hover:underline">
                          <div className="ml-4 flex-1 cursor-pointer font-semibold">{subItem.title}</div>
                        </UILink>
                      </div>
                      <ul className="mt-8 space-y-3">
                        {subItem.subItems?.map((subSubItem, k) => (
                          <li key={k}>
                            <UILink href={subSubItem.url} className="hover:underline">
                              {subSubItem.title}
                            </UILink>
                          </li>
                        ))}
                        {subItem.url && subItem.subItems.length > 2 ? (
                          <li
                            onMouseEnter={() => setMoreLinkHoverIdx(j)}
                            onMouseLeave={() => setMoreLinkHoverIdx(-1)}
                            className="font-semibold"
                          >
                            <UILink href={subItem.url}>
                              <div className="flex items-center gap-x-6">
                                <span className="py-0.5 underline">{subItem.moreLinkTitle}</span>
                                {moreLinkHoverIdx === j ? <ArrowRight /> : <ChevronRight />}
                              </div>
                            </UILink>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  )
                })}
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 cursor-pointer">
                  <CloseFilled onClick={() => setActiveId(null)} style={{ color: item.colorDark }} />
                </div>
              </Panel>
            </div>
          </div>
        ))}
      </MenuDesktopLayout>
    </>
  )
}

export default HomepageMenu

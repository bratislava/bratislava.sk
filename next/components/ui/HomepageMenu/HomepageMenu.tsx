import { ArrowRight } from '@assets/images'
import Activities from '@assets/images/activities-new.svg'
import CloseFilled from '@assets/images/close-filled.svg'
import Bicycle from '@assets/images/icon-bicycle-new.svg'
import Comunity from '@assets/images/icon-comunity-new.svg'
import Lighting from '@assets/images/icon-lighting-new.svg'
import Map from '@assets/images/icon-map-new.svg'
import MHD from '@assets/images/icon-mhd-new.svg'
import Parking from '@assets/images/icon-parking-new.svg'
import Road from '@assets/images/icon-road-new.svg'
import Share from '@assets/images/icon-share-new.svg'
import Support from '@assets/images/icon-support-new.svg'
import Trolleybus from '@assets/images/icon-trolleybus-new.svg'
import Partnership from '@assets/images/partnership-new.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useRef, useState } from 'react'
import { useOutsideClick } from 'rooks'

import ChevronRight from '@assets/images/chevron-right.svg'
import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu'
import { Panel } from '../Panel/Panel'
import Ball from './icons/icon-ball.svg'
import BookWithChild from './icons/icon-book-with-child.svg'
import BookWithChildColored from './icons/icon-book-with-child-colored.svg'
import BulbOff from './icons/icon-bulb-off.svg'
import Calendar from './icons/icon-calendar.svg'
import Car from './icons/icon-car.svg'
import CarWithMap from './icons/icon-car-with-map.svg'
import CarWithMapColored from './icons/icon-car-with-map-colored.svg'
import Castle from './icons/icon-castle.svg'
import CastleColored from './icons/icon-castle-colored.svg'
import Chest from './icons/icon-chest.svg'
import Child from './icons/icon-child.svg'
import CityHall from './icons/icon-city-hall.svg'
import Coin from './icons/icon-coin.svg'
import Compass from './icons/icon-compass.svg'
import RealState from './icons/icon-construction-and-real-state.svg'
import Covid from './icons/icon-covid.svg'
import Crane from './icons/icon-crane.svg'
import Globe from './icons/icon-globe.svg'
import HandCoins from './icons/icon-hand-coins.svg'
import HandHeart from './icons/icon-hand-heart.svg'
import HandHeartColored from './icons/icon-hand-heart-colored.svg'
import HandPerson from './icons/icon-hand-person.svg'
import HandPlant from './icons/icon-hand-plant.svg'
import Heart from './icons/icon-heart.svg'
import History from './icons/icon-history.svg'
import HouseWithTree from './icons/icon-house-with-tree.svg'
import HouseWithTreeColored from './icons/icon-house-with-tree-colored.svg'
import LargeBuilding from './icons/icon-large-building.svg'
import LookingGlass from './icons/icon-looking-glass.svg'
import MaskWithBall from './icons/icon-mask-with-ball.svg'
import MaskWithBallColored from './icons/icon-mask-with-ball-colored.svg'
import Medal from './icons/icon-medal.svg'
import OldPerson from './icons/icon-old-person.svg'
import PaperMask from './icons/icon-paper-mask.svg'
import RealStateDocument from './icons/icon-real-state-document.svg'
import School from './icons/icon-school.svg'
import Stall from './icons/icon-stall.svg'
import Theater from './icons/icon-theater.svg'
import Tree from './icons/icon-tree.svg'

const ICONS = {
  mesto_01: Castle,
  mesto_color_01: CastleColored,
  doprava_mapy_02: CarWithMap,
  doprava_mapy_color_02: CarWithMapColored,
  zp_vystavba_03: HouseWithTree,
  zp_vystavba_color_03: HouseWithTreeColored,
  socialna_pomoc_04: HandHeart,
  socialna_pomoc_color_04: HandHeartColored,
  vzdelavanie_05: BookWithChild,
  vzdelavanie_color_05: BookWithChildColored,
  kultura_06: MaskWithBall,
  kultura_color_06: MaskWithBallColored,
  sprava_mesta_01: CityHall,
  transparentne_mesto_01: LookingGlass,
  dane_01: Coin,
  projekty_01: BulbOff,
  partnerstva_01: Partnership,
  mhd_02: MHD,
  cyklo_02: Bicycle,
  mapy_02: Map,
  sprava_a_udrzba_02: Road,
  doprava_02: Trolleybus,
  parkovanie_02: Parking,
  zdielana_mobilita_02: Share,
  zivotne_prostredie_03: HandPlant,
  zelen_03: Tree,
  vystavba_a_nehnutelnosti_03: RealState,
  uzemny_plan_03: RealStateDocument,
  rozvoj_mesta_03: Crane,
  verejne_osvetlenie_03: Lighting,
  byvanie_04: LargeBuilding,
  sluzby_04: HandPerson,
  zariadenia_04: OldPerson,
  pomoc_04: Heart,
  aktivity_04: Activities,
  skolstvo_05: School,
  sport_05: Ball,
  deti_a_mladez_05: Child,
  ocenovanie_05: Medal,
  dotacie_05: HandCoins,
  kalendar_06: Calendar,
  organizacie_06: History,
  dedicstvo_06: Chest,
  sluzby_06: Support,
  koncepcia_06: PaperMask,
  komunity_06: Comunity,
  covid_06: Covid,
  car: Car,
  compass: Compass,
  globe: Globe,
  stall: Stall,
  theater: Theater,
}

export type MenuIcon = keyof typeof ICONS | string

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

export const getIcon = (icon?: MenuIcon) => {
  if (!icon)
    return function () {
      return null
    }

  let Comp = ICONS[icon as keyof typeof ICONS]

  if (!Comp) {
    Comp = ICONS.mesto_01
  }

  return Comp
}

const HomepageMenu = ({ items }: IProps) => {
  const { Link: UILink } = useUIContext()
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = useState(-1)
  const [activeId, setActive] = useState(null)
  const [selectedMenu, setSelectedMenu] = useState<MenuMainItem>()
  const ref = useRef()
  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      {/* Mobile Design */}
      <div className="flex flex-col gap-y-1 md:hidden">
        {items?.map((item, i) => {
          const IconComponent = getIcon(item.icon)
          return (
            <button onClick={() => setSelectedMenu(item)} className="flex items-center gap-x-7 p-2" key={i}>
              {IconComponent && <IconComponent className="h-12 w-12 basis-12 grow-0 shrink-0 text-font" />}
              <p className="text-sm font-medium text-font text-left">{item.title}</p>
            </button>
          )
        })}
      </div>

      {selectedMenu && (
        <HamburgerSubMenu
          item={selectedMenu}
          variant="homepage"
          onClose={() => setSelectedMenu(null)}
          closeParentMenu={() => setSelectedMenu(null)}
        />
      )}
      {/* Desktop Design */}
      <div className="relative hidden justify-between gap-y-4 md:grid md:grid-cols-3 lg:flex lg:flex-row lg:gap-y-0">
        {items?.map((item, i) => {
          const IconComponent = getIcon(item.icon)
          const ColoredIconComponent = getIcon(item.coloredIcon)
          return (
            <div data-hover-id={i} key={i} className="group">
              <div
                className="relative z-10 flex cursor-pointer items-center gap-x-7 text-left text-default md:py-5 lg:z-30 lg:h-36 lg:w-40 lg:flex-col lg:justify-center lg:gap-x-0 lg:gap-y-4 lg:py-0 lg:text-center"
                onClick={() => {
                  setActive(item.id)
                }}
              >
                <Panel
                  className={cx('absolute w-full h-full rounded-b-none', {
                    block: activeId == item.id,
                    hidden: activeId != item.id,
                  })}
                  style={{
                    backgroundColor: item.color,
                    zIndex: -1,
                    boxShadow: '0 4px 2px -2px gray',
                  }}
                />
                {IconComponent && (
                  <IconComponent
                    className={cx('group-hover:hidden block w-10 h-10 ml-7 lg:ml-0 lg:w-12 lg:h-12 text-gray-dark', {
                      hidden: activeId == item.id,
                    })}
                  />
                )}
                {ColoredIconComponent && (
                  <ColoredIconComponent
                    className={cx('w-10 h-10 ml-7 lg:ml-0 lg:w-12 lg:h-12', {
                      block: activeId == item.id,
                      'group-hover:block hidden': activeId != item.id,
                    })}
                  />
                )}
                <p className="typography-tag-label whitespace-pre text-gray-dark">{item.title}</p>
                {activeId == item.id && (
                  <div
                    style={{ backgroundColor: item.color }}
                    className="absolute bottom-0 h-8 w-full translate-y-1/2"
                  />
                )}
              </div>
              <div ref={ref}>
                <Panel
                  overflowVisible
                  data-hover-id={i}
                  style={{ backgroundColor: item.color }}
                  className={cx('absolute left-0 right-0 z-20 w-full px-6 py-10 grid-cols-3 gap-10', {
                    grid: activeId == item.id,
                    hidden: activeId != item.id,
                    'rounded-tl-none': i === 0,
                    'rounded-tr-none': i === items.length - 1,
                  })}
                >
                  {/* SUB-ITEMS */}
                  {item.subItems?.map((subItem, j) => {
                    const IconComponent = getIcon(subItem.icon)
                    return (
                      <div key={j}>
                        <div className="flex items-center text-[20px]">
                          <div className="flex shrink-0 grow-0 items-center justify-center">
                            <IconComponent className="h-10 w-10" />
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
                  <div className="absolute bottom-[-24px] left-1/2 cursor-pointer -translate-x-1/2">
                    <CloseFilled onClick={() => setActive(null)} style={{ color: item.colorDark }} />
                  </div>
                </Panel>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomepageMenu

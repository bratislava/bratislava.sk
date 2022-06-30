import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ArrowRight } from '@assets/images'
import cx from 'classnames'
import { useState } from 'react'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu'
import { Panel } from '../Panel/Panel'
import Activities from './icons/icon-activities.svg'
import Ball from './icons/icon-ball.svg'
import Bicycle from './icons/icon-bicycle.svg'
import BookWithChildColored from '@assets/images/icon-book-with-child-colored-new.svg'
import BookWithChild from './icons/icon-book-with-child.svg'
import BulbOff from './icons/icon-bulb-off.svg'
import Calendar from './icons/icon-calendar.svg'
import CarWithMapColored from '@assets/images/icon-car-with-map-colored-new.svg'
import CarWithMap from './icons/icon-car-with-map.svg'
import Car from './icons/icon-car.svg'
import CastleColored from '@assets/images/icon-castle-colored-new.svg'
import Castle from './icons/icon-castle.svg'
import Chest from './icons/icon-chest.svg'
import Child from './icons/icon-child.svg'
import CityHall from './icons/icon-city-hall.svg'
import Coin from './icons/icon-coin.svg'
import Compass from './icons/icon-compass.svg'
import Comunity from './icons/icon-comunity.svg'
import RealState from './icons/icon-construction-and-real-state.svg'
import Covid from './icons/icon-covid.svg'
import Crane from './icons/icon-crane.svg'
import Globe from './icons/icon-globe.svg'
import HandCoins from './icons/icon-hand-coins.svg'
import HandHeartColored from '@assets/images/icon-hand-heart-colored-new.svg'
import HandHeart from './icons/icon-hand-heart.svg'
import HandPerson from './icons/icon-hand-person.svg'
import HandPlant from './icons/icon-hand-plant.svg'
import Heart from './icons/icon-heart.svg'
import History from './icons/icon-history.svg'
import HouseWithTreeColored from '@assets/images/icon-house-with-tree-colored-new.svg'
import HouseWithTree from './icons/icon-house-with-tree.svg'
import LargeBuilding from './icons/icon-large-building.svg'
import Lighting from './icons/icon-lighting.svg'
import LookingGlass from './icons/icon-looking-glass.svg'
import Map from './icons/icon-map.svg'
import MaskWithBallColored from './icons/icon-mask-with-ball-colored.svg'
import MaskWithBall from './icons/icon-mask-with-ball.svg'
import Medal from './icons/icon-medal.svg'
import MHD from './icons/icon-mhd.svg'
import OldPerson from './icons/icon-old-person.svg'
import PaperMask from './icons/icon-paper-mask.svg'
import Parking from './icons/icon-parking.svg'
import Partnership from './icons/icon-partnership.svg'
import RealStateDocument from './icons/icon-real-state-document.svg'
import Road from './icons/icon-road.svg'
import School from './icons/icon-school.svg'
import Share from './icons/icon-share.svg'
import Stall from './icons/icon-stall.svg'
import Support from './icons/icon-support.svg'
import Theater from './icons/icon-theater.svg'
import Tree from './icons/icon-tree.svg'
import Trolleybus from './icons/icon-trolleybus.svg'

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
  if (!icon) return () => null

  let Comp = ICONS[icon as keyof typeof ICONS]

  if (!Comp) {
    Comp = ICONS['castle']
  }

  return Comp
}

const HomepageMenu = ({ items }: IProps) => {
  const { Link: UILink } = useUIContext()
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = useState(-1)
  const [selectedMenu, setSelectedMenu] = useState<MenuMainItem>()

  return (
    <>
      {/* Mobile Design */}
      <div className="flex flex-col md:hidden gap-y-4">
        {items?.map((item, i) => {
          const IconComponent = getIcon(item.icon)
          return (
            <button onClick={() => setSelectedMenu(item)} className="flex gap-x-7 items-center" key={i}>
              {IconComponent && <IconComponent className="w-10 h-10 text-font" />}
              <p className="font-medium text-sm text-font">{item.title}</p>
            </button>
          )
        })}
      </div>

      {selectedMenu && (
        <HamburgerSubMenu item={selectedMenu} variant="homepage" onClose={() => setSelectedMenu(undefined)} />
      )}
      {/* Desktop Design */}
      <div className="relative hidden md:grid md:grid-cols-3 lg:flex gap-y-4 lg:gap-y-0 lg:flex-row justify-between">
        {items?.map((item, i) => {
          const IconComponent = getIcon(item.icon)
          const ColoredIconComponent = getIcon(item.coloredIcon)
          return (
            <div data-hover-id={i} key={i} className="group">
              <div className="relative lg:w-40 lg:h-36 cursor-default flex lg:flex-col text-left lg:text-center items-center md:py-5 lg:py-0 lg:justify-center gap-x-7 lg:gap-x-0 lg:gap-y-4 z-10 lg:z-30 text-default">
                <Panel
                  className={cx('absolute hidden group-hover:block w-full h-full rounded-b-none')}
                  style={{
                    backgroundColor: item.color,
                    zIndex: -1,
                    boxShadow: '0 4px 2px -2px gray',
                  }}
                />
                {IconComponent && (
                  <IconComponent className="group-hover:hidden w-10 h-10 ml-7 lg:ml-0 lg:w-12 lg:h-12 text-gray-dark" />
                )}
                {ColoredIconComponent && (
                  <ColoredIconComponent className="hidden group-hover:block w-10 h-10 ml-7 lg:ml-0 lg:w-12 lg:h-12" />
                )}
                <p className="typography-tag-label whitespace-pre text-gray-dark">{item.title}</p>
                <div
                  style={{ backgroundColor: item.color }}
                  className="absolute hidden group-hover:block h-8 bottom-0 transform translate-y-1/2 w-full"
                />
              </div>
              <Panel
                data-hover-id={i}
                style={{ backgroundColor: item.color }}
                className={cx(
                  'hidden group-hover:grid absolute left-0 right-0 z-20 w-full px-6 py-10 grid-cols-3 gap-10',
                  {
                    'rounded-tl-none': i === 0,
                    'rounded-tr-none': i === items.length - 1,
                  }
                )}
              >
                {/* SUB-ITEMS */}
                {item.subItems?.map((subItem, j) => {
                  const IconComponent = getIcon(subItem.icon)
                  return (
                    <div key={j}>
                      <div className="flex items-center text-[20px]">
                        <div className="flex-grow-0 flex-shrink-0 flex items-center justify-center">
                          <IconComponent className="w-10 h-10" />
                        </div>
                        <UILink href={subItem.url} className="flex items-center text-[20px] hover:underline">
                          <div className="flex-1 ml-4 font-semibold cursor-pointer">{subItem.title}</div>
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
                              <div className="flex gap-x-6 items-center">
                                <span className="underline py-0.5">{subItem.moreLinkTitle}</span>
                                {moreLinkHoverIdx === j ? <ArrowRight /> : <ChevronRight />}
                              </div>
                            </UILink>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  )
                })}
              </Panel>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomepageMenu

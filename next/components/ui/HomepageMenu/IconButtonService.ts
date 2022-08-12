import Activities from '@assets/images/activities-new.svg'
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
import Ball from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-ball.svg'
import BookWithChild from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-book-with-child.svg'
import BookWithChildColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-book-with-child-colored.svg'
import BulbOff from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-bulb-off.svg'
import Calendar from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-calendar.svg'
import Car from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-car.svg'
import CarWithMap from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-car-with-map.svg'
import CarWithMapColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-car-with-map-colored.svg'
import Castle from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-castle.svg'
import CastleColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-castle-colored.svg'
import Chest from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-chest.svg'
import Child from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-child.svg'
import CityHall from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-city-hall.svg'
import Coin from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-coin.svg'
import Compass from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-compass.svg'
import RealState from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-construction-and-real-state.svg'
import Covid from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-covid.svg'
import Crane from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-crane.svg'
import Globe from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-globe.svg'
import HandCoins from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-hand-coins.svg'
import HandHeart from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-hand-heart.svg'
import HandHeartColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-hand-heart-colored.svg'
import HandPerson from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-hand-person.svg'
import HandPlant from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-hand-plant.svg'
import Heart from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-heart.svg'
import History from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-history.svg'
import HouseWithTree from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-house-with-tree.svg'
import HouseWithTreeColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-house-with-tree-colored.svg'
import LargeBuilding from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-large-building.svg'
import LookingGlass from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-looking-glass.svg'
import MaskWithBall from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-mask-with-ball.svg'
import MaskWithBallColored from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-mask-with-ball-colored.svg'
import Medal from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-medal.svg'
import OldPerson from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-old-person.svg'
import PaperMask from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-paper-mask.svg'
import RealStateDocument from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-real-state-document.svg'
import School from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-school.svg'
import Stall from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-stall.svg'
import Theater from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-theater.svg'
import Tree from '@bratislava/ui-bratislava/HomepageMenu/icons/icon-tree.svg'
import { FunctionComponent } from 'react'

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

export const getIcon = (icon?: MenuIcon): FunctionComponent<{ className: string }> | null => {
  if (!icon) return null

  const Comp = ICONS[icon as keyof typeof ICONS]

  if (!Comp) {
    return ICONS.mesto_01
  }

  return Comp
}

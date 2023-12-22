import cx from 'classnames'
import React, { ReactNode, useEffect, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import screens from '../../../tailwind.config.screens'
import BookFullWidth from './dividers/book-full-width.svg'
import BookMobileWidth from './dividers/book-mobile-width.svg'
import BookNarrowWidth from './dividers/book-narrow-width.svg'
import CarsFullWidth from './dividers/cars-full-width.svg'
import CarsMobileWidth from './dividers/cars-mobile-width.svg'
import CarsNarrowWidth from './dividers/cars-narrow-width.svg'
import CastleFullWidth from './dividers/castle-full-width.svg'
import CastleMobileWidth from './dividers/castle-mobile-width.svg'
import CastleNarrowWidth from './dividers/castle-narrow-width.svg'
import ConstructionSiteFullWidth from './dividers/construction-site-full-width.svg'
import ConstructionSiteMobileWidth from './dividers/construction-site-mobile-width.svg'
import ConstructionSiteNarrowWidth from './dividers/construction-site-narrow-width.svg'
import CyclistsFullWidth from './dividers/cyclists-full-width.svg'
import CyclistsMobileWidth from './dividers/cyclists-mobile-width.svg'
import CyclistsNarrowWidth from './dividers/cyclists-narrow-width.svg'
import FamousAttractionsFullWidth from './dividers/famous-attractions-full-width.svg'
import FamousAttractionsMobileWidth from './dividers/famous-attractions-mobile-width.svg'
import FamousAttractionsNarrowWidth from './dividers/famous-attractions-narrow-width.svg'
import FooterWidth from './dividers/footer-city.svg'
import FooterMobile from './dividers/footer-city-mobile.svg'
import FooterTablet from './dividers/footer-city-tablet.svg'
import HighRiseBuildingsFullWidth from './dividers/high-rise-buildings-full-width.svg'
import HighRiseBuildingsMobileWidth from './dividers/high-rise-buildings-mobile-width.svg'
import HighRiseNarrowWidth from './dividers/high-rise-buildings-narrow-width.svg'
import LowRiseBuildingsFullWidth from './dividers/low-rise-buildings-full-width.svg'
import LowRiseBuildingsMobileWidth from './dividers/low-rise-buildings-mobile-width.svg'
import LowRiseBuildingsNarrowWidth from './dividers/low-rise-buildings-narrow-width.svg'
import ParkWithFountainFullWidth from './dividers/park-with-fountain-full-width.svg'
import ParkWithFountainMobileWidth from './dividers/park-with-fountain-mobile-width.svg'
import ParkWithFountainNarrowWidth from './dividers/park-with-fountain-narrow-width.svg'
import ParkingSpaceFullWidth from './dividers/parking-space-full-width.svg'
import ParkingSpaceMobileWidth from './dividers/parking-space-mobile-width.svg'
import ParkingSpaceNarrowWidth from './dividers/parking-space-narrow-width.svg'
import SchoolFullWidth from './dividers/school-full-width.svg'
import SchoolMobileWidth from './dividers/school-mobile-width.svg'
import SchoolNarrowWidth from './dividers/school-narrow-width.svg'
import ShipFullWidth from './dividers/ship-full-width.svg'
import ShipMobileWidth from './dividers/ship-mobile-width.svg'
import ShipNarrowWidth from './dividers/ship-narrow-width.svg'
import TheaterFullWidth from './dividers/theater-full-width.svg'
import TheaterMobileWidth from './dividers/theater-mobile-width.svg'
import TheaterNarrowWidth from './dividers/theater-narrow-width.svg'
import TreesFullWidth from './dividers/trees-full-width.svg'
import TreesMobileWidth from './dividers/trees-mobile-width.svg'
import TreesNarrowWidth from './dividers/trees-narrow-width.svg'

const DIVIDER = {
  mesto: {
    display: <FamousAttractionsFullWidth />,
    tablet: <FamousAttractionsNarrowWidth />,
    mobile: <FamousAttractionsMobileWidth />,
  },
  hrad: {
    display: <CastleFullWidth />,
    tablet: <CastleNarrowWidth />,
    mobile: <CastleMobileWidth />,
  },
  doprava: {
    display: <CarsFullWidth />,
    tablet: <CarsNarrowWidth />,
    mobile: <CarsMobileWidth />,
  },
  parkovanie: {
    display: <ParkingSpaceFullWidth />,
    tablet: <ParkingSpaceNarrowWidth />,
    mobile: <ParkingSpaceMobileWidth />,
  },
  bicykel: {
    display: <CyclistsFullWidth />,
    tablet: <CyclistsNarrowWidth />,
    mobile: <CyclistsMobileWidth />,
  },
  lod: {
    display: <ShipFullWidth />,
    tablet: <ShipNarrowWidth />,
    mobile: <ShipMobileWidth />,
  },
  stromy: {
    display: <TreesFullWidth />,
    tablet: <TreesNarrowWidth />,
    mobile: <TreesMobileWidth />,
  },
  vystavba: {
    display: <ConstructionSiteFullWidth />,
    tablet: <ConstructionSiteNarrowWidth />,
    mobile: <ConstructionSiteMobileWidth />,
  },
  park: {
    display: <ParkWithFountainFullWidth />,
    tablet: <ParkWithFountainNarrowWidth />,
    mobile: <ParkWithFountainMobileWidth />,
  },
  byvanie: {
    display: <LowRiseBuildingsFullWidth />,
    tablet: <LowRiseBuildingsNarrowWidth />,
    mobile: <LowRiseBuildingsMobileWidth />,
  },
  budovy: {
    display: <HighRiseBuildingsFullWidth />,
    tablet: <HighRiseNarrowWidth />,
    mobile: <HighRiseBuildingsMobileWidth />,
  },
  vzdelavanie: {
    display: <BookFullWidth />,
    tablet: <BookNarrowWidth />,
    mobile: <BookMobileWidth />,
  },
  skola: {
    display: <SchoolFullWidth />,
    tablet: <SchoolNarrowWidth />,
    mobile: <SchoolMobileWidth />,
  },
  divadlo: {
    display: <TheaterFullWidth />,
    tablet: <TheaterNarrowWidth />,
    mobile: <TheaterMobileWidth />,
  },
  footer: {
    display: <FooterWidth />,
    tablet: <FooterTablet />,
    mobile: <FooterMobile />,
  },
}

interface DividerProps {
  className?: string
  dividerStyle?: string
}

export const getDivider = (isClient: boolean, dividerStyle?: string) => {
  const md = parseInt(screens.md.slice(0, -2), 10)
  const lg = parseInt(screens.lg.slice(0, -2), 10)

  if (!dividerStyle) {
    return null
  }

  let screenSize: keyof typeof DIVIDER.mesto = 'display'
  if (isClient) {
    const { innerWidth } = window
    if (innerWidth < md) {
      screenSize = 'mobile'
    } else if (innerWidth >= md && innerWidth <= lg) {
      screenSize = 'tablet'
    }
  }

  const dividerType = dividerStyle.split('_')[0] as keyof typeof DIVIDER

  return dividerType ? DIVIDER[dividerType][screenSize] : DIVIDER.hrad[screenSize]
}

const Divider = ({ className, dividerStyle }: DividerProps) => {
  const [Component, setComponent] = useState<ReactNode>(null)
  const isClient = useIsClient()

  useEffect(() => {
    const DividerComponent = getDivider(isClient, dividerStyle)
    setComponent(DividerComponent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className={cx('flex justify-center', className)}>{Component}</div>
}

export default Divider

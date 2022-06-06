import cx from 'classnames';
import { useState, useEffect } from 'react';

import { ReactComponent as CarsFullWidth } from './dividers/cars-full-width.svg';
import { ReactComponent as CarsNarrowWidth } from './dividers/cars-narrow-width.svg';
import { ReactComponent as CarsMobileWidth } from './dividers/cars-mobile-width.svg';
import { ReactComponent as CastleFullWidth } from './dividers/castle-full-width.svg';
import { ReactComponent as CastleMobileWidth } from './dividers/castle-mobile-width.svg';
import { ReactComponent as CastleNarrowWidth } from './dividers/castle-narrow-width.svg';
import { ReactComponent as ConstructionSiteFullWidth } from './dividers/construction-site-full-width.svg';
import { ReactComponent as ConstructionSiteNarrowWidth } from './dividers/construction-site-narrow-width.svg';
import { ReactComponent as ConstructionSiteMobileWidth } from './dividers/construction-site-mobile-width.svg';
import { ReactComponent as CyclistsFullWidth } from './dividers/cyclists-full-width.svg';
import { ReactComponent as CyclistsMobileWidth } from './dividers/cyclists-mobile-width.svg';
import { ReactComponent as CyclistsNarrowWidth } from './dividers/cyclists-narrow-width.svg';
import { ReactComponent as FamousAttractionsFullWidth } from './dividers/famous-attractions-full-width.svg';
import { ReactComponent as FamousAttractionsMobileWidth } from './dividers/famous-attractions-mobile-width.svg';
import { ReactComponent as FamousAttractionsNarrowWidth } from './dividers/famous-attractions-narrow-width.svg';
import { ReactComponent as HighRiseBuildingsFullWidth } from './dividers/high-rise-buildings-full-width.svg';
import { ReactComponent as HighRiseBuildingsMobileWidth } from './dividers/high-rise-buildings-mobile-width.svg';
import { ReactComponent as HighRiseNarrowWidth } from './dividers/high-rise-buildings-narrow-width.svg';
import { ReactComponent as LowRiseBuildingsFullWidth } from './dividers/low-rise-buildings-full-width.svg';
import { ReactComponent as LowRiseBuildingsNarrowWidth } from './dividers/low-rise-buildings-narrow-width.svg';
import { ReactComponent as LowRiseBuildingsMobileWidth } from './dividers/low-rise-buildings-mobile-width.svg';
import { ReactComponent as ParkWithFountainFullWidth } from './dividers/park-with-fountain-full-width.svg';
import { ReactComponent as ParkWithFountainMobileWidth } from './dividers/park-with-fountain-mobile-width.svg';
import { ReactComponent as ParkWithFountainNarrowWidth } from './dividers/park-with-fountain-narrow-width.svg';
import { ReactComponent as ParkingSpaceFullWidth } from './dividers/parking-space-full-width.svg';
import { ReactComponent as ParkingSpaceMobileWidth } from './dividers/parking-space-mobile-width.svg';
import { ReactComponent as ParkingSpaceNarrowWidth } from './dividers/parking-space-narrow-width.svg';
import { ReactComponent as ShipFullWidth } from './dividers/ship-full-width.svg';
import { ReactComponent as ShipNarrowWidth } from './dividers/ship-narrow-width.svg';
import { ReactComponent as ShipMobileWidth } from './dividers/ship-mobile-width.svg';
import { ReactComponent as TreesFullWidth } from './dividers/trees-full-width.svg';
import { ReactComponent as TreesMobileWidth } from './dividers/trees-mobile-width.svg';
import { ReactComponent as TreesNarrowWidth } from './dividers/trees-narrow-width.svg';
import { ReactComponent as BookFullWidth } from './dividers/book-full-width.svg';
import { ReactComponent as BookNarrowWidth } from './dividers/book-narrow-width.svg';
import { ReactComponent as BookMobileWidth } from './dividers/book-mobile-width.svg';
import { ReactComponent as SchoolFullWidth } from './dividers/school-full-width.svg';
import { ReactComponent as SchoolNarrowWidth } from './dividers/school-narrow-width.svg';
import { ReactComponent as SchoolMobileWidth } from './dividers/school-mobile-width.svg';
import { ReactComponent as TheaterFullWidth } from './dividers/theater-full-width.svg';
import { ReactComponent as TheaterNarrowWidth } from './dividers/theater-narrow-width.svg';
import { ReactComponent as TheaterMobileWidth } from './dividers/theater-mobile-width.svg';
import { ReactComponent as FooterWidth } from './dividers/footer-city.svg';

const DIVIDER = {
  mesto: {
    display: FamousAttractionsFullWidth,
    tablet: FamousAttractionsNarrowWidth,
    mobile: FamousAttractionsMobileWidth,
  },
  hrad: {
    display: CastleFullWidth,
    tablet: CastleNarrowWidth,
    mobile: CastleMobileWidth,
  },
  doprava: {
    display: CarsFullWidth,
    tablet: CarsNarrowWidth,
    mobile: CarsMobileWidth,
  },
  parkovanie: {
    display: ParkingSpaceFullWidth,
    tablet: ParkingSpaceNarrowWidth,
    mobile: ParkingSpaceMobileWidth,
  },
  bicykel: {
    display: CyclistsFullWidth,
    tablet: CyclistsNarrowWidth,
    mobile: CyclistsMobileWidth,
  },
  lod: {
    display: ShipFullWidth,
    tablet: ShipNarrowWidth,
    mobile: ShipMobileWidth,
  },
  stromy: {
    display: TreesFullWidth,
    tablet: TreesNarrowWidth,
    mobile: TreesMobileWidth,
  },
  vystavba: {
    display: ConstructionSiteFullWidth,
    tablet: ConstructionSiteNarrowWidth,
    mobile: ConstructionSiteMobileWidth,
  },
  park: {
    display: ParkWithFountainFullWidth,
    tablet: ParkWithFountainNarrowWidth,
    mobile: ParkWithFountainMobileWidth,
  },
  byvanie: {
    display: LowRiseBuildingsFullWidth,
    tablet: LowRiseBuildingsNarrowWidth,
    mobile: LowRiseBuildingsMobileWidth,
  },
  budovy: {
    display: HighRiseBuildingsFullWidth,
    tablet: HighRiseNarrowWidth,
    mobile: HighRiseBuildingsMobileWidth,
  },
  vzdelavanie: {
    display: BookFullWidth,
    tablet: BookNarrowWidth,
    mobile: BookMobileWidth,
  },
  skola: {
    display: SchoolFullWidth,
    tablet: SchoolNarrowWidth,
    mobile: SchoolMobileWidth,
  },
  divadlo: {
    display: TheaterFullWidth,
    tablet: TheaterNarrowWidth,
    mobile: TheaterMobileWidth,
  },
  footer: FooterWidth,
};

interface DividerProps {
  className?: string;
  dividerStyle?: string;
}

export const getDivider = (dividerStyle?: string) => {
  if (!dividerStyle) return () => null;
  let key = 'display';
  if (typeof window !== 'undefined') {
    // Client-side-only code
    const { innerWidth } = window;
    if (innerWidth <= 400) {
      key = 'mobile';
    } else if (400 < innerWidth && innerWidth <= 800) {
      key = 'tablet';
    }
  }

  const dividerType = dividerStyle.split('_')[0];

  let Comp = DIVIDER[dividerType][key];

  if (!Comp) {
    Comp = DIVIDER['hrad'][key];
  }

  return Comp;
};

export const Divider = ({ className, dividerStyle }: DividerProps) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const DividerComponent = getDivider(dividerStyle);
    setComponent(DividerComponent);
  }, []);

  return (
    <div className={cx('flex justify-center', className)}>
      {Component && <Component />}
    </div>
  );
};

export default Divider;

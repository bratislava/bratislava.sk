import { getIcon, Link, MenuMainItem } from '../..';
import { ReactComponent as ChevronRight } from '../../assets/images/chevron-right.svg';
import { ReactComponent as EServices } from '../../assets/images/e-services.svg';
import { ReactComponent as LightBulb } from '../../assets/images/light-bulb.svg';
import { ReactComponent as Tourist } from '../../assets/images/tourist.svg';
import { ReactComponent as SpeakerSmall } from '../../assets/images/speaker-small.svg';
import { ReactComponent as TextSize } from '../../assets/images/text-size.svg';
import cx from 'classnames';
import React, { useState } from 'react';
import HamburgerSubMenu from '../HamburgerSubMenu/HamburgerSubMenu';

interface IProps {
  hamburgerMenuItems?: MenuMainItem[];
  className?: string;
  isHamburgerMenu?: boolean;
  setHamburgerMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HamburgerSubLoginItem {
  icon?: React.ReactNode;
  title: string;
  url: string;
}

// TODO: add urls and all items
const MOCK_HAMBURGER_MENU_ITEMS: HamburgerSubLoginItem[] = [
  {
    icon: <EServices />,
    title: 'E-služby',
    url: '#',
  },
  {
    title: 'Covid-19',
    url: '#',
  },
  {
    icon: <LightBulb />,
    title: 'Newcommer',
    url: '/newcommer',
  },
  {
    icon: <Tourist />,
    title: 'Som turista',
    url: '#',
  },
  {
    icon: <SpeakerSmall />,
    title: 'Čítačka',
    url: '#',
  },
  {
    icon: <TextSize />,
    title: 'Veľkosť písma',
    url: '#',
  },
];

export const HamburgerMenu = ({
  hamburgerMenuItems = [],
  className,
}: IProps) => {
  const [subMenu, setSubMenu] = useState<MenuMainItem>();

  if (subMenu) {
    return (
      <HamburgerSubMenu item={subMenu} onClose={() => setSubMenu(undefined)} />
    );
  }

  return (
    <div
      className={cx(
        'fixed top-20 left-0 w-screen overflow-y-scroll md:hidden flex flex-col'
      )}
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div
        className={cx(
          'flex-1 flex flex-col bg-secondary px-7.5 pb-11',
          className
        )}
      >
        {/* Main Hamburger Menu */}
        <div className="flex flex-col gap-y-8 py-8 border-b-2 border-red-universal-300">
          {hamburgerMenuItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <button
                onClick={() => setSubMenu(item)}
                className="appearance-none text-left flex gap-x-7 items-center"
                key={item.title}
              >
                <IconComponent className="w-10 h-10" />
                <p className="text-base font-medium w-36">{item.title}</p>
                <ChevronRight />
              </button>
            );
          })}
        </div>
        <div className="flex justify-between items-center py-8">
          <Link className="text-base font-medium" variant="plain" href="#">
            Prihlásenie
          </Link>
          <Link
            variant="plain"
            className="bg-red-universal-300 px-6 w-40 h-10 inline-flex text-white text-base font-medium rounded shadow-md"
            href="#"
            icon={<ChevronRight />}
            iconPosition="right"
          >
            Registrácia
          </Link>
        </div>
        <div className="flex flex-col gap-y-3.5">
          {MOCK_HAMBURGER_MENU_ITEMS.map((item, index) => (
            <Link
              variant="plain"
              icon={<ChevronRight />}
              iconPosition="right"
              href={item.url}
              key={item.title}
              className={cx({ 'mt-3': index % 2 === 0 })}
            >
              <div className="flex items-center gap-x-3">
                {item.icon && item.icon}
                <span className="font-medium text-base">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

import cx from 'classnames';
import React, { useState } from 'react';
import { ReactComponent as ChevronDown } from '../../assets/images/chevron-down.svg';
import { ReactComponent as ChevronLeft } from '../../assets/images/chevron-left.svg';
import { ReactComponent as ChevronUp } from '../../assets/images/chevron-up-small.svg';
import { ReactComponent as CloseFilled } from '../../assets/images/close-filled.svg';
import { getIcon, MenuMainItem } from '../HomepageMenu/HomepageMenu';
import { Link } from '../Link/Link';

interface IProps {
  className?: string;
  item: MenuMainItem;
  onClose?: () => void;
  variant?: 'default' | 'homepage';
}

const HamburgerSubMenu = ({ className, item, onClose, variant }: IProps) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const ColoredIconComponent = getIcon(item.coloredIcon);

  return (
    <div
      style={{ backgroundColor: item.color, height: 'calc(100vh - 80px)' }}
      className={cx(
        'fixed top-20 left-0 w-screen md:hidden flex flex-col z-40',
        // 'absolute top-0 h-full w-screen flex-1',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* SubItems Menu Topper */}
        <div
          className="flex-0 flex gap-x-6 mx-6 py-6"
          style={{
            background: item.color,
            borderBottomColor: item.colorDark,
            borderBottomWidth: 2,
          }}
        >
          {variant === 'homepage' ? (
            <div className="flex items-center">
              {ColoredIconComponent && (
                <ColoredIconComponent className="mr-6 w-12 h-12" />
              )}
              <span className="text-base font-semibold text-left">
                {item.title}
              </span>
            </div>
          ) : (
            <button className="flex items-center" onClick={onClose}>
              <ChevronLeft className="mr-8" />
              {ColoredIconComponent && (
                <ColoredIconComponent className="mr-6 w-12 h-12" />
              )}
              <span className="text-base font-semibold text-left">
                {item.title}
              </span>
            </button>
          )}
        </div>
        {/* Item's SubMenu */}
        <div
          className={cx(
            'flex-1 min-h-0 overflow-scroll flex flex-col space-y-10 p-6',
            {
              'pb-36': variant === 'homepage',
            }
          )}
        >
          {item.subItems?.map((subItem, i) => {
            const isExpanded = expanded.includes(i);
            const IconComponent = getIcon(subItem.icon);
            return (
              <React.Fragment key={subItem.title}>
                <div className="flex items-center gap-x-5">
                  <IconComponent className="w-10 h-10" />
                  <p className="font-semibold text-default">{subItem.title}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-2">
                    {subItem.subItems
                      .map((subSubItem) => (
                        <Link
                          key={subSubItem.title}
                          href={subSubItem.url}
                          variant="plain"
                        >
                          {subSubItem.title}
                        </Link>
                      ))
                      .slice(0, isExpanded ? subItem.subItems.length : 3)}
                  </div>

                  {subItem.subItems.length > 3 && (
                    <button
                      onClick={() =>
                        setExpanded((v) =>
                          isExpanded ? v.filter((n) => n !== i) : [...v, i]
                        )
                      }
                      className="flex gap-x-4 items-center"
                    >
                      {isExpanded ? (
                        <>
                          <p className="text-base font-semibold underline">
                            Zobraziť menej
                          </p>
                          <ChevronUp />
                        </>
                      ) : (
                        <>
                          <p className="text-base font-semibold underline">
                            Zobraziť ďalšie
                          </p>
                          <ChevronDown className="w-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Bottom's Sticky */}
      {variant === 'homepage' && (
        <div
          style={{
            background: `linear-gradient(transparent -100%, ${item.color} 80%)`,
          }}
          className="absolute bottom-0 flex flex-col items-center w-screen h-32"
        >
          <CloseFilled onClick={onClose} style={{ color: item.colorDark }} />
          <div className="mt-4 text-center text-base font-semibold text-font">
            Zavrieť menu
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerSubMenu;

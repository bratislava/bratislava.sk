import { ChevronDownSmall } from '@assets/images'
import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import { MenuMainItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

interface MenuCellProps {
  item: MenuMainItem
  isActive: boolean
}

export const MenuCell = ({ item, isActive }: MenuCellProps) => (
  <div className="flex h-[106px] w-40 flex-col items-center">
    <StickyMenuTopper
      style={{ color: item.colorDark }}
      className={cx('w-30 absolute top-0 transition opacity-0 group-hover:opacity-100', {
        'opacity-100': isActive,
      })}
    />
    <p
      className={cx(
        'text-base font-medium mt-5 transition group-hover:font-bold text-center whitespace-pre',
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

import { MenuMainItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

import { MenuItem } from '../MenuItem'
import { MenuPanel } from '../Panel/MenuPanel'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
}

export const StickyNavigationMenu = ({ menuItems = [], className }: IProps) => {
  return (
    <menu className={cx('fixed z-40 flex m-auto w-full justify-evenly bg-white pb-4 drop-shadow-lg', className)}>
      {menuItems.map((item, index) => (
        <li key={index} className="group cursor-pointer">
          <MenuItem item={item}>
            <MenuPanel item={item} className="top-[105px]" />
          </MenuItem>
        </li>
      ))}
    </menu>
  )
}

export default StickyNavigationMenu

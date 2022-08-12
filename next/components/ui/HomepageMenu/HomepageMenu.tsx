import { MenuIcon } from '../../atoms/icon/IconService'
import { MenuItem } from '@bratislava/ui-bratislava/HomepageMenu/MenuItem'
import { MenuPanel } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanel'
import React from 'react'

interface MenuSubSubItem {
  title: string
  url: string
}

export interface MenuSubItem {
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
const HomepageMenu = ({ items }: IProps) => (
  <div className="hidden md:mb-10 md:block">
    <menu className="flex w-full flex-col justify-items-center gap-y-8 md:grid md:grid-cols-3 md:gap-y-8 lg:flex lg:flex-row lg:justify-evenly">
      {items?.map((item, index) => (
        <li key={index} className="group cursor-pointer">
          <MenuItem item={item} showColoredButton>
            <MenuPanel item={item} />
          </MenuItem>
        </li>
      ))}
    </menu>
  </div>
)

export default HomepageMenu

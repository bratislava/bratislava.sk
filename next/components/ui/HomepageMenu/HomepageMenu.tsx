// @ts-strict-ignore
import { MenuIcon } from '../../atoms/icon/IconService'

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

// TODO: Remove completely
const HomepageMenu = () => {
  return <div />
}

export default HomepageMenu

import {
  Enum_Componentmenumenuitem_Icon,
  Enum_Componentmenumenusection_Icon,
} from '@backend/graphql'

export type MenuLink = {
  label: string
  url: string
}

export type MenuSection = {
  items: MenuLink[]
  colSpan: number
  label?: string
  showMoreLink?: MenuLink
  icon?: Enum_Componentmenumenusection_Icon
}

export type MenuItem = {
  label: string
  colCount: number
  items: MenuSection[]
  icon: Enum_Componentmenumenuitem_Icon
  linkHref: string
}

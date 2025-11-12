import {
  Enum_Componentmenumenuitem_Icon,
  Enum_Componentmenumenusection_Icon,
} from '@/src/services/graphql'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type MenuLink = CommonLinkProps

export type MenuSection = {
  items: MenuLink[]
  colSpan: number
  label: string
  subtext?: string | null | undefined
  showMoreLink?: MenuLink
  icon?: Enum_Componentmenumenusection_Icon
}

export type MenuItem = {
  label: string
  colCount: number
  items: MenuSection[]
  icon: Enum_Componentmenumenuitem_Icon
  seeAllLinkProps?: CommonLinkProps
}

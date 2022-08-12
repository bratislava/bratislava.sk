import { MenuSubItem } from '@bratislava/ui-bratislava'

const MIN_SUB_ITEMS = 2
export function shouldRenderLink(subItem: MenuSubItem): boolean {
  return subItem.url && subItem.subItems.length > MIN_SUB_ITEMS
}

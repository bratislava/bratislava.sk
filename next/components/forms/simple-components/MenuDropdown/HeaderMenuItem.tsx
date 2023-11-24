import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import { type MenuItemBase } from './MenuDropdown'

const HeaderMenuItem = ({ title, icon, url, onPress }: MenuItemBase) => {
  return url ? (
    <Link className="flex items-center gap-3" href={url}>
      <DropdownMenu.Item className="text-p2 hover:text-p2-semibold focus:text-p2-semibold flex cursor-pointer items-center gap-3 px-5 py-2 font-sans focus:outline-none">
        <span className="rounded-xl bg-gray-50 p-[10px]">{icon}</span>
        <span className="min-w-[138px]">{title}</span>
      </DropdownMenu.Item>
    </Link>
  ) : (
    <DropdownMenu.Item
      onClick={onPress}
      className="text-p2 hover:text-p2-semibold focus:text-p2-semibold flex cursor-pointer items-center gap-3 px-5 py-2 focus:outline-none"
    >
      <span className="rounded-xl bg-gray-50 p-[10px]">{icon}</span>
      <span className="min-w-[138px]">{title}</span>
    </DropdownMenu.Item>
  )
}

export default HeaderMenuItem

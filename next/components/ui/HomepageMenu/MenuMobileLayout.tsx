// @ts-strict-ignore
import { MenuMainItem } from '@bratislava/ui-bratislava'
import HamburgerSubMenu from '@bratislava/ui-bratislava/HamburgerSubMenu/HamburgerSubMenu'
import { FC, useState } from 'react'

import { Icon } from '../../atoms/icon/Icon'

interface Props {
  items: MenuMainItem[]
}

export const MenuMobileLayout: FC<Props> = ({ items }) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuMainItem>()

  return (
    <>
      {/* Mobile Design */}
      <div className="flex flex-col gap-y-1 md:hidden">
        {items?.map((item, i) => (
          <button onClick={() => setSelectedMenu(item)} className="flex items-center gap-x-7 p-2" key={i}>
            <Icon iconName={item.icon} />
            <p className="text-left text-p2-medium text-font">{item.title}</p>
          </button>
        ))}
      </div>

      {selectedMenu && (
        <HamburgerSubMenu
          item={selectedMenu}
          variant="homepage"
          onClose={() => setSelectedMenu(null)}
          closeParentMenu={() => setSelectedMenu(null)}
        />
      )}
    </>
  )
}

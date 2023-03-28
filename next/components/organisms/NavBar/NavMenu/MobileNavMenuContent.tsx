import { ChevronLeftLarge } from '@assets/images'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { transformIconToCategory } from '@utils/getHoverColorFromIcon'
import { getColorsVariables } from '@utils/page'
import React from 'react'

import HorizontalDivider from './HorizontalDivider'
import { useNavMenuContext } from './navMenuContext'
import NavMenuSection from './NavMenuSection'
import { MenuItem } from './navMenuTypes'

type NavMenuContentProps = {
  menuItem: MenuItem
  backgroundColor: string
}

const MobileNavMenuContent = ({ menuItem, backgroundColor }: NavMenuContentProps) => {
  const { setMenuValue } = useNavMenuContext()
  const { items: sections, label: parentLabel } = menuItem

  const category = transformIconToCategory(menuItem.icon)
  const dividerColor = `rgb(var(${getColorsVariables(category).c400}))`

  return (
    <NavigationMenu.Content
      // To disable "onHover" behaviour, needs to be set also in NavMenuTrigger
      // https://github.com/radix-ui/primitives/issues/1630#issuecomment-1237106380
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
      style={{ backgroundColor }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <ul className="w-full flex gap-2 px-4 py-8 flex-col">
        <li className="w-full">
          <button
            type="button"
            onClick={() => setMenuValue('')}
            className="flex items-center gap-2 py-2 -mt-2 w-full"
            // TODO translations
            aria-label={`Späť na ${parentLabel}`}
          >
            <ChevronLeftLarge aria-hidden /> {parentLabel}
          </button>
        </li>

        <HorizontalDivider color={dividerColor} />

        {/* eslint-disable react/no-array-index-key */}
        {sections.map((section, index) => {
          return (
            <NavMenuSection key={index} section={section} classNames={index !== 0 ? 'pt-8' : ''} />
          )
        })}
        {/* eslint-enable react/no-array-index-key */}
      </ul>
    </NavigationMenu.Content>
  )
}

export default MobileNavMenuContent

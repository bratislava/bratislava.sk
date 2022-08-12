import { MenuMainItem } from '@bratislava/ui-bratislava'
import { MENU_STATE, PANEL_STATE } from '@bratislava/ui-bratislava/HomepageMenu/HomePageService'
import { SimpleNavButton } from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/SimpleNavButton'
import { useMenuItem } from '@bratislava/ui-bratislava/HomepageMenu/useMenuItem'
import React, { FC, ReactNode } from 'react'

import { IconButton } from './IconButton'

interface Props {
  showColoredButton?: boolean
  item: MenuMainItem
  children: ReactNode
}

export const MenuItem: FC<Props> = ({ item, children, showColoredButton = false }) => {
  const { handleMouseLeave, handleMouseEnter, panelVisibilityState, navMenuState, handleClick } = useMenuItem()

  return (
    <button
      type="button"
      className="flex w-40 flex-col items-center"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {showColoredButton && <IconButton item={item} isVisible={navMenuState === MENU_STATE.ON} />}
      {!showColoredButton && <SimpleNavButton item={item} isVisible={navMenuState === MENU_STATE.ON} />}
      {panelVisibilityState === PANEL_STATE.VISIBLE && children}
    </button>
  )
}

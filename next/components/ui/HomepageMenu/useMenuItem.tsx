import { MENU_STATE, PANEL_STATE } from '@bratislava/ui-bratislava/HomepageMenu/HomePageService'
import { useState } from 'react'

interface HookResult {
  navMenuState: MENU_STATE
  panelVisibilityState: PANEL_STATE
  handleMouseEnter(): void
  handleMouseLeave(): void
  handleClick(): void
}

export const useMenuItem = (): HookResult => {
  const [navMenuState, setNavMenuState] = useState(MENU_STATE.OUT)
  const [panelVisibilityState, setPanelVisibilityState] = useState(PANEL_STATE.HIDDEN)
  const handleMouseEnter = () => {
    setNavMenuState(MENU_STATE.ON)
  }
  const handleMouseLeave = () => {
    setNavMenuState(MENU_STATE.OUT)
    setPanelVisibilityState(PANEL_STATE.HIDDEN)
  }

  const handleClick = () => {
    if (panelVisibilityState === PANEL_STATE.HIDDEN) {
      setPanelVisibilityState(PANEL_STATE.VISIBLE)
      return
    }
    setPanelVisibilityState(PANEL_STATE.HIDDEN)
  }

  return {
    navMenuState,
    panelVisibilityState,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  }
}

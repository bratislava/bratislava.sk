import { useState } from 'react'

interface HookResult {
  highlightedMenuItemId?: string
  visiblePanelId?: string
  handleClick(itemId: string): void
  handleMouseEnter(itemId: string): void
  handleMouseLeave(): void
}

export const useStickyNavigationMenu = (): HookResult => {
  const [visiblePanelId, setVisiblePanelId] = useState<undefined | string>(undefined)
  const [highlightedMenuItemId, setHighlightedMenuItemId] = useState<undefined | string>(undefined)

  const handleClick = (itemId: string) => {
    if (visiblePanelId === itemId) {
      setVisiblePanelId(undefined)
      return
    }
    setVisiblePanelId(itemId)
  }

  const handleMouseEnter = (itemId: string) => {
    setHighlightedMenuItemId(itemId)
  }

  const handleMouseLeave = () => {
    setHighlightedMenuItemId(undefined)
  }

  return {
    highlightedMenuItemId,
    visiblePanelId,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}

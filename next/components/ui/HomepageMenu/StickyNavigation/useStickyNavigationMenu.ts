import { MutableRefObject, useRef, useState } from 'react'
import { useOutsideClick } from 'rooks'

interface HookResult {
  highlightedMenuItemId?: string
  visiblePanelId?: string
  navBarRef: MutableRefObject<HTMLLIElement | null>
  handleClick(itemId?: string): void
  handleMouseEnter(itemId: string): void
  handleMouseLeave(): void
}

export const useStickyNavigationMenu = (): HookResult => {
  const [visiblePanelId, setVisiblePanelId] = useState<undefined | string>(undefined)
  const [highlightedMenuItemId, setHighlightedMenuItemId] = useState<undefined | string>(undefined)
  const navBarRef = useRef<HTMLLIElement>(null)

  useOutsideClick(navBarRef, () => setVisiblePanelId(undefined))

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
    navBarRef,
    highlightedMenuItemId,
    visiblePanelId,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}

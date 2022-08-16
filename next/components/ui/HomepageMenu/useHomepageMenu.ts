import { debounce } from 'lodash'
import { useState } from 'react'

interface HookResult {
  visiblePanelId?: string
  handleClick(itemId: string): void
  handleMouseEnter(itemId: string): void
  handleMouseLeave(): void
}

const DEBOUNCE_TIME = 500

export const useHomepageMenu = (): HookResult => {
  const [visiblePanelId, setVisiblePanelId] = useState<undefined | string>()

  const debounceMouseEnter = debounce(setVisiblePanelId, DEBOUNCE_TIME)

  const handleClick = (itemId: string) => {
    debounceMouseEnter.cancel()
    setVisiblePanelId(itemId)
  }

  const handleMouseEnter = (itemId: string) => {
    debounceMouseEnter(itemId)
  }

  const handleMouseLeave = () => {
    setVisiblePanelId(undefined)
    debounceMouseEnter.cancel()
  }

  return {
    visiblePanelId,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}

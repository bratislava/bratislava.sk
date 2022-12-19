import { useEffect, useState } from 'react'

interface HookResult {
  activeButtonId: number | null

  handleClosePanel(): void

  handleMenuButtonClick(buttonId: number): void
}

export const useStickyMenu = (
  isVisible: boolean,
  initialActiveMenu: number | null = null,
): HookResult => {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(initialActiveMenu)
  console.log(initialActiveMenu)

  useEffect(() => {
    if (isVisible) {
      setActiveButtonId(null)
    }
  }, [isVisible])

  const handleClosePanel = () => {
    setActiveButtonId(null)
  }

  const handleMenuButtonClick = (buttonId: number) => {
    if (activeButtonId === buttonId) {
      setActiveButtonId(null)
      return
    }
    if (activeButtonId !== buttonId) {
      setActiveButtonId(buttonId)
      return
    }
    setActiveButtonId(null)
  }

  return {
    activeButtonId,
    handleClosePanel,
    handleMenuButtonClick,
  }
}

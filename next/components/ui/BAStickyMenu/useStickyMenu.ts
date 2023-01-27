import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface HookResult {
  activeButtonId: number | null
  activePanelId: number | null

  handleClosePanel(): void

  handleMenuButtonClick(buttonId: number): void
}

export const useStickyMenu = (
  isVisible: boolean,
  initialActiveMenuId: number | null = null,
): HookResult => {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(initialActiveMenuId)
  const [activePanelId, setActivePanelId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isVisible) {
      setActivePanelId(null)
    }
  }, [isVisible])

  const handleClosePanel = () => {
    setActiveButtonId(null)
    setActivePanelId(null)
  }

  const handleMenuButtonClick = (buttonId: number) => {
    if (activeButtonId === buttonId) {
      setActiveButtonId(null)
      setActivePanelId(null)
      return
    }
    if (activeButtonId !== buttonId) {
      setActiveButtonId(buttonId)
      setActivePanelId(buttonId)
      return
    }
    setActiveButtonId(null)
    setActivePanelId(null)
  }

  useEffect(() => {
    handleClosePanel()
  }, [router.asPath])

  return {
    activePanelId,
    activeButtonId,
    handleClosePanel,
    handleMenuButtonClick,
  }
}

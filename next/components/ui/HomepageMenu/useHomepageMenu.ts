import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface HookResult {
  activeButtonId: number | null

  handleClosePanel(): void

  handleMenuButtonClick(buttonId: number): void
}

export const useHomepageMenu = (isVisible: boolean): HookResult => {
  const [activeButtonId, setActiveButtonId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isVisible) {
      setActiveButtonId(null)
    }
  }, [isVisible])

  const handleClosePanel = () => {
    setActiveButtonId(null)
  }

  useEffect(() => {
    handleClosePanel()
  }, [router.asPath])

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

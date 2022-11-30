import { useIntersectionObserver } from '@bratislava/ui-bratislava/VisibilityIntersection/useIntersectionObserver'
import { MutableRefObject, useState } from 'react'

export enum STICKY_MENU_STATE {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

interface HookResult {
  menuState: STICKY_MENU_STATE
  elementRef: MutableRefObject<HTMLDivElement | null>
}

export const useWelcomeSection = (): HookResult => {
  const [menuState, setMenuState] = useState(STICKY_MENU_STATE.HIDDEN)

  const handleMenuState: IntersectionObserverCallback = (entries) => {
    console.log(entries[0])
    if (!entries[0].isIntersecting) {
      setMenuState(STICKY_MENU_STATE.VISIBLE)
      return
    }
    setMenuState(STICKY_MENU_STATE.HIDDEN)
  }
  const { elementRef } = useIntersectionObserver({ threshold: 0.9 }, handleMenuState)

  return {
    menuState,
    elementRef,
  }
}

import { MutableRefObject, useCallback, useState } from 'react'

import { useIntersectionObserver } from '../../layouts/useIntersectionObserver'
import { getStickyMenuState, isObserverIntersectingBottom, STICKY_MENU_VISIBILITY } from './HomePageService'

interface HookResult {
  observableNodeRef: MutableRefObject<HTMLDivElement | null>
  stickyMenuState: STICKY_MENU_VISIBILITY
}

export const useHomepageHeader = (): HookResult => {
  const [stickyMenuState, setStickyMenuState] = useState(STICKY_MENU_VISIBILITY.INVISIBLE)
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const { boundingClientRect } = entries[0]
    if (!isObserverIntersectingBottom(boundingClientRect.bottom)) {
      return
    }
    setStickyMenuState(getStickyMenuState(entries[0]))
  }, [])

  const { observableNodeRef } = useIntersectionObserver({
    onCrossingThreshold: handleIntersection,
    threshold: 0.8,
  })

  return {
    observableNodeRef,
    stickyMenuState,
  }
}

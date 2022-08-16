import { MutableRefObject, useCallback, useState } from 'react'

import { useIntersectionObserver } from '../../layouts/useIntersectionObserver'
import { getStickyMenuState, isObserverIntersectingBottom, STICKY_MENU_VISIBILITY } from './HomePageService'

interface HookResult {
  rootNodeRef: MutableRefObject<HTMLDivElement>
  observableNodeRef: MutableRefObject<HTMLDivElement>
  stickyMenuState: STICKY_MENU_VISIBILITY
  observableNodeHeight: number
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

  const { rootNodeRef, observableNodeRef } = useIntersectionObserver({
    onCrossingThreshold: handleIntersection,
    threshold: 1,
  })

  return {
    rootNodeRef,
    observableNodeRef,
    stickyMenuState,
    observableNodeHeight: rootNodeRef.current?.clientHeight,
  }
}

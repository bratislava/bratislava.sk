<<<<<<< HEAD
import { MutableRefObject, useCallback, useState } from 'react'

import { useIntersectionObserver } from '../../layouts/useIntersectionObserver'
import { getStickyMenuState, isObserverIntersectingBottom, STICKY_MENU_VISIBILITY } from './HomePageService'

interface HookResult {
  rootNodeRef: MutableRefObject<HTMLDivElement>
  observableNodeRef: MutableRefObject<HTMLDivElement>
  stickyMenuState: STICKY_MENU_VISIBILITY
  observableNodeHeight: number
}

export const useHomePageMenu = (): HookResult => {
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
    threshold: 0.9,
  })

  return {
    rootNodeRef,
    observableNodeRef,
    stickyMenuState,
    observableNodeHeight: rootNodeRef.current?.clientHeight,
=======
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
>>>>>>> 8da9879 (BA-488: Show background color when button active)
  }
}

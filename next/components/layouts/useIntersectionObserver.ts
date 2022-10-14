import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

interface HookParam {
  threshold: number
  rootMargin?: string
  onCrossingThreshold(observerEntries: IntersectionObserverEntry[]): void
}

interface HookResult {
  observableNodeRef: MutableRefObject<HTMLDivElement | null>
}

export const useIntersectionObserver = ({ onCrossingThreshold, threshold, rootMargin }: HookParam): HookResult => {
  const observableNodeRef = useRef<null | HTMLDivElement>(null)
  const intersectionObserverRef = useRef<undefined | IntersectionObserver>()
  const handleChange = useCallback(onCrossingThreshold, [onCrossingThreshold])

  useEffect(() => {
    if (!intersectionObserverRef) {
      return
    }
    intersectionObserverRef.current = new IntersectionObserver(handleChange, {
      threshold,
      rootMargin,
    })
  }, [handleChange, rootMargin, threshold])

  useEffect(() => {
    if (observableNodeRef?.current) {
      intersectionObserverRef.current?.observe(observableNodeRef.current)
    }
    return () => intersectionObserverRef?.current?.disconnect()
  }, [observableNodeRef])

  return {
    observableNodeRef,
  }
}

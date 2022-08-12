import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

interface HookParam {
  threshold: number
  rootMargin?: string
  onCrossingThreshold(observerEntries: IntersectionObserverEntry[]): void
}

interface HookResult {
  observableNodeRef: MutableRefObject<HTMLDivElement>
  rootNodeRef: MutableRefObject<HTMLDivElement>
}

export const useIntersectionObserver = ({ onCrossingThreshold, threshold, rootMargin }: HookParam): HookResult => {
  const [node, setNode] = useState<undefined | HTMLDivElement>()
  const observableNodeRef = useRef<null | HTMLDivElement>(null)
  const rootNodeRef = useRef<null | HTMLDivElement>(null)
  const intersectionObserverRef = useRef<undefined | IntersectionObserver>()
  const handleChange = useCallback(onCrossingThreshold, [onCrossingThreshold])

  useEffect(() => {
    if (!intersectionObserverRef) {
      return
    }
    intersectionObserverRef.current = new IntersectionObserver(handleChange, {
      threshold,
      rootMargin,
      root: node,
    })
  }, [handleChange, node, rootMargin, threshold])

  useEffect(() => {
    if (rootNodeRef.current) {
      setNode(rootNodeRef.current)
    }
  }, [setNode])

  useEffect(() => {
    if (observableNodeRef?.current) {
      intersectionObserverRef.current.observe(observableNodeRef.current)
    }
    return () => intersectionObserverRef?.current?.disconnect()
  }, [observableNodeRef])

  return {
    observableNodeRef,
    rootNodeRef,
  }
}

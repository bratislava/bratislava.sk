import { MutableRefObject, useEffect, useRef } from 'react'

interface HookResult {
  elementRef: MutableRefObject<HTMLDivElement | null>
}

export const useIntersectionObserver = (
  observerOptions: IntersectionObserverInit,
  onHandleIntersection: () => void,
): HookResult => {
  const elementRef = useRef<HTMLDivElement | null>(null)

  const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    if (entries[0].isIntersecting) {
      onHandleIntersection()
    }
  }

  const { disconnect, observe } = new IntersectionObserver(handleIntersection, observerOptions)

  useEffect(() => {
    if (!elementRef.current) {
      return
    }
    observe(elementRef.current)
  })

  useEffect(() => disconnect)

  return {
    elementRef,
  }
}

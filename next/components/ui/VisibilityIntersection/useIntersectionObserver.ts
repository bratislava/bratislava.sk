import { MutableRefObject, useEffect, useRef } from 'react'

interface HookResult {
  elementRef: MutableRefObject<HTMLDivElement | null>
}

export const useIntersectionObserver = (
  observerOptions: IntersectionObserverInit,
  onIntersection: IntersectionObserverCallback,
): HookResult => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | undefined>()

  useEffect(() => {
    observerRef.current = new IntersectionObserver(onIntersection, observerOptions)

    if (!elementRef.current) {
      return
    }
    observerRef.current?.observe(elementRef.current)
  })

  useEffect(() => () => observerRef.current?.disconnect())

  return {
    elementRef,
  }
}

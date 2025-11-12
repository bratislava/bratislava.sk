import { PanInfo, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const SWIPE_CONFIDENCE_THRESHOLD = 10_000

const getSwipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

/**
 * Based on OLO https://github.com/bratislava/olo.sk/blob/master/next/src/utils/useSlider.ts
 *
 * TODO from OLO: isDragged is not used
 */

export const useSlider = (itemsCount: number, autoRotateInterval?: number) => {
  const [[index, direction], setIndex] = useState<[number, 0 | 1]>([0, 0])
  const [isDragged, setIsDragged] = useState(false)
  const [isWindowFocused, setIsWindowFocused] = useState(true)

  const shouldReduceMotion = useReducedMotion()
  const canAutoRotate = !!(isWindowFocused && autoRotateInterval && !shouldReduceMotion)

  const handleGoToNext = useCallback(() => {
    if (!autoRotateInterval && index === itemsCount - 1) return // Avoid wrapping array indices when autorotation is disabled
    setIndex([(index + 1) % itemsCount, 0])
  }, [index, autoRotateInterval, itemsCount])

  const handleGoToPrevious = useCallback(() => {
    if (!autoRotateInterval && index === 0) return // Avoid wrapping array indices when autorotation is disabled
    setIndex([index === 0 ? itemsCount - 1 : index - 1, 1])
  }, [index, autoRotateInterval, itemsCount])

  const handleGoToPage = (newIndex: number, newDirection: 0 | 1) => {
    setIndex([newIndex, newDirection])
  }

  const dragStartHandler = useCallback(() => {
    setIsDragged(true)
  }, [])

  const dragEndHandler = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
      const swipe = getSwipePower(offset.x, velocity.x)
      if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
        handleGoToNext()
      } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
        handleGoToPrevious()
      }

      setIsDragged(false)
    },
    [handleGoToNext, handleGoToPrevious],
  )

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (canAutoRotate) {
      const handleVisibilityChange = () => {
        setIsWindowFocused(!document.hidden)
      }
      // Pause autorotation when the window is unfocused to prevent slide rendering bugs
      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [canAutoRotate])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (canAutoRotate) {
      // The slider auto-rotates only from left to right to avoid rendering bugs
      const timer = setInterval(handleGoToNext, autoRotateInterval)

      return () => {
        clearInterval(timer)
      }
    }
  }, [canAutoRotate, autoRotateInterval, handleGoToNext])

  return {
    activeItemIndex: index,
    activeItemDirection: direction,
    isActiveItemDragged: isDragged,
    handleGoToNext,
    handleGoToPrevious,
    handleGoToPage,
    dragStartHandler,
    dragEndHandler,
  }
}

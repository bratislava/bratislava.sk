import { AnimatePresence, motion, PanInfo, Variant } from 'framer-motion'
import { FC, forwardRef, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/src/utils/useTranslation'

// copied from https://github.com/bratislava/mestskakniznica.sk/blob/master/next/modules/common/ImageGallery/Slider.tsx

type SliderProps = {
  pages: ReactNode[]
  autoSwipeDuration?: number
  pagination?: FC<{
    count: number
    activeIndex: number
    goToPage: (index: number) => void
    goToPrevious: () => void
    goToNext: () => void
  }>
  initialPage?: number
  allowKeyboardNavigation?: boolean
  description?: string
}

const variants: Record<string, Variant> = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10_000

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const GallerySlider = forwardRef<HTMLButtonElement, SliderProps>(
  (
    {
      pages,
      autoSwipeDuration = 0,
      pagination: Pagination,
      initialPage,
      allowKeyboardNavigation = false,
      description,
    },
    forwardedRef,
  ) => {
    const { t } = useTranslation()
    const [isFocused, setFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const [[page, direction], setPage] = useState([initialPage ?? 0, 0])
    const [isDragging, setDragging] = useState(false)
    const index = page % pages.length
    const sliderLabel = description ?? t('Gallery.aria.descriptionSlider')

    const paginate = useCallback((newDirection: number) => {
      setPage(([currentPage]) => [currentPage + newDirection, newDirection])
    }, [])

    const goToNext = useCallback(() => {
      paginate(1)
    }, [paginate])

    const goToPrevious = useCallback(() => {
      paginate(-1)
    }, [paginate])

    const dragEndHandler = useCallback(
      (event: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
        const swipe = swipePower(offset.x, velocity.x)

        if (swipe < -swipeConfidenceThreshold) {
          goToNext()
        } else if (swipe > swipeConfidenceThreshold) {
          goToPrevious()
        }
        setDragging(false)
      },
      [goToNext, goToPrevious],
    )

    const dragStartHandler = useCallback(() => {
      setDragging(true)
    }, [])

    useEffect(() => {
      if (!autoSwipeDuration || isDragging || pages.length < 2 || isFocused) return () => {}

      const timer = setInterval(() => {
        paginate(1)
      }, autoSwipeDuration)

      return () => {
        clearInterval(timer)
      }
    }, [autoSwipeDuration, paginate, isDragging, pages, isFocused])

    useEffect(() => {
      const node = containerRef.current
      if (!node) return

      const handleFocusIn = () => {
        setFocused(true)
      }

      const handleFocusOut = (event: FocusEvent) => {
        if (node.contains(event.relatedTarget as Node | null)) return
        setFocused(false)
      }

      node.addEventListener('focusin', handleFocusIn)
      node.addEventListener('focusout', handleFocusOut)

      return () => {
        node.removeEventListener('focusin', handleFocusIn)
        node.removeEventListener('focusout', handleFocusOut)
      }
    }, [])

    const goToPage = useCallback(
      (goToIndex: number) => {
        const newDirection = index < goToIndex ? 1 : -1
        setPage([goToIndex, newDirection])
      },
      [index],
    )

    const keyUpHandler = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (!allowKeyboardNavigation) return
        if (e.code === 'ArrowLeft') {
          e.preventDefault()
          e.stopPropagation()
          goToPrevious()

          return
        }

        if (e.code === 'ArrowRight') {
          e.stopPropagation()
          e.preventDefault()
          goToNext()
        }
      },
      [goToNext, goToPrevious, allowKeyboardNavigation],
    )

    return (
      <div
        ref={containerRef}
        role="application"
        aria-label={sliderLabel}
        className="relative z-0 flex size-full items-center justify-center overflow-hidden"
      >
        {allowKeyboardNavigation && (
          <button
            ref={forwardedRef}
            type="button"
            className="sr-only"
            onKeyUp={keyUpHandler}
            aria-label={sliderLabel}
          />
        )}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="absolute size-full outline-hidden"
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={pages.length > 1 ? 'x' : undefined}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
          >
            {pages[index]}
          </motion.div>
        </AnimatePresence>
        {Pagination && (
          <Pagination
            count={pages.length}
            activeIndex={index}
            goToPage={goToPage}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
          />
        )}
      </div>
    )
  },
)

export default GallerySlider

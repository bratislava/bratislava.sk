import React, { ReactNode, useRef, useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

// Inspired by MKB project and https://inclusive-components.design/a-content-slider/

export type AllowedVisibleCount = 1 | 2 | 3 | 4

export type CarouselProps = {
  className?: string
  listClassName?: string
  itemClassName?: string
  items: ReactNode[]
  shiftVariant?: 'single' | 'byPage'
  controlsVariant?: 'bottom' | 'side'
  visibleCount?: AllowedVisibleCount
  hideControls?: boolean
  hasVerticalPadding?: boolean
  showControlsOnMobile?: boolean
}

const Carousel = ({
  className,
  listClassName,
  itemClassName,
  items,
  shiftVariant = 'single',
  controlsVariant = 'bottom',
  visibleCount = 1,
  hideControls = false,
  hasVerticalPadding = true,
  showControlsOnMobile = false,
}: CarouselProps) => {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLUListElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const totalCount = items.length
  const shiftCount = shiftVariant === 'single' ? 1 : visibleCount

  const scrollToItem = (index: number, instant = false) => {
    setCurrentIndex(index)
    if (!scrollerRef.current) return
    const offset = (scrollerRef.current.scrollWidth / totalCount) * index

    scrollerRef.current?.scroll({
      left: offset,
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  const handleGoToNext = () => {
    scrollToItem(Math.min(currentIndex + shiftCount, totalCount - shiftCount))
  }

  const handleGoToPrevious = () => {
    scrollToItem(Math.max(currentIndex - shiftCount, 0))
  }

  const noControls = hideControls || totalCount <= visibleCount
  const isLeftControlHidden = noControls || currentIndex === 0
  const isRightControlHidden = noControls || currentIndex >= totalCount - visibleCount

  return (
    <div className={cn('relative', className)}>
      <ul
        className={cn(
          'max-md:negative-x-spacing flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-clip scrollbar-hide lg:-mx-2 lg:px-2',
          { 'py-8': hasVerticalPadding, '': !hasVerticalPadding },
          listClassName,
        )}
        ref={scrollerRef}
      >
        {items?.map((item) => {
          if (React.isValidElement(item)) {
            return (
              // <li> applies h-full to its (first) child. Custom items height can be achieved by using itemClassName
              <li
                key={item.key}
                className={cn(
                  'shrink-0 transform transition-all duration-200 lg:scroll-mx-2 [&>*:first-child]:h-full',
                  {
                    // 1rem represents 1 gap-4, if gap is changed, also change card width
                    'w-[calc(100%-1rem)] snap-center': visibleCount === 1,
                    'snap-start': visibleCount > 1,
                    'w-[calc((100%-1rem)/2)]': visibleCount === 2,
                    'w-[calc((100%-2rem)/3)]': visibleCount === 3,
                    'w-[calc((100%-3rem)/4)]': visibleCount === 4,
                  },
                  itemClassName,
                )}
              >
                {item}
              </li>
            )
          }

          return null
        })}
      </ul>

      {noControls ? null : (
        <div className={cn({ 'max-md:hidden': !showControlsOnMobile })}>
          {controlsVariant === 'side' && (
            <>
              <Button
                variant="solid"
                excludeFromTabOrder
                onPress={handleGoToPrevious}
                className={cn(
                  'absolute bottom-0 top-0 z-10 my-auto h-12 w-12 rounded-full',
                  'left-0 -translate-x-1/2 transform',
                  { hidden: isLeftControlHidden },
                )}
                icon={<ArrowLeftIcon />}
                aria-label={t('Carousel.aria.previous')}
              />
              <Button
                variant="solid"
                excludeFromTabOrder
                onPress={handleGoToNext}
                className={cn(
                  'absolute bottom-0 top-0 z-10 my-auto h-12 w-12 rounded-full',
                  'right-0 translate-x-1/2 transform',
                  { hidden: isRightControlHidden },
                )}
                icon={<ArrowRightIcon />}
                aria-label={t('Carousel.aria.next')}
              />
            </>
          )}

          {controlsVariant === 'bottom' && (
            // Inspired by https://inclusive-components.design/a-content-slider/#thebuttongroup
            <ul aria-label={t('Carousel.aria.controlButtons')} className="mt-6 flex gap-2">
              <li>
                <Button
                  variant="category-outline"
                  onPress={handleGoToPrevious}
                  icon={<ArrowLeftIcon />}
                  aria-label={t('Carousel.aria.previous')}
                  isDisabled={isLeftControlHidden}
                />
              </li>
              <li>
                <Button
                  variant="category-outline"
                  onPress={handleGoToNext}
                  icon={<ArrowRightIcon />}
                  aria-label={t('Carousel.aria.next')}
                  isDisabled={isRightControlHidden}
                />
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Carousel

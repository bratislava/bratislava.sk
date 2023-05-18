import { ArrowLeftIcon, ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import CarouselControlButton from '@components/organisms/Carousel/CarouselControlButton'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

// Inspired by MKB project and https://inclusive-components.design/a-content-slider/

export type AllowedVisibleCount = 1 | 2 | 3 | 4

export type CarouselProps = {
  className?: string
  listClassName?: string
  itemClassName?: string
  items: ReactNode[]
  shiftVariant?: 'single' | 'byPage'
  visibleCount?: AllowedVisibleCount
  hideControls?: boolean
  noYListSpacing?: boolean
  showControlsOnMobile?: boolean
  useOldStyledControls?: boolean
}

const Carousel = ({
  className,
  listClassName,
  itemClassName,
  items,
  shiftVariant = 'single',
  visibleCount = 1,
  hideControls = false,
  noYListSpacing = false,
  showControlsOnMobile = false,
  useOldStyledControls = false,
}: CarouselProps) => {
  const t = useTranslations('Carousel')
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
    <div className={twMerge('relative', className)}>
      {useOldStyledControls && (
        <div
          className={cx({ hidden: isLeftControlHidden, 'max-md:hidden': !showControlsOnMobile })}
        >
          <CarouselControlButton direction="left" onPress={handleGoToPrevious} />
        </div>
      )}

      <ul
        className={twMerge(
          'max-md:negative-x-spacing flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-clip scrollbar-hide lg:-mx-2 lg:px-2',
          noYListSpacing ? '' : 'py-8',
          listClassName,
        )}
        ref={scrollerRef}
      >
        {items?.map((item) => {
          if (React.isValidElement(item)) {
            return (
              <li
                key={item.key}
                className={twMerge(
                  'shrink-0 transform transition-all duration-200 lg:scroll-mx-2',
                  cx({
                    // 1rem represents 1 gap-4, if gap is changed, also change card width
                    'w-[calc(100%-1rem)] snap-center': visibleCount === 1,
                    'snap-start': visibleCount > 1,
                    'w-[calc((100%-1rem)/2)]': visibleCount === 2,
                    'w-[calc((100%-2rem)/3)]': visibleCount === 3,
                    'w-[calc((100%-3rem)/4)]': visibleCount === 4,
                  }),
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

      {useOldStyledControls && (
        <div
          className={cx({ hidden: isRightControlHidden, 'max-md:hidden': !showControlsOnMobile })}
        >
          <CarouselControlButton direction="right" onPress={handleGoToNext} />
        </div>
      )}

      {/* Inspired by https://inclusive-components.design/a-content-slider/#thebuttongroup */}
      {!useOldStyledControls && (
        <ul
          aria-label={t('aria.controlButtons')}
          className={cx('flex gap-2', {
            'max-md:hidden': !showControlsOnMobile,
          })}
        >
          <li>
            <Button
              variant="category-outline"
              onPress={handleGoToPrevious}
              icon={<ArrowLeftIcon />}
              aria-label={t('aria.previous')}
              className={noControls ? 'hidden' : undefined}
            />
          </li>
          <li>
            <Button
              variant="category-outline"
              onPress={handleGoToNext}
              icon={<ArrowRightIcon />}
              aria-label={t('aria.next')}
              className={noControls ? 'hidden' : undefined}
            />
          </li>
        </ul>
      )}
    </div>
  )
}

export default Carousel

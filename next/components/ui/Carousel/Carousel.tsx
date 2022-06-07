import cx from 'classnames'
import React, { useRef } from 'react'
import ChevronLeft from '../../../assets/images/arrow-long-left.svg'
import ChevronRight from '../../../assets/images/arrow-long-right.svg'
import { VerticalCardButton } from '../VerticalCardButton/VerticalCardButton'

export interface CarouselProps {
  className?: string
  scrollerClassName?: string
  shiftIndex?: number
  items?: React.ReactNode[]
  visibleItems?: number
  spacing?: 'default'
  fetchMoreItems?: () => void
}

export const Carousel = ({
  className,
  scrollerClassName,
  items = [],
  shiftIndex = 1,
  visibleItems = 2,
  spacing = 'default',
  fetchMoreItems,
}: CarouselProps) => {
  const [currentItem, setCurrentItem] = React.useState(0)
  const totalItems = items.length

  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollToImage = (i: number, instant = false) => {
    setCurrentItem(i)
    if (!scrollerRef.current) return
    const offset = (scrollerRef.current.scrollWidth / items.length) * i

    scrollerRef.current?.scroll({
      left: offset,
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  const nextImage = () => {
    const nextIdx = currentItem + shiftIndex
    const maxIdx = totalItems - visibleItems
    if (nextIdx >= maxIdx + shiftIndex) {
      // If on last page, go to 0
      scrollToImage(0, true)
      return
    }

    if (nextIdx > Math.min(maxIdx - shiftIndex, maxIdx - visibleItems)) {
      // handle fetching next posts
      fetchMoreItems?.()
      scrollToImage(nextIdx)
      return
    }

    scrollToImage(nextIdx)
  }

  const previousImage = () => {
    scrollToImage(currentItem - shiftIndex)
  }

  const sliderControl = (isLeft: boolean) => (
    <VerticalCardButton
      onClick={isLeft ? previousImage : nextImage}
      size="large"
      className={cx('absolute z-10 my-auto top-0 bottom-0', {
        'left-0 transform -translate-x-1/2': isLeft,
        'right-0 transform translate-x-1/2': !isLeft,
        hidden: (isLeft && currentItem === 0) || (!isLeft && currentItem === visibleItems),
        'ml-4': isLeft && spacing === 'default',
        'mr-4': !isLeft && spacing === 'default',
      })}
    >
      {isLeft ? <ChevronLeft /> : <ChevronRight />}
    </VerticalCardButton>
  )

  return (
    <div
      className={cx('relative', className, {
        '-mx-4': spacing === 'default',
      })}
    >
      {sliderControl(true)}

      <div className={cx(scrollerClassName, 'flex overflow-x-hidden')} ref={scrollerRef}>
        {items?.map((carouselItem: React.ReactNode, i: number) => {
          const isVisible = i >= currentItem && i < currentItem + visibleItems
          return (
            <div
              key={i}
              className={cx('flex-shrink-0 transition-all duration-200 transform', {
                'px-4': spacing === 'default',
                'w-1/2': visibleItems === 2,
                'w-1/3': visibleItems === 3,
                'w-1/4': visibleItems === 4,
                'w-1/5': visibleItems === 5,
                'w-1/6': visibleItems === 6,
                'opacity-100 scale-100': isVisible,
                'opacity-0 scale-50': !isVisible,
              })}
            >
              {carouselItem}
            </div>
          )
        })}
      </div>

      {sliderControl(false)}
    </div>
  )
}

export default Carousel

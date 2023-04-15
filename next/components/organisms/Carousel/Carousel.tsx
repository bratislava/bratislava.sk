import React, { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import CarouselControl from './CarouselControl'

type CarouselProps = {
  className?: string
  listClassName?: string
  itemClassName?: string
  items: { element: ReactNode; key: string | undefined }[]
  shiftIndex?: number
  visibleCount?: number
  hideControls?: boolean
}

const Carousel = ({
  className,
  listClassName,
  itemClassName,
  items,
  shiftIndex = 1,
  visibleCount = 3,
  hideControls = false,
}: CarouselProps) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const totalCount = items.length

  const scrollerRef = useRef<HTMLUListElement>(null)

  const scrollToItem = (index: number, instant = false) => {
    setCurrentItemIndex(index)
    if (!scrollerRef.current) return
    const offset = (scrollerRef.current.scrollWidth / totalCount) * index

    scrollerRef.current?.scroll({
      left: offset,
      behavior: instant ? 'auto' : 'smooth',
    })
  }

  const nextItem = () => {
    const nextIndex = currentItemIndex + shiftIndex
    const maxIndex = totalCount - visibleCount
    if (nextIndex >= maxIndex + shiftIndex) {
      // If on last page, go to 0
      // scrollToImage(0, true)
      return
    }
    if (nextIndex > Math.min(maxIndex - shiftIndex, maxIndex - visibleCount)) {
      scrollToItem(nextIndex)
      return
    }

    scrollToItem(nextIndex)
  }

  const previousItem = () => {
    scrollToItem(currentItemIndex - shiftIndex)
  }

  const noControls = hideControls || totalCount <= visibleCount
  const isLeftControlHidden = noControls || currentItemIndex === 0
  const isRightControlHidden = noControls || currentItemIndex >= totalCount - visibleCount

  return (
    <div className={twMerge('relative', className)}>
      <div className={isLeftControlHidden ? 'hidden' : ''}>
        <CarouselControl direction="left" onPress={previousItem} />
      </div>
      <ul
        className={twMerge(
          'flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-clip scrollbar-hide',
          listClassName,
        )}
        ref={scrollerRef}
      >
        {items?.map((item) => {
          return (
            <li
              key={item.key}
              className={twMerge(
                'shrink-0 transform snap-center transition-all duration-200 md:snap-align-none',
                itemClassName,
              )}
            >
              {item.element}
            </li>
          )
        })}
      </ul>
      <div className={isRightControlHidden ? 'hidden' : ''}>
        <CarouselControl direction="right" onPress={nextItem} />
      </div>
    </div>
  )
}

export default Carousel

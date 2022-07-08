import { Button } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

import ChevronLeft from '../../assets/images/arrow-long-left.svg'
import ChevronRight from '../../assets/images/arrow-long-right.svg'
import Container from './Container'

interface IProps {
  className?: string
  shiftIndex?: number
  carouselItems?: React.ReactNode[]
}

const Carousel = ({ className, carouselItems }: IProps) => {
  const [currentItem, setCurrentItem] = React.useState(0)

  if (!carouselItems) return null

  const totalItems = carouselItems?.length

  const refs = carouselItems.map(() => React.createRef<HTMLDivElement>())

  const scrollToImage = (i: number) => {
    setCurrentItem(i)
    refs[i].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  const nextImage = () => {
    if (currentItem >= totalItems - 1) {
      scrollToImage(0)
    } else {
      scrollToImage(currentItem + 1)
    }
  }

  const previousImage = () => {
    scrollToImage(currentItem - 1)
  }

  const sliderControl = (isLeft: boolean) => (
    <Button
      shape="circle"
      onClick={isLeft ? previousImage : nextImage}
      className={cx('absolute w-16 h-16 text-2xl z-10 my-auto top-0 bottom-0', {
        '-left-6': isLeft,
        '-right-6': !isLeft,
        hidden: isLeft && currentItem === 0,
      })}
    >
      {isLeft ? <ChevronLeft /> : <ChevronRight />}
    </Button>
  )

  return (
    <Container className="hidden py-20 md:flex">
      <div className="relative w-full py-4">
        {sliderControl(true)}

        <div className={cx(className, 'flex flex-row  overflow-x-hidden')}>
          {carouselItems?.map((carouselItem, i) => (
            <div className={cx('flex-shrink-0')} key={i} ref={refs[i]}>
              {carouselItem}
            </div>
          ))}
        </div>

        {sliderControl(false)}
      </div>
    </Container>
  )
}

export default Carousel

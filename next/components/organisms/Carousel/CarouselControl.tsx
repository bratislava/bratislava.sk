import { ArrowLeftIcon, ArrowRightIcon } from '@assets/ui-icons'
import { ButtonProps } from '@components/forms/simple-components/Button'
import CarouselControlButton from '@components/organisms/Carousel/CarouselControlButton'
import cx from 'classnames'
import React from 'react'

export type CarouselControlDirection = 'left' | 'right'

type CarouselControlProps = {
  direction: 'left' | 'right'
} & Pick<ButtonProps, 'onPress'>

const CarouselControl = ({ direction, onPress }: CarouselControlProps) => {
  return (
    <CarouselControlButton
      onPress={onPress}
      className={cx('absolute bottom-0 top-0 z-10 my-auto h-12 w-12 rounded-full', {
        'left-0 -translate-x-1/2 transform': direction === 'left',
        'right-0 translate-x-1/2 transform': direction === 'right',
      })}
      icon={direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    />
  )
}

export default CarouselControl

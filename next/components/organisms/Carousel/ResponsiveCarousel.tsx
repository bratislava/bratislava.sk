import Carousel, {
  AllowedVisibleCount,
  CarouselProps,
} from '@components/organisms/Carousel/CarouselNew'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  mobile?: AllowedVisibleCount
  tablet?: AllowedVisibleCount
  desktop?: AllowedVisibleCount
} & Omit<CarouselProps, 'visibleCount'>

const ResponsiveCarousel = ({ mobile = 1, tablet = 2, desktop = 3, className, ...rest }: Props) => {
  return (
    <>
      <Carousel className={twMerge('md:hidden', className)} visibleCount={mobile} {...rest} />
      <Carousel
        className={twMerge('hidden md:block lg:hidden', className)}
        visibleCount={tablet}
        {...rest}
      />
      <Carousel className={twMerge('max-lg:hidden', className)} visibleCount={desktop} {...rest} />
    </>
  )
}

export default ResponsiveCarousel

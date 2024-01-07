import Carousel, {
  AllowedVisibleCount,
  CarouselProps,
} from '@components/organisms/Carousel/Carousel'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  mobile?: AllowedVisibleCount
  tablet?: AllowedVisibleCount
  desktop?: AllowedVisibleCount
} & Omit<CarouselProps, 'visibleCount'>

/*
 * TODO: We may want to find more sophisticated solution, but this is clean and works fine,
 *   and does not overcomplicate Carousel component
 */
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

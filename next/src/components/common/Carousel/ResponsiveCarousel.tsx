import React from 'react'

import Carousel, {
  AllowedVisibleCount,
  CarouselProps,
} from '@/src/components/common/Carousel/Carousel'
import cn from '@/src/utils/cn'

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
      <Carousel className={cn('md:hidden', className)} visibleCount={mobile} {...rest} />
      <Carousel
        className={cn('hidden md:block lg:hidden', className)}
        visibleCount={tablet}
        {...rest}
      />
      <Carousel className={cn('max-lg:hidden', className)} visibleCount={desktop} {...rest} />
    </>
  )
}

export default ResponsiveCarousel

import { AriaLabelingProps } from '@react-types/shared'
import { AnimatePresence, motion, MotionProps, Variant } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { isValidElement, ReactNode } from 'react'

import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

import DotSvg from './dot.svg'
import DotSelectedSvg from './dot-selected.svg'
import { useSlider } from './useSlider'

type SliderProps = {
  items: ReactNode[]
  autoRotateInterval?: number
  className?: string
} & AriaLabelingProps

export const variants: Record<string, Variant> = {
  initial: (direction: number) => {
    return {
      x: direction === 0 ? 100 : -100, // 100 = right, -100 = left
      opacity: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction === 0 ? -100 : 100,
      opacity: 0,
    }
  },
}

/**
 * Figma tmp DS: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=5865-22574&m=dev
 * Figma OLO: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=2097-20203&m=dev
 * Based on OLO https://github.com/bratislava/olo.sk/blob/master/next/src/components/common/Slider/Slider.tsx
 *
 * TODO from OLO
 *  - Add support for keyboard navigation by arrows
 *  - Consistent slides height
 *  - Pause button
 */

const Slider = ({ items, autoRotateInterval, className, ...rest }: SliderProps) => {
  const { t } = useTranslation()

  const { activeItemIndex, activeItemDirection, handleGoToPage, dragStartHandler, dragEndHandler } =
    useSlider(items.length, autoRotateInterval)

  const sliderMotionProps: MotionProps = {
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.2 },
      opacity: { duration: 0.2 },
    },
    initial: 'initial',
    animate: 'center',
    exit: 'exit',
    drag: items.length > 1 ? 'x' : undefined,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 1,
    onDragStart: dragStartHandler,
    onDragEnd: dragEndHandler,
  }

  return (
    <div className={cn('-mx-4 overflow-x-hidden px-4', className)}>
      <div role="tabpanel" className="flex flex-col items-center justify-center gap-6" {...rest}>
        <div className={cn('flex h-full w-full flex-col')}>
          <AnimatePresence initial={false} mode="wait">
            {isValidElement(items[activeItemIndex]) ? (
              <motion.div
                key={activeItemIndex}
                custom={activeItemDirection}
                variants={variants}
                {...sliderMotionProps}
                className="size-full"
              >
                {items[activeItemIndex]}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {items.length > 1 ? (
          <ul
            // Inspired by: https://inclusive-components.design/a-content-slider/#thebuttongroup
            role="tablist"
            aria-label={t('slider.aria.controlButtons')}
            className="flex flex-row items-center justify-center gap-3"
          >
            {items.map((_, index) => (
              <li
                 
                key={index}
                role="tab"
              >
                <Button
                  variant="unstyled"
                  aria-label={t('slider.aria.goToSlide', { number: index + 1 })}
                  onPress={() => handleGoToPage(index, activeItemDirection)}
                  className="-m-1 rounded-sm p-1"
                >
                  {index === activeItemIndex ? <DotSelectedSvg /> : <DotSvg />}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default Slider

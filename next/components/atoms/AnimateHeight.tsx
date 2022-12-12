import cx from 'classnames'
import { motion, useReducedMotion, Variant } from 'framer-motion'
import { ReactNode, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

type AnimateHeightProps = {
  isVisible: boolean
  ease?: string
  duration?: number
  children?: ReactNode
  openedVariant?: Variant
  closedVariant?: Variant
  initialVisible?: boolean
  className?: string
}

export const AnimateHeight = ({
  duration,
  ease = 'easeInOut',
  openedVariant = { opacity: 1, visibility: 'visible' },
  closedVariant = { opacity: 0, visibility: 'hidden' },
  isVisible,
  children,
  initialVisible = true,
  className,
}: AnimateHeightProps) => {
  const { height, ref } = useResizeDetector()

  const calculatedDuration = useMemo(() => {
    const constant = (height ?? 0) / 36
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
  }, [height])

  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cx('overflow-hidden', className)}
      aria-hidden={!isVisible}
      initial={initialVisible ? 'opened' : 'closed'}
      animate={isVisible ? 'opened' : 'closed'}
      variants={{
        opened: { ...openedVariant, height },
        closed: { ...closedVariant, height: 0 },
      }}
      inherit={false}
      transition={{
        ease,
        duration: shouldReduceMotion ? 0 : duration ?? calculatedDuration / 1000,
      }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}

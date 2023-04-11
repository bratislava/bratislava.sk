import AccordionChevron from '@assets/images/accordion-chevron.svg'
import { AnimateHeight } from '@components/atoms/AnimateHeight'
import cx from 'classnames'
import last from 'lodash/last'
import { ReactNode } from 'react'

type BoxedScreenSizes = 'h3' | 'h4' | 'h5' | 'h6'
type BoxedTypes = 'boxed' | 'boxed-with-shadow'
type BoxedScreenType = `${BoxedTypes}-${BoxedScreenSizes}`

export type AccordionProps = {
  variant: BoxedScreenType | 'footer'
  title: string | ReactNode | null | undefined
  children?: ReactNode
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=819-1909&t=CkadtTtIKVOlB7Sz-0
 * Figma footer: https://www.figma.com/file/A9aoQH2FGhR1D14wvvk6FW/Mestsky-web-(bratislava.sk)?node-id=75-5920&t=bJtX8mAZE34tSV8u-0
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
const AccordionV2 = ({ variant, title, children }: AccordionProps) => {
  const isBoxedOrdinary = /^boxed-h[3-6]$/.test(variant)
  const isBoxedWithShadow = /^boxed-with-shadow-h[3-6]$/.test(variant)
  const isBoxed = isBoxedOrdinary || isBoxedWithShadow
  const boxedSize = isBoxed ? (last(variant.split('-')) as BoxedScreenSizes) : undefined

  const borderStyles = cx('group flex w-full flex-col', {
    'border-2 rounded-xl bg-white': isBoxed,
    'border-gray-200 hover:border-gray-500 open:border-gray-700': isBoxedOrdinary,
    'shadow-accordion': isBoxedWithShadow,
  })

  const headingStyles = cx('min-w-0 grow', {
    'text-h3': isBoxed && boxedSize === 'h3',
    'text-h4': isBoxed && boxedSize === 'h4',
    'text-h5': (isBoxed && boxedSize === 'h5') || variant === 'footer',
    'text-h6': isBoxed && boxedSize === 'h6',
  })

  const buttonStyles = cx('flex cursor-pointer items-center gap-4 text-left', {
    'px-6 py-5 group-open:pb-2 lg:px-10 lg:py-8 group-open:lg:pb-4 text-h3':
      isBoxed && boxedSize === 'h3',
    'px-4 py-4 group-open:pb-2 lg:px-8 lg:py-6 group-open:lg:pb-4 text-h4':
      isBoxed && boxedSize === 'h4',
    'px-4 py-4 group-open:pb-2 lg:px-5 lg:py-5 group-open:lg:pb-4 text-h5':
      isBoxed && boxedSize === 'h5',
    'px-3 py-3 group-open:pb-1 lg:px-4 lg:py-4 group-open:lg:pb-4 text-h6':
      isBoxed && boxedSize === 'h6',
    'py-6 group-open:pb-4': variant === 'footer',
  })

  const chevronStyles = cx('transform transition-transform group-open:rotate-180', {
    'text-main-700': isBoxed,
    'w-10 h-10': isBoxed && boxedSize === 'h3',
    'w-8 h-8': isBoxed && boxedSize === 'h4',
    'w-6 h-6': isBoxed && (boxedSize === 'h5' || boxedSize === 'h6'),
    'w-5 h-5': variant === 'footer',
  })

  const contentStyles = cx({
    'mx-6 lg:mx-10 mb-5 lg:mb-8': isBoxed && boxedSize === 'h3',
    'mx-4 lg:mx-8 mb-4 lg:mb-6': isBoxed && boxedSize === 'h4',
    'mx-4 lg:mx-5 mb-4 lg:mb-5': isBoxed && boxedSize === 'h5',
    'mx-3 lg:mx-4 mb-2 lg:mb-4': isBoxed && boxedSize === 'h6',
    'pb-6': variant === 'footer',
  })

  return (
    <AnimateHeight isVisible>
      <details className={borderStyles}>
        <summary className={buttonStyles}>
          <span className={headingStyles}>{title}</span>
          <span className="shrink-0" aria-hidden>
            <AccordionChevron className={chevronStyles} />
          </span>
        </summary>

        <div className={contentStyles}>{children}</div>
      </details>
    </AnimateHeight>
  )
}

export default AccordionV2

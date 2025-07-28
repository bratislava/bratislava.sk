import { Typography } from '@bratislava/component-library'
import { ReactNode } from 'react'
import { ChevronDownIcon } from 'src/assets/icons'

import AnimateHeight from '@/src/components/formatting/AnimateHeight'
import cn from '@/src/utils/cn'

export type AccordionProps = {
  variant?: 'boxed' | 'footer'
  title: string | ReactNode | null | undefined
  children?: ReactNode
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=819-1909&t=CkadtTtIKVOlB7Sz-0
 * Figma footer: https://www.figma.com/file/A9aoQH2FGhR1D14wvvk6FW/Mestsky-web-(bratislava.sk)?node-id=75-5920&t=bJtX8mAZE34tSV8u-0
 *
 * Note: Only size h4 is implemented and used - this is desired behaviour until we get better accordion design in figma.
 */
const Accordion = ({ variant = 'boxed', title, children }: AccordionProps) => {
  const borderStyles = cn('group flex w-full flex-col', {
    'rounded-xl border border-grey-200 bg-white open:border-grey-700 hover:border-grey-500 hover:open:border-grey-700':
      variant === 'boxed',
  })

  const buttonStyles = cn('flex cursor-pointer items-center gap-4 text-left', 'py-4 lg:py-6', {
    'py-6 group-open:pb-4': variant === 'footer',
    'px-4 group-open:pb-2 lg:px-8 group-open:lg:pb-4': variant === 'boxed',
  })

  const chevronStyles = cn('transform transition-transform group-open:rotate-180', {
    'h-6 w-6 text-category-700 lg:h-8 lg:w-8': variant === 'boxed',
    'h-5 w-5': variant === 'footer',
  })

  const contentStyles = cn({
    'mx-4 mb-4 text-size-p-default lg:mx-8 lg:mb-6': variant === 'boxed',
    'pb-6': variant === 'footer',
  })

  return (
    <AnimateHeight isVisible>
      <details className={borderStyles}>
        <summary className={buttonStyles}>
          {/* TODO accordions often have no parent title, so they should act as h2 */}
          <Typography variant="h4" as="h3" className="min-w-0 grow">
            {title}
          </Typography>

          <span className="shrink-0" aria-hidden>
            <ChevronDownIcon className={chevronStyles} />
          </span>
        </summary>

        <div className={contentStyles}>{children}</div>
      </details>
    </AnimateHeight>
  )
}

export default Accordion

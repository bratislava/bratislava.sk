import { ChevronDownIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import AnimateHeight from '@components/atoms/AnimateHeight'
import cx from 'classnames'
import { ReactNode } from 'react'

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
const AccordionV2 = ({ variant = 'boxed', title, children }: AccordionProps) => {
  const borderStyles = cx('group flex w-full flex-col', {
    'border-2 rounded-xl bg-white border-gray-200 hover:border-gray-500 open:border-gray-700 hover:open:border-gray-700':
      variant === 'boxed',
  })

  const buttonStyles = cx(
    'flex cursor-pointer items-center gap-4 text-left',
    'px-4 py-4 lg:px-8 lg:py-6',
    {
      'py-6 group-open:pb-4': variant === 'footer',
      'group-open:pb-2 group-open:lg:pb-4': variant === 'boxed',
    },
  )

  const chevronStyles = cx('transform transition-transform group-open:rotate-180', {
    'w-6 h-6 lg:w-8 lg:h-8 text-category-700': variant === 'boxed',
    'w-5 h-5': variant === 'footer',
  })

  const contentStyles = cx({
    'mx-4 lg:mx-8 mb-4 lg:mb-6 text-small': variant === 'boxed',
    'pb-6': variant === 'footer',
  })

  return (
    <AnimateHeight isVisible>
      <details className={borderStyles}>
        <summary className={buttonStyles}>
          {/* TODO accordions often have no parent title, so they should act as h2 */}
          <Typography type="h3" size="h4" className="min-w-0 grow">
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

export default AccordionV2

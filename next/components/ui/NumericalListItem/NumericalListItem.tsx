// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { DashedLine } from '../DashedLine/DashedLine'
import { NumericalListItemObject } from '../NumericalListSection/NumericalListSection'

export interface NumericalListItemProps {
  index: number
  item?: NumericalListItemObject
  variant: 'basic' | 'combined' | 'roadmap'
  hasBackground: boolean
  children?: React.ReactNode
  className?: string
}

export const NumericalListItem = ({
  index,
  item,
  variant,
  hasBackground,
  children,
  className,
}: NumericalListItemProps) => {
  const position = index % 2 === 0 ? 'left' : 'right'
  const { Markdown: UIMarkdown } = useUIContext()
  return (
    <div key={index} className={cx(className, 'flex flex-col', { 'mb-5 lg:mb-8': variant != 'roadmap' }, 'last:mb-0')}>
      {variant === 'roadmap' && index > 0 && (
        <DashedLine className="top-0 -my-8 pl-6" position={position} color="rgb(var(--color-category-600))" />
      )}
      <div
        className={cx(
          'group flex pr-8 items-baseline',
          { 'h-16': variant === 'roadmap' },
          { 'h-auto': variant != 'roadmap' },
          { 'items-center': variant != 'combined' }
        )}
      >
        <div
          className={cx(
            'z-10 shrink-0 min-w-16 rounded-full text-h4 flex items-center justify-center w-10 h-10',
            { 'bg-white text-font': variant != 'roadmap' && hasBackground },
            { 'bg-category-600 text-white': variant === 'roadmap' || !hasBackground }
          )}
        >
          {index + 1}
        </div>
        <div
          className={cx(
            'text-p1 pl-5 lg:pl-11 listitem',
            {
              'pt-0': variant === 'combined',
            },
            {
              'w-full': !item,
            },
            {
              'max-w-screen-sm': item,
            }
          )}
        >
          {item && (
            <UIMarkdown
              numericalList
              className={cx(
                'flex',
                { 'flex-col items-start gap-y-10': variant === 'combined' },
                {
                  'items-center numerical-list-hidden': variant != 'combined',
                }
              )}
              content={item.text}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

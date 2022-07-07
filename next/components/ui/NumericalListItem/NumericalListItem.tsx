import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { DashedLine } from '../DashedLine/DashedLine'
import { NumericalListItemObject } from '../NumericalListSection/NumericalListSection'

export interface NumericalListItemProps {
  index: number
  item: NumericalListItemObject
  variant: 'basic' | 'combined' | 'roadmap'
  hasBackground: boolean
}

export const NumericalListItem = ({ index, item, variant, hasBackground }: NumericalListItemProps) => {
  const position = index % 2 == 0 ? 'left' : 'right'
  const { Markdown: UIMarkdown } = useUIContext()

  return (
    <div key={index} className={cx('flex flex-col', { 'mb-8 lg:mb-10': variant != 'roadmap' })}>
      {variant === 'roadmap' && index > 0 && (
        <DashedLine className="top-0 -my-8 pl-6" position={position} color="rgb(var(--color-primary))" />
      )}
      <div
        className={cx(
          'group flex px-8',
          { 'h-16': variant === 'roadmap' },
          { 'h-auto': variant != 'roadmap' },
          { 'items-center': variant != 'combined' }
        )}
      >
        <div
          className={cx(
            'z-10 shrink-0 min-w-16 rounded-full text-md flex items-center justify-center font-semibold w-10 h-10',
            { 'bg-white text-font': variant != 'roadmap' && hasBackground },
            { 'bg-primary text-white': variant === 'roadmap' || !hasBackground }
          )}
        >
          {index + 1}
        </div>
        <div
          className={cx('max-w-screen-sm text-base lg:text-default pl-5 lg:pl-11 listitem', { 'pt-2': variant === 'combined' })}
        >
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
        </div>
      </div>
    </div>
  )
}

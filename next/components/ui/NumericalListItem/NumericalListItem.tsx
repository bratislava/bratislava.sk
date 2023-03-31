// @ts-strict-ignore
import { NumericalListItemObject } from '@bratislava/ui-bratislava'
import HomepageMarkdown from '@components/atoms/HomepageMarkdown'
import cx from 'classnames'

import { DashedLine } from '../DashedLine/DashedLine'

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
  return (
    <div
      key={index}
      className={cx(
        className,
        'flex flex-col',
        { 'mb-5 lg:mb-8': variant !== 'roadmap' },
        'last:mb-0',
      )}
    >
      {variant === 'roadmap' && index > 0 && (
        <DashedLine
          className="top-0 -ml-2 -mt-8 -mb-10"
          position={position}
          color="rgb(var(--color-category-600))"
        />
      )}
      <div
        className={cx(
          'group flex items-center pr-8',
          { 'h-16': variant === 'roadmap' },
          { 'h-auto': variant !== 'roadmap' },
          { 'items-center': variant !== 'combined' },
        )}
      >
        <div
          className={cx(
            'min-w-16 text-h4 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            { 'bg-white text-font': variant !== 'roadmap' && hasBackground },
            { 'bg-category-600 text-white': variant === 'roadmap' || !hasBackground },
          )}
        >
          {index + 1}
        </div>
        <div
          className={cx(
            'text-p1 listitem pl-5 lg:pl-11',
            {
              'pt-0': variant === 'combined',
            },
            {
              'w-full': !item,
            },
            {
              'max-w-screen-sm': item,
            },
          )}
        >
          {item && (
            <HomepageMarkdown
              // numericalList
              // className={cx(
              //   'flex',
              //   { 'flex-col items-start gap-y-10': variant === 'combined' },
              //   {
              //     'numerical-list-hidden items-center': variant !== 'combined',
              //   },
              // )}
              content={item.text}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

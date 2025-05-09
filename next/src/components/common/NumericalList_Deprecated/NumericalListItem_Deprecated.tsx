import { ReactNode } from 'react'

import DashedLine from '@/src/components/common/NumericalList_Deprecated/DashedLine_Deprecated'
import { NumericalListItemObject } from '@/src/components/common/NumericalList_Deprecated/NumericalList_Deprecated'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import cn from '@/src/utils/cn'

export type NumericalListItemProps = {
  index: number
  item?: NumericalListItemObject
  variant: 'basic' | 'combined' | 'roadmap'
  children?: ReactNode
  className?: string
}

const NumericalListItem = ({
  index,
  item,
  variant,
  children,
  className,
}: NumericalListItemProps) => {
  const position = index % 2 === 0 ? 'left' : 'right'

  return (
    <div
      key={index}
      className={cn(
        className,
        'flex flex-col',
        { 'mb-5 lg:mb-8': variant !== 'roadmap' },
        'last:mb-0',
      )}
    >
      {variant === 'roadmap' && index > 0 && (
        <DashedLine
          className="top-0 -mb-10 -ml-2 -mt-8"
          position={position}
          color="rgb(var(--color-category-600))"
        />
      )}
      <div
        className={cn(
          'group flex items-center pr-8',
          { 'h-16': variant === 'roadmap' },
          { 'h-auto': variant !== 'roadmap' },
          { 'items-center': variant !== 'combined' },
        )}
      >
        <div
          className={cn(
            'text-h4 z-10 flex h-10 w-10 min-w-16 shrink-0 items-center justify-center rounded-full font-semibold',
            { 'bg-category-600 text-white': variant === 'roadmap' },
          )}
        >
          {index + 1}
        </div>
        <div
          className={cn(
            'text-large pl-5 lg:pl-11',
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
            <Markdown
              // TODO investigate former numericalList class and variant === 'combined'
              content={item.text}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default NumericalListItem

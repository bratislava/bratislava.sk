import React from 'react'
import cn from '@/src/utils/cn'

type HorizontalDividerProps = { categoryColor?: boolean; className?: string }

const HorizontalDivider = ({ categoryColor, className }: HorizontalDividerProps) => {
  return (
    <div
      role="separator"
      className={cn(
        'border-b-2',
        { 'border-category-600': categoryColor, 'border-grey-200': !categoryColor },
        className,
      )}
    />
  )
}

export default HorizontalDivider

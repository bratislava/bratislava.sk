import React from 'react'
import cn from 'utils/cn'

type HorizontalDividerProps = { categoryColor?: boolean; className?: string }

const HorizontalDivider = ({ categoryColor, className }: HorizontalDividerProps) => {
  return (
    <div
      role="separator"
      className={cn(
        'border-b-2',
        categoryColor ? 'border-category-600' : 'border-grey-200',
        className,
      )}
    />
  )
}

export default HorizontalDivider

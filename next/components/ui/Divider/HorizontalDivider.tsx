import React from 'react'
import { twMerge } from 'tailwind-merge'

type HorizontalDividerProps = { categoryColor?: boolean; className?: string }

const HorizontalDivider = ({ categoryColor, className }: HorizontalDividerProps) => {
  return (
    <div
      role="separator"
      className={twMerge(
        'border-b-2',
        categoryColor ? 'border-category-600' : 'border-gray-200',
        className,
      )}
    />
  )
}

export default HorizontalDivider

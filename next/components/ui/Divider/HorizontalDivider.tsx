import React from 'react'

type HorizontalDividerProps = { categoryColor?: boolean }

const HorizontalDivider = ({ categoryColor }: HorizontalDividerProps) => {
  return (
    <div
      role="separator"
      className="border-b-2"
      style={{
        borderColor: categoryColor
          ? 'rgb(var(--color-category-600))'
          : 'rgb(var(--color-gray-200))',
      }}
    />
  )
}

export default HorizontalDivider

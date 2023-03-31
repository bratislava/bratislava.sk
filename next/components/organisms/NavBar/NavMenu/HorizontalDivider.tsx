import React from 'react'

const HorizontalDivider = ({ categoryColor }: { categoryColor?: boolean }) => (
  <li aria-hidden className="py-2">
    <div
      className="border-b-2"
      style={{
        borderColor: categoryColor
          ? 'rgb(var(--color-category-600))'
          : 'rgb(var(--color-gray-200))',
      }}
    />
  </li>
)

export default HorizontalDivider

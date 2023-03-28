import React from 'react'

const HorizontalDivider = ({ color }: { color?: string }) => (
  <li aria-hidden className="py-2">
    <div className="border-b-2" style={{ borderColor: color ?? 'rgb(var(--color-gray-200))' }} />
  </li>
)

export default HorizontalDivider

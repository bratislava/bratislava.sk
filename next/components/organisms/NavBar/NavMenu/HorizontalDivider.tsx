import React from 'react'

const HorizontalDivider = ({ color }: { color?: string }) => (
  <li
    aria-hidden
    className="border-b-2"
    style={{ borderColor: color ?? 'rgb(var(--color-main-400))' }}
  />
)

export default HorizontalDivider

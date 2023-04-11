import HorizontalDivider from '@components/ui/Divider/HorizontalDivider'
import React from 'react'

const NavBarHorizontalDivider = ({ categoryColor }: { categoryColor?: boolean }) => (
  <li aria-hidden className="py-2">
    <HorizontalDivider categoryColor={categoryColor} />
  </li>
)

export default NavBarHorizontalDivider

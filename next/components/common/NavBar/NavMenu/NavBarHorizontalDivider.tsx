import React from 'react'

import HorizontalDivider from '@/components/common/Divider/HorizontalDivider'

const NavBarHorizontalDivider = ({ categoryColor }: { categoryColor?: boolean }) => (
  <li aria-hidden className="py-2">
    <HorizontalDivider categoryColor={categoryColor} />
  </li>
)

export default NavBarHorizontalDivider

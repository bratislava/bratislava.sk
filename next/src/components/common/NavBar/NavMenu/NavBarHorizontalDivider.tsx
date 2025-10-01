import React from 'react'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'

const NavBarHorizontalDivider = ({
  categoryColor,
  className,
}: {
  categoryColor?: boolean
  className?: string
}) => (
  <li aria-hidden>
    <HorizontalDivider categoryColor={categoryColor} className={className} />
  </li>
)

export default NavBarHorizontalDivider
